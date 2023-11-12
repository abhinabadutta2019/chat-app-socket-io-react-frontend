import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messageRecived, setMessageRecived] = useState("");
  //
  const [senderUserName, setSenderUserName] = useState("");

  //
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
    socket.emit("send_message", {
      message: message,
      room: room,
      userName: userName,
    });
  };

  useEffect(() => {
    socket.on("recived_message", (data) => {
      if (data && data.message) {
        setMessageRecived(data.message);
        //
        setSenderUserName(data.userName);
        //
        console.log(data, "data");
      }
    });
  }, [socket]);

  return (
    <div>
      <input placeholder="Room..." onChange={inputRoomHandler} />
      <input placeholder="Your Name..." onChange={inputNameHandler} />
      <button onClick={joinRoom}> Join Room</button>
      <input placeholder="Message..." onChange={inputMessageHandler} />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Message received:</h2>
      <p>
        message: {messageRecived} from user : {senderUserName}
      </p>
    </div>
  );
}

export default App;
