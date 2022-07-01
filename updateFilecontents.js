const fs = require("fs");
const path = require("path");

function generateImageName(oldName) {
  let addName = "0";
  for (i = 5 - oldName.length; i > 1; i--) {
    addName += "0";
  }
  const newName = "Chameleons_Piece_" + addName + oldName;
  return newName;
}

function readFiles(dir, processFile) {
  // read directory
  fs.readdir(dir, (error, fileNames) => {
    if (error) throw error;

    fileNames.forEach((filename) => {
      const fullpath = path.resolve(dir, filename);
      processFile(fs, fullpath, filename);
    });
  });
}

function changeContent(fs, fullpath, filename) {
  // changing content
  let name = filename;
  const genName = generateImageName(
    name.replace("piece_", "").replace(".json", "")
  );

  const data = fs.readFileSync(fullpath, "utf8");
  const replaceDate = data.replace(
    /"image": null/g,
    `"image": "${genName}.png"`
  );

  fs.writeFileSync(fullpath, replaceDate);
}

function changeFileName(fs, fullpath) {
  // final step: rename file
  let rename = fullpath.replace(/piece_/g, "").replace(".json", "");
  fs.rename(fullpath, rename, function (err) {
    if (err) throw err;
  });
}

readFiles("./complete", changeContent);
readFiles("./complete", changeFileName);
