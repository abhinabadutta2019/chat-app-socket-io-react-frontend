import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  // Room state
  const [room, setRoom] = useState("");

  // Messages state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [recivedSender, setRecivedSender] = useState("");
  const [sender, setSender] = useState("");

  // Sender input handler
  const senderField = (event) => {
    setSender(event.target.value);
  };

  // Message input handler
  const messageField = (event) => {
    setMessage(event.target.value);
  };

  // Send message function
  const sendMessage = () => {
    socket.emit("send_message", { message, sender });
    // Clear the message input after sending
    setMessage("");
  };

  // Effect to handle received messages
  useEffect(() => {
    // Set up the socket event listener only once when the component mounts
    const handleReceivedMessage = (data) => {
      console.log(data, "recived_message-data");
      setMessages((prevMessages) => [...prevMessages, data]);
      setRecivedSender(data.sender);
    };

    socket.on("recived_message", handleReceivedMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("recived_message", handleReceivedMessage);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      <input placeholder="your name..." onChange={senderField} value={sender} />
      <input placeholder="message..." onChange={messageField} value={message} />
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
