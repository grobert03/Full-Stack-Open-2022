const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { after } = require("lodash");
const api = supertest(app);
//...

describe("creating an user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("username is required", async () => {
    const newUser = {
        "username": "xd",
        "name": "Willy",
        "password": "4321"
    }

    const response = await api.post("/api/users").send(newUser);
    console.log(response.body);

    expect(response.status).toEqual(400);

  })

  test("password is required", async () => {
    const newUser = {
        "username": "Willy232",
        "name": "Willy",
        "password": "xdc"
    }

    const response = await api.post("/api/users").send(newUser);
    console.log(response.body);
    expect(response.status).toEqual(400);

  })
});

afterAll(async () => {
    await mongoose.connection.close()
  });