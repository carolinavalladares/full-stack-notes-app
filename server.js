const http = require("http");
const server = http.createServer();
const express = require("express");
const app = express(server);
const cors = require("cors");
const PORT = 3000;

const getAllItems = require("./js/getAllItems");
const postItem = require("./js/postItem");
const deleteItem = require("./js/deleteItem");

app.use([cors(), express.json(), express.static("public")]);

// Root
app.get("/", (req, res) => {
  res.send("Welcome to my notes API!");
});

// Get all notes
app.get("/notes", (req, res) => {
  getAllItems("./data.json", res);
});

// Post a note
app.post("/new-post", (req, res) => {
  postItem("./data.json", req.body, res);
});

// Delete a note
app.delete("/delete-item/:id", (req, res) => {
  deleteItem("./data.json", req.params.id, res);
});

app.listen(PORT, () => {
  console.log(`Notes App is live on http://localhost:${PORT}/index.html`);
  console.log(`listening on port ${PORT}...`);
});
