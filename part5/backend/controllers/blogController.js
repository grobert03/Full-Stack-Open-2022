const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require("jsonwebtoken");

blogsRouter.get("/", (req, res) => {
  Blog.find({}).then(blogs => res.json(blogs));
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.headers.authorization.replace('Bearer ', ''), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
    return;
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url,
    user: user._id,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result);
  await user.save();
  response.status(201).json(result);
})
module.exports = blogsRouter;