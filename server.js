require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Application Routes
const twitterApiRoutes = require("./src/routes/twitterRulesRoutes");

app.use("/", twitterApiRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server connected on port", PORT);
});
