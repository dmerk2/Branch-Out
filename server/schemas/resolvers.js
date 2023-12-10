const { signToken } = require("../utils/auth");
const { User, Post, Comment } = require("../models");
const { generatePresignedUrl } = require("../utils/s3");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("friends").populate("posts");
    },
    user: async (_, { _id }, context) => {
      return await User.findById(_id || context.user._id)

        .populate("friends")
        .populate("posts")
        .populate("likedPosts");
    },
    posts: async () => {
      return await Post.find()
        .populate("user")
        .populate("likes")
        .populate("comments");
    },
    comments: async () => {
      return await Comment.find().populate("post").populate("user");
    },
    searchUsers: async (_, { username }) => {
      return await User.find({ username });
    },
    checkUsernameEmailExists: async (_, { username, email }) => {
      try {
        const users = await User.find({
          $or: [{ username }, { email }],
        });
        return users;
      } catch (error) {
        throw new Error(`Error in checkUsernameEmailExists: ${error.message}`);
      }
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error("Incorrect password");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (
      parent,
      { username, email, password, bio, profileImage }
    ) => {
      const user = await User.create({
        username,
        email,
        password,
        bio,
        profileImage,
      });
      if (!user) {
        throw new Error("No user found with this email address");
      }
      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (
      parent,
      { _id, username, email, password, bio, profileImage }
    ) => {
      const user = await User.findByIdAndUpdate(
        _id,
        { username, email, password, bio, profileImage },
        { new: true }
      );
      return user;
    },
    deleteUser: async (parent, { _id }) => {
      const user = await User.findByIdAndDelete(_id);
      return user;
    },

    addPost: async (parent, { user, content }, context) => {
      console.log(content, user);
      const post = await Post.create({ user, content });

      console.log(post.content, post._id, "from the create");
      console.log(user, "this is the user being sent from the front end");

      const userData = await User.findByIdAndUpdate(
        { _id: user },
        { $push: { posts: post._id } },
        { new: true }
      );
      console.log(userData, "user data from resolvers");
      if (!userData) {
        return false;
      }

      return post;
    },
    updatePost: async (parent, { _id, content }) => {
      const post = await Post.findByIdAndUpdate(
        _id,
        { content },
        { new: true }
      );
      return post;
    },
    deletePost: async (parent, { _id }) => {
      const post = await Post.findByIdAndDelete(_id);
      return post;
    },

    addComment: async (parent, { post, user, content }) => {
      const comment = await Comment.create({ post, user, content });
      console.log("adComment in resolvers", comment)
      const postData = await Post.findByIdAndUpdate(
        { _id: post },
        { $push: { comments: comment._id } },
        { new: true }
      );
      console.log(postData, "post data from resolvers");
      if (!postData) {
        return false;
      }
      return comment;
    },
    updateComment: async (parent, { _id, content }) => {
      const comment = await Comment.findByIdAndUpdate(
        _id,
        { content },
        { new: true }
      );
      return comment;
    },
    deleteComment: async (parent, { _id }) => {
      const comment = await Comment.findByIdAndDelete(_id);
      return comment;
    },
    getPresignedUrl: async (_, { key }) => {
      try {
        const presignedUrl = await generatePresignedUrl(key);
        return { presignedUrl, key };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to generate pre-signed URL");
      }
    },
    likePost: async (_, { postId }, context) => {
      try {
        // Access the userId from the context
        const { user } = context;

        if (!user) {
          // If the user is not authenticated, you can return a message
          return new Error("User not authenticated");
        }

        const post = await Post.findByIdAndUpdate(
          postId,
          { $addToSet: { likes: user } },
          { new: true }
        );

        return {
          _id: post._id,
          likeCount: post.likeCount,
          dislikeCount: post.dislikeCount,
        };
      } catch (error) {
        console.error("Error liking post:", error);
        throw new Error("Failed to like post");
      }
    },

    dislikePost: async (_, { postId }, context) => {
      try {
        const { user } = context;

        if (!user) {
          return new Error("User not authenticated");
        }

        const post = await Post.findByIdAndUpdate(
          postId,
          { $addToSet: { dislikes: user } },
          { new: true }
        );

        return {
          _id: post._id,
          dislikeCount: post.dislikeCount,
          likeCount: post.likeCount,
        };
      } catch (error) {
        console.error("Error disliking post:", error);
        throw new Error("Failed to dislike post");
      }
    },
    addFriend: async (_, { userId }, { user }) => {
      try {
        // Check if the user is authenticated
        if (!user) {
          throw new Error('Authentication required to add a friend.');
        }

        // Find the current user by ID
        const currentUser = await User.findById(user._id);

        // Check if the friend's ID is valid and not already a friend
        if (!userId || currentUser.friends.includes(userId)) {
          throw new Error('Invalid or duplicate friend request.');
        }

        // Add the friend to the user's friend list
        currentUser.friends.push(userId);
        await currentUser.save();

        // Return the updated user
        return currentUser;
      } catch (error) {
        throw new Error(`Error adding friend: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
