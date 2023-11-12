import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  const [room, setRoom] = useState("");
  //
  const [message, setMessage] = useState("");
  const [messageRecived, setMessageRecived] = useState("");
  //
  const inputMessageHandler = (event) => {
    // console.log(e.target.value);
    setMessage(event.target.value);
    console.log(message, "message");
  };
  //
  const inputRoomHandler = (event) => {
    setRoom(event.target.value);
    // console.log(room, "room");
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  //
  const sendMessage = () => {
    socket.emit("send_message", { message: message, room: room });
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
      <input placeholder="Room..." onChange={inputRoomHandler} />
      <button onClick={joinRoom}> Join Room</button>
      <input placeholder="message ..." onChange={inputMessageHandler} />
      <button onClick={sendMessage}>send message</button>
      <h2>Message recived:</h2>
      {messageRecived}
    </div>
  );
}

export default App;
