import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create new user (Registration)
router.post('/register', async (req, res) => {
    const { username, email, password, bio } = req.body;
    try {
        const newUser = new User({ username, email, password, bio });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Follow a user
router.post('/:id/follow', async (req, res) => {
    const userId = req.params.id;
    const { followerId } = req.body;
    try {
        const user = await User.findById(userId);
        const follower = await User.findById(followerId);
        
        if (!user.followers.includes(followerId)) {
            user.followers.push(followerId);
            follower.following.push(userId);
            await user.save();
            await follower.save();
            res.status(200).json({ message: 'User followed' });
        } else {
            res.status(400).json({ error: 'Already following this user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error following user' });
    }
});

export default router;
