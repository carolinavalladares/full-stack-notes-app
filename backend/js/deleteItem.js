const fs = require("fs");

const deleteItem = (filePath, itemId, res) => {
  itemId = Number(itemId);

  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }

    let document = JSON.parse(fileContent);

    let deletedItem = document.data.find((item) => item.id === itemId);

    if (!deletedItem) {
      res.status(404).json({ message: "item not found" });
      return;
    }

    document.data = document.data = document.data.filter((item) => {
      return item.id !== itemId;
    });

    fs.writeFile(filePath, JSON.stringify(document), (err) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }

      res.status(200).json({
        message: "item deleted successfully",
        deletedItem: deletedItem,
      });
    });
  });
};

module.exports = deleteItem;
