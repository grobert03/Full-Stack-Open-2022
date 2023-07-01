const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("returns all of the posts (4.8)", async () => {
    const response = await api.get('/api/blogs');
    console.log(response.body);
    expect(response.body).toHaveLength(2);
})

afterAll(async () => {
  await mongoose.connection.close();
});
