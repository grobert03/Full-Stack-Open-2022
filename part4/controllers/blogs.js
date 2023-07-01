const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0})
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({error: 'token invalid'});
  }
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
    return;
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    "title": request.body.title,
    "author": request.body.author,
    "likes": request.body.likes,
    "url": request.body.url,
    "user": user._id
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result);
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const deleted = await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (exception) {
    response.status(404).end();
  }
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const newBlog = {...request.body};
  try {
    const updated = await Blog.findByIdAndUpdate(id, newBlog);
    response.status(200).end();
  } catch (exception) {
    response.status(404).end();
  }
}); 

module.exports = blogRouter;
