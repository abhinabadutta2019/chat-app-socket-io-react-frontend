import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  //Room state

  const [room, setRoom] = useState("");
  //
  const [message, setMessage] = useState("");
  const [messageRecived, setMessageRecived] = useState("");
  //
  //
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  //
  const sendMessage = () => {
    socket.emit("send_message", { message: message, room: room });
    //
    // setMessage(message);
  };

  //
  useEffect(() => {
    socket.on("recived_message", (data) => {
      // alert(data.message);
      //
      setMessageRecived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      {/*  */}
      <input
        placeholder="Room number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>join room</button>
      {/*  */}
      <input
        placeholder="message..."
        type="text"
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}>send message</button>
      <h2>Message:</h2>
      {messageRecived}
    </div>
  );
}

export default App;
