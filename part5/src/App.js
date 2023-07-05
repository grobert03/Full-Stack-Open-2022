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

  useEffect(() => {
    const fetchData = async () => {
      const result = await blogService.getAll();
      setBlogs(result);
    };

    fetchData();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
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
      {blogs.map((b) => (
        <Blog key={b.id} blog={b} />
      ))}
    </div>
  );

  return (
    <div>
      <Message message={message}></Message>
      <ErrorMessage error={errorMessage}></ErrorMessage>

      {user === null && loginForm()}
      {user !== null && showBlogs()}
    </div>
  );
};

export default App;
