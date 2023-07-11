import { useState } from "react";

const Blog = ({ blog }) => {
  let [visible, setVisibility] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showDetails = () => {
    return (<div>
      <div>
        {blog.likes}<button>like</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        {blog.author}
      </div>
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
