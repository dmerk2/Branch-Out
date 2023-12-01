const { User, Post, Comment } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find().populate('friends').populate('posts');
    },
    posts: async () => {
      return await Post.find().populate('user').populate('likes').populate('comments');
    },
    comments: async () => {
      return await Comment.find().populate('post').populate('user');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      return user;
    },
    updateUser: async (parent, { _id, username, email, password }) => {
      const user = await User.findByIdAndUpdate(_id, { username, email, password }, { new: true });
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
      const post = await Post.findByIdAndUpdate(_id, { content }, { new: true });
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
      const comment = await Comment.findByIdAndUpdate(_id, { content }, { new: true });
      return comment;
    },
    deleteComment: async (parent, { _id }) => {
      const comment = await Comment.findByIdAndDelete(_id);
      return comment;
    },
  },
};

module.exports = resolvers;