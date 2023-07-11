import { useState } from "react";

const Blog = ({ blog, clickHandler, user }) => {
  let [visible, setVisibility] = useState(false);
  let [likes, setLikes] = useState(blog.likes);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeBlog = (blog) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
  }

  const showDetails = () => {
    return (<div>
      <div>
        {likes}<button onClick={() => {clickHandler(blog); setLikes(likes + 1)}}>like</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.user.name}
      </div>
      {blog.user.name === user.name ? <button onClick={() => {removeBlog(blog)}}>remove</button> : ''}
    </div>);
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button
          onClick={() => {
            setVisibility(!visible);
          }}
        >
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div>
        {visible && showDetails()}
      </div>
    </div>
  );
};

export default Blog;
