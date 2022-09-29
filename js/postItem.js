const fs = require("fs");

const postItem = (filePath, newNote, res) => {
  const newNoteKeys = Object.keys(newNote);

  if (
    !newNoteKeys.includes("title") ||
    !newNoteKeys.includes("text") ||
    !newNoteKeys.includes("important")
  ) {
    res
      .status(400)
      .json({ message: "object must contain title, text and important keys" });
    return;
  }

  if (!newNote.text) {
    res.status(400).json({ message: "text is required..." });
    return;
  }

  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }

    let document = JSON.parse(fileContent);

    newNote.id = Math.floor(Math.random() * Date.now());

    document.notes = [...document.notes, newNote];

    //   post item to file
    fs.writeFile(filePath, JSON.stringify(document), (err) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }

      res
        .status(200)
        .json({ message: "Successfully posted", createdItem: newNote });
    });
  });
};

module.exports = postItem;
