const BlogForm = ({createBlog, setNewTitle, setNewAuthor, setNewUrl}) => {
  return (<div>
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
  </div>)
};

export default BlogForm;