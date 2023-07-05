import { useState } from "react";
import { useEffect } from "react";
import Blog from "./components/Blog";
import Message from "./components/Message";
import ErrorMessage from "./components/ErrorMessage";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const [newAuthor, setNewAuthor] = useState(null);
  const [newUrl, setNewUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await blogService.getAll();
      setBlogs(result);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setMessage("Welcome back!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
    console.log("loggin in with", username, password);
  };

  const logUserOut = () => {
    window.localStorage.removeItem("loggeedUser");
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const result = await blogService.create({title: newTitle, author: newAuthor, url: newUrl});
      console.log('ok')
      setBlogs(blogs.concat(result))
      setMessage(`Added ${result.title} by ${result.author}`);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (exception) {
      console.log(exception);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="user-input">Username:</label>
          <input
            id="user-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></input>
        </div>

        <div>
          <label htmlFor="password-input">Password:</label>
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );

  const showBlogs = () => (
    <div>
      <h2>Blogs</h2>
      <p>{user.username} logged in.</p>
      <button onClick={logUserOut}>Log out</button>
      <div>
        <h3>Create a new Blog</h3>
        <form onSubmit={createBlog}>
          <p>
            title:
            <input
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
              type="text"
              name="url"
              onChange={({ target }) => {
                setNewUrl(target.value);
              }}
            ></input>
          </p>
          <button type="submit">Create</button>
        </form>
      </div>
      {blogs.map((b) => (
        <Blog key={b.id} blog={b} />
      ))}
    </div>
  );

  return (
    <div>
      <Message message={message}></Message>
      <ErrorMessage error={errorMessage}></ErrorMessage>

      {user === null ? loginForm() : showBlogs()}
    </div>
  );
};

export default App;
