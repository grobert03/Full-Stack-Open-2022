import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

test("exercise 5.13", () => {
  const blog = {
    author: "Floppa",
    title: "aaaa",
    likes: 3,
  };

  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".details");
  const div2 = container.querySelector(".author");
  expect(div).toBeNull();
  expect(div2).not.toBeNull();
});

test("exercise 5.14", async () => {
  const blog = {
    author: "Floppa",
    title: "aaaa",
    likes: 3,
    url: "xd",
    user: { name: "Robert" },
  };

  const { container } = render(<Blog blog={blog} user="Robert" />);
  const user = userEvent.setup();
  const button = screen.getByText("view");
  let div = container.querySelector(".details");
  expect(div).toBeNull();

  await user.click(button);
  div = container.querySelector(".details");
  expect(div).not.toBeNull();
});

test("exercise 5.15", async () => {
  const blog = {
    author: "Floppa",
    title: "aaaa",
    likes: 3,
    url: "xd",
    user: { name: "Robert" },
  };

  const mockHandler = jest.fn();
  const { container } = render(
    <Blog blog={blog} user="Robert" clickHandler={mockHandler} />
  );
  const user = userEvent.setup();

  const viewButton = screen.getByText("view");
  await user.click(viewButton);
  let likeBtn = container.querySelector(".likeButton");

  await user.click(likeBtn);
  await user.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});

test("exercise 5.16", async () => {

  const createBlog = jest.fn();
  const { container } = render(
    <BlogForm
      createBlog={createBlog}
    />
  );
  const user = userEvent.setup();

  const titleInput = container.querySelector(".title");
  const authorInput = container.querySelector(".author");
  const urlInput = container.querySelector(".url");
  const sendButton = container.querySelector(".send");

  await user.type(titleInput, "testing a form...");
  await user.type(authorInput, "Robert");
  await user.type(urlInput, "url.com");
  await user.click(sendButton);

  console.log(createBlog.mock.calls);

  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("Robert");
  expect(createBlog.mock.calls[0][0].url).toBe("url.com");
});
