require("dotenv").config();
const http = require("http");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");

const PORT = process.env.PORT || 4000;
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const activateSocket = require("./src/utils/startSocket");

// Start socket connection
io.on("connection", (socket) => activateSocket(socket));

// Application Routes
const twitterApiRoutes = require("./src/routes/twitterRulesRoutes");

// Routes middleware
app.use("/", twitterApiRoutes);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
