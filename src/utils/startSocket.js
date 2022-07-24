const needle = require("needle");
const { streamURL, config } = require("./config");

const stream = needle.get(streamURL, config);

const streamTweets = (socket) => {
  console.log("Running StreamTweets");

  stream.on("data", (data) => {
    try {
      const json = typeof data === "object" ? JSON.parse(data) : {};

      socket.emit("tweet", json);
    } catch (error) {
      console.log(error);
    }
  });
  return () => stream;
};

module.exports = (socket) => {
  console.log("Client connected...", socket.id);

  socket.on("startStream", () => streamTweets(socket));

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.id);
  });
};
