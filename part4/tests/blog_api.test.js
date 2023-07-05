const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

const getToken = async () => {
  await api
  .post("/api/login")
  .send({ username: "grobert", password: "1234" });
}

let token = "Bearer " + getToken();

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("returns all of the posts (4.8)", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(2);
});

test("identifier is named id (4.9)", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((r) => {
    expect(r.id).toBeDefined();
  });
});

test("blog post is added (4.10)", async () => {
  const newPost = {
    title: "Test3",
    author: "Robert",
    url: "test3",
    likes: 1,
  };
  const response = await api
    .post("/api/blogs")
    .send(newPost)
    .set({ Authorization: token });

  const blogs = await api.get("/api/blogs");

  expect(response.statusCode).toEqual(401);
  expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(response.body.title).toEqual("Test3");
});

describe("Verifies validation of fields", () => {
  test("verifies the like property (4.11)", async () => {
    const newPost = {
      title: "Test3",
      author: "Robert",
      url: "test3",
    };
    const response = await api.post("/api/blogs").send(newPost).set({ Authorization: token });
    expect(response.body).toEqual(0);
  });

  test("verifies title/url (4.12)", async () => {
    const newPost = {
      title: "Test3",
      author: "Robert",
      url: "test3",
    };
    const response = await api.post("/api/blogs").send(newPost).set({ Authorization: token });
    expect(response.status).toEqual(400);
  });
});

test("deletes successfully (4.13)", async () => {
  const id = "649fab9fda64c632334678b1";
  const response = await api.delete(`/api/blogs/${id}`);
  expect(response.status).toEqual(204);
});

test("updates successfully (4.14)", async () => {
  const newPost = {
    title: "newPost",
    author: "new",
    url: "new",
    likes: 2,
  };
  const id = "649fab9fda64c632454678b1";
  const response = await api.put(`/api/blogs/${id}`).send(newPost);
  expect(response.status).toEqual(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
