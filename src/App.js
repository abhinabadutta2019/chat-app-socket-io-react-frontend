import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  const [message, setMessage] = useState("");
  const [messageRecived, setMessageRecived] = useState("");
  //
  const inputMessageHandler = (event) => {
    // console.log(e.target.value);
    setMessage(event.target.value);
    console.log(message, "message");
  };
  //
  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  };
  //
  useEffect(() => {
    socket.on("recived_message", (data) => {
      setMessageRecived(data.message);
    });
  }, [socket]);
  //
  return (
    <div>
      <input placeholder="message ..." onChange={inputMessageHandler} />
      <button onClick={sendMessage}>send message</button>
      <h2>Message recived:</h2>
      {messageRecived}
    </div>
  );
}

export default App;
