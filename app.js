const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const http = require('http');
const { Server } = require('socket.io');;
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"], 
    credentials: true, 
  },
});
 
const JWT_SECRET = "your_jwt_secret";

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

mongoose
  .connect(
    "mongodb+srv://dominikspajic7:Dombajecar123@cluster0.wf1ecca.mongodb.net/postsDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const User = require("./models/user");
const Post = require("./models/post");

//------------//
//AUTHENTICATION//

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//-----------//

//------------//
//HTTP//

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts." });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post." });
  }
});

app.post("/posts", async (req, res) => {
  const postData = req.body;
  const newPost = new Post({
    body: postData.body,
    author: postData.author,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({ message: "Stored new post.", post: savedPost });
  } catch (error) {
    res.status(500).json({ message: "Error saving post." });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post." });
  }
});

//------------//
//TCP REAL TIME//

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    console.log('Message from client:', data);

    socket.emit('message', 'Message received!');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(express.static(path.join(__dirname, 'application/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'application/dist', 'index.html'));
});

server.listen(8080, () => {
  console.log("HTTP/Socket.IO Server is running on http://localhost:8080");
});