import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  //room state
  const [room, setRoom] = useState("");
  // Messages States
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  //
  const [recivedSender, setRecivedSender] = useState("");
  const [sender, setSender] = useState("");
  //
  const senderField = (event) => {
    setSender(event.target.value);
  };
  //
  const messageField = (event) => {
    setMessage(event.target.value);
  };
  //
  const sendMessage = () => {
    socket.emit("send_message", { message, sender });
    // Clear the message input after sending
    setMessage("");
  };
  //

  //
  useEffect(() => {
    socket.on("recived_message", (data) => {
      console.log(data, "recived_message-data");
      // setMessageReceived(data.message);
      //
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        newMessages.push(data);
        return newMessages;
      });
      setRecivedSender(data.sender);
    });
  });
  //
  return (
    <div>
      <input placeholder="your name ..." onChange={senderField} />
      {/*  */}
      <input placeholder="message..." onChange={messageField} />
      <button onClick={sendMessage}>send message</button>

      {/* Display all messages */}
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.message} sent by {msg.sender}
        </p>
      ))}
    </div>
  );
}

export default App;
