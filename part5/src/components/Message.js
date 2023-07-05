const Message = ({message}) => {
  const styles = {
    color: "#4ade80",
    backgroundColor: "#dcfce7",
    border: "1px solid gray",
    borderRadius: "0.25em"
  }
  if (message !== "") {
    return <div style={styles}>{message}</div>
  } else {
    return null;
  }
}

export default Message;