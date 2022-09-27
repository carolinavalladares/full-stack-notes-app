const fs = require("fs");

const getAllItems = (filePath, res) => {
  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.log("Error: ", err);
      return;
    }

    res.status(200).json(JSON.parse(fileContent));
  });
};

module.exports = getAllItems;
