const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect('mongodb+srv://dominikspajic7:Dombajecar123@cluster0.wf1ecca.mongodb.net/postsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: String, required: true },
});

const Post = mongoose.model('Post', postSchema);

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts.' });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post.' });
  }
});

app.post('/posts', async (req, res) => {
  const postData = req.body;
  const newPost = new Post({
    body: postData.body,
    author: postData.author,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({ message: 'Stored new post.', post: savedPost });
  } catch (error) {
    res.status(500).json({ message: 'Error saving post.' });
  }
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
