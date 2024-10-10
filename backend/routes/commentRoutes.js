import express from 'express';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

const router = express.Router();

// Get comments for a post
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.find({ post: postId }).populate('author');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching comments' });
    }
});

// Create a comment
router.post('/', async (req, res) => {
    const { content, postId, authorId } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const newComment = new Comment({ content, post: postId, author: authorId });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating comment' });
    }
});

export default router;
