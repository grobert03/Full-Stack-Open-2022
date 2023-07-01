const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const { nonExistingId } = require("../tests/test_helper");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
    return;
  }

  const result = await blog.save();
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
