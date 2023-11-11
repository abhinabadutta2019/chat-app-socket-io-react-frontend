import { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3014");

function App() {
  const sendMessage = () => {
    socket.emit("send_message", { message: "Hello gg " });
  };
  //
  useEffect(() => {
    socket.on("recived_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input placeholder="message..." type="text" />
      <button onClick={sendMessage}>send message</button>
    </div>
  );
}

export default App;
