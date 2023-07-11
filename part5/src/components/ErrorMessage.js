const ErrorMessage = ({ error }) => {
  const styles = {
    color: "#f87171",
    backgroundColor: "#fee2e2",
    border: "1px solid gray",
    borderRadius: "0.25em",
  };
  if (error !== "") {
    return <div style={styles}>{error}</div>;
  } else {
    return null;
  }
};

export default ErrorMessage;
