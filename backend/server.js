const http = require("http");
const server = http.createServer();
const express = require("express");
const app = express(server);
const cors = require("cors");
const PORT = 3000;

app.use([cors(), express.json()]);

// Root
app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
