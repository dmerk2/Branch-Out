require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const { generatePresignedUrl } = require("./utils/s3");
const { typeDefs, resolvers } = require("./schemas");
const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://branch-out-web-service.onrender.com",
    ],
    methods: ["GET", "POST", "PUT"],
  },
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


async function startApolloServer() {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  await server.start();
  app.use("/graphql", expressMiddleware(server, { context: authMiddleware }));
}

startApolloServer();

app.use(cors());

app.get('/presigned-url', async (req, res) => {
  try {
    const key = req.query.key;
    if (!key) {
      return res.status(400).json({ error: 'No key provided' });
    }
    const presignedUrl = await generatePresignedUrl(key);
    res.json({ presignedUrl });
  } catch (error) {
    console.error('Error generating pre-signed URL:', error);
    res.status(500).json({ error: error.toString() });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// WebSocket logic
io.on("connection", (socket) => {
  console.log("User connected socket ID:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ID: ${socket.id} joined room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("Receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});


db.once("open", () => {
  httpServer.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
