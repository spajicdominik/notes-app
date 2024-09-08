const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://dominikspajic7:Dombajecar123@cluster0.wf1ecca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const postSchema = new mongoose.Schema({
    text: String,
    name: String,
    date: { type: Date, default: Date.now }
  });
  

const Post = mongoose.model('Post', postSchema);


app.get('/api/posts', async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts' });
    }
  });
  
  app.post('/api/posts', async (req, res) => {
    const { text, name } = req.body;
    const newPost = new Post({ text, name });
  
    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error saving post' });
    }
  });
  

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
