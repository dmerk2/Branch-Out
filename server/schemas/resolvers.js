const { signToken } = require("../utils/auth");
const { User, Post, Comment } = require("../models");
const { generatePresignedUrl } = require("../utils/s3");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate("friends").populate("posts");
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
          $or: [{ username }, { email }]
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

    addPost: async (parent, { user, content }) => {
      const post = await Post.create({ user, content });
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
  },
};

module.exports = resolvers;
