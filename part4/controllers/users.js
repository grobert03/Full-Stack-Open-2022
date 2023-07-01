const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body;
    const saltRounds = 10;

    if (!username || !password) {
        return response.status(400).json({error: "The username and password is required!"});
    }

    if (password.length < 3 || username.length < 3) {
        return response.status(400).json({error: "The username and password need to be at least 3 chars!"});

    }

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username, name, passwordHash
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser); 
});

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {likes: 0, user: 0});
    response.status(200).json(users);
});

module.exports = userRouter;