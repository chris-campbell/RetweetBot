import { useEffect, useState, useRef } from "react";
import apiClient from "./utils/apiClient";
import io from "socket.io-client";

const socket = io();

function App() {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("tweet", (msg) => console.log(msg));
  }, []);

  const startStream = async () => {
    const data = { rules: text };

    try {
      const currentRules = await apiClient.get("/getRules");
      await apiClient.post("/deleteRules", currentRules.data);
      await apiClient.post("/setRules", data);

      resetInput();

      // Start Filtered Stream Listener
      socket.emit("startStream", "Start");
    } catch (error) {
      console.log(error);
    }
  };

  const endStream = () => {
    socket.emit("endStream", "end");
  };

  const resetInput = () => {
    inputRef.current.value = "";
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input ref={inputRef} type="text" onChange={(e) => handleChange(e)} />
      <button onClick={() => startStream()} id="test">
        Start
      </button>
    </div>
  );
}

export default App;
