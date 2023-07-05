const Blog = require("../models/blog");
const User = require("../models/user");



const initialBlogs = [
  {
    title: "Prueba",
    author: "Floppa",
    url: "http://google.com",
    likes: 3,
    user: {
      username: "grobert",
      name: "Robert",
      id: "649ffe0a4008f5aab8905551",
    },
    id: "64a0347abb5e088923f37c36",
  },
  {
    title: "Prueba23",
    author: "Floppa",
    url: "http://google.com",
    likes: 3,
    user: {
      username: "grobert",
      name: "Robert",
      id: "649ffe0a4008f5aab8905551",
    },
    id: "64a034fc19e3ad8ef4d0b490",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "Willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
