import express from 'express';
import Post from '../models/Post.js';
import User from '../models/User.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const { content, authorId } = req.body;
    try {
        const newPost = new Post({ content, author: authorId });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
