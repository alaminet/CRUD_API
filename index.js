require("dotenv").config();
const express = require("express");
const router = require("./router");
const cors = require("cors");
const app = express();
const mongoConfig = require("./config/mongoConfig");

// DB
mongoConfig();

// middlewire
app.use(cors());
app.use(express.json());

// Router
app.use(process.env.API_URL, router);

app.get("/", function (req, res) {
  res.send("Server HOME");
});

port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Port running at ${port}`);
});
