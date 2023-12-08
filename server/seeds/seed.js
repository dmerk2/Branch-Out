const db = require("../config/connection");
const { User, Post, Comment } = require("../models");
const cleanDb = require("./cleanDb");

db.once("open", async () => {
  await cleanDb("User", "users");
  await cleanDb("Post", "posts");
  await cleanDb("Comment", "comments");

  const users = await User.insertMany([
    {
      username: "john_doe",
      email: "john@example.com",
      password: "password123",
      profileImage: "",
      bio: "A software developer",
      friends: [], // Initialize with an empty array
      posts: [], // Initialize with an empty array
      messages: [], // Initialize with an empty array
      likedPosts: [], // Initialize with an empty array
    },
    {
      username: "jane_smith",
      email: "jane@example.com",
      password: "password456",
      profileImage: "",
      bio: "An artist and designer",
      friends: [], // Initialize with an empty array
      posts: [], // Initialize with an empty array
      messages: [], // Initialize with an empty array
      likedPosts: [], // Initialize with an empty array
    },
  ]);

  // Add multiple friends to the first user
  users[0].friends.push(users[1]._id);

  // Add the first user to the friends array of the second user
  users[1].friends.push(users[0]._id);

  for (const userData of users) {
    const newUser = new User(userData);
    await newUser.save();
  }
  
  console.log("Users seeded");

  const posts = await Post.insertMany([
    {
      user: users[0]._id,
      content: "This is a sample post.",
    },
    {
      user: users[1]._id,
      content: "Another post for testing.",
    },
  ]);

  console.log("Posts seeded");

  const comments = await Comment.insertMany([
    {
      post: posts[0]._id,
      user: users[0]._id,
      content: "Nice post!",
    },
    {
      post: posts[1]._id,
      user: users[1]._id,
      content: "Great content!",
    },
  ]);

  console.log("Comments seeded");

  process.exit();
});
