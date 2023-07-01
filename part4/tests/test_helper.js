const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "649fab9fda64c632454678b1",
    title: "Test1",
    author: "test",
    url: "test",
    likes: 0,
  },
  {
    _id: "649fab9fda64c632334678b1",
    title: "Test2",
    author: "Robert",
    url: "test2",
    likes: 1,
  },
];

const nonExistingId = async () => {
    const blog = new Blog({title: "Willremovethissoon"});
    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
}

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(b => b.toJSON());
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}