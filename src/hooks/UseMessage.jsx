import { useState } from "react";

function useMessage() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // "success" or "error"

  function showMessage(msg, msgType = "success") {
    setMessage(msg);
    setType(msgType);

    setTimeout(() => {
      setMessage("");
      setType("");
    }, 5000);
  }

  return { message, type, showMessage };
}

export default useMessage;
