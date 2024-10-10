import mongoose from 'mongoose';
import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

mongoose.connect('mongodb://localhost:27017/social_media', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

const seedData = async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const users = await User.insertMany([
        { username: 'john', email: 'john@example.com', password: '123456' },
        { username: 'jane', email: 'jane@example.com', password: '123456' },
        { username: 'doe', email: 'doe@example.com', password: '123456' }
    ]);

    const posts = await Post.insertMany([
        { content: 'Hello world!', author: users[0]._id },
        { content: 'Loving this new platform!', author: users[1]._id }
    ]);

    await Comment.insertMany([
        { content: 'Great post!', post: posts[0]._id, author: users[1]._id },
        { content: 'Thanks!', post: posts[0]._id, author: users[0]._id }
    ]);

    console.log('Data seeded');
    mongoose.connection.close();
};

seedData();
