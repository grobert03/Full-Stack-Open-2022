const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const list = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(list);
    expect(result).toBe(5);
  });
});

describe("most liked", () => {
  const list = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Prueba 1",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Prueba 2",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 4,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("testing...", () => {
    const result = listHelper.favoriteBlog(list);
    expect(result).toEqual({
      title: "Prueba 2",
      author: "Edsger W. Dijkstra",
      likes: 4,
    });
  });
});

describe("most blogs", () => {
  const list = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Test",
      author: "Test",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Test2",
      author: "Test",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 4,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 2,
      __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
        __v: 0,
      },
  ];

  test("testing...", () => {
    const result = listHelper.mostBlogs(list);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 3 });
  });
});

describe("most likes", () => {
    const list = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Test",
        author: "Test",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 3,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Test2",
        author: "Test",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 4,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 2,
        __v: 0,
      },
      {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 2,
          __v: 0,
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 4,
          __v: 0,
        },
    ];
  
    test("Testing for the author with most likes", () => {
      const result = listHelper.mostLikes(list);
      expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 8 });
    });
  });
