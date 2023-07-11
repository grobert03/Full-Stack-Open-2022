const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", (req, res) => {
  Blog.find({})
    .populate("user", { name: 1 })
    .then((blogs) => res.json(blogs));
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(
    request.headers.authorization.replace("Bearer ", ""),
    process.env.SECRET
  );
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).end();
    return;
  }

  const user = await User.findById(decodedToken.id);

  let blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url,
    user: user,
  });

  const result = await blog.save();
  user.blogs = user.blogs.concat(result);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.put("/:id", async (request, res) => {
  let id = request.params.id;
  let newObject = {...request.body};
  let foundBlog = await Blog.findById(id);

  newObject.likes = foundBlog.likes + 1;
  newObject.user = newObject.user.id;

  try {
    await Blog.findByIdAndUpdate(id, newObject);
    res.status(200).json(newObject);
  } catch (exception) {
    res.status(400).json(exception);
  }
  
  
});

module.exports = blogsRouter;
