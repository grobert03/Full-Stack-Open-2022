import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState(null);
  const [newAuthor, setNewAuthor] = useState(null);
  const [newUrl, setNewUrl] = useState(null);

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({ title: newTitle, author: newAuthor, url: newUrl });
    setNewAuthor("");
    setNewTitle("");
    setNewUrl("");
  };

  return (
    <div>
      <h3>Create a new Blog</h3>
      <form onSubmit={addBlog}>
        <p>
          title:
          <input
            className="title"
            type="text"
            name="title"
            onChange={({ target }) => {
              setNewTitle(target.value);
            }}
          ></input>
        </p>
        <p>
          author:
          <input
            className="author"
            type="text"
            name="author"
            onChange={({ target }) => {
              setNewAuthor(target.value);
            }}
          ></input>
        </p>
        <p>
          url:
          <input
            className="url"
            type="text"
            name="url"
            onChange={({ target }) => {
              setNewUrl(target.value);
            }}
          ></input>
        </p>
        <button className="send" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
