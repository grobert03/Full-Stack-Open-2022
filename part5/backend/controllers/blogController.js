const blogsRouter = require('express').Router();
const Blog = require('../models/blog');


blogsRouter.get("/", (req, res) => {
  Blog.find({}).then(blogs => res.json(blogs));
});

module.exports = blogsRouter;