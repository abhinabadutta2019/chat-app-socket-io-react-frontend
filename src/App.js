import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [senderUserName, setSenderUserName] = useState("");

  const inputNameHandler = (event) => {
    setUserName(event.target.value);
    console.log(userName, "userName");
  };

  const inputMessageHandler = (event) => {
    setMessage(event.target.value);
    console.log(message, "message");
  };

  const inputRoomHandler = (event) => {
    setRoom(event.target.value);
    console.log(room, "room");
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room: room, userName: userName });
    }
  };

  const sendMessage = () => {
    const newMessage = {
      message: message,
      userName: userName,
      type: "sent",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    socket.emit("send_message", {
      ...newMessage,
      room: room,
    });

    setMessage(""); // Clear the input field after sending the message
  };

  useEffect(() => {
    socket.on("recived_message", (data) => {
      if (data && data.message) {
        const newMessage = {
          message: data.message,
          userName: data.userName,
          type: "received",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setSenderUserName(data.userName);
        console.log(data, "data");
      }
    });
  }, [socket]);

  return (
    <div>
      <input placeholder="Room..." onChange={inputRoomHandler} />
      <input placeholder="Your Name..." onChange={inputNameHandler} />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={inputMessageHandler}
        value={message}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Messages:</h2>
      {messages.map((msg, index) => (
        <p key={index}>
          {msg.type === "sent" ? "Sent: " : "Received: "}
          {msg.message} from user: {msg.userName}
        </p>
      ))}
    </div>
  );
}

export default App;
