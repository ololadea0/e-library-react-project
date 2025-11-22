function Message({ message, type }) {
  if (!message) return null;

  return <div className={`msg-box ${type}`}>{message}</div>;
}

export default Message;
