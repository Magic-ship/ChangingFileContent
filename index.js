const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

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
  const genName = name.replace(".json", "");

  const data = fs.readFileSync(fullpath, "utf8");
  let jsonData = JSON.parse(data);
  jsonData = { ...jsonData, "name": `RBBC #${genName}`, "description" : null, "image": `https://rbbc.mypinata.cloud/ipfs/QmSm41sSAuKKpnV34LBcrc1BkJdMBHN4b9rbe9MvGCjSBi/${genName}.webp`, "compiler": "RRBC Art Engine" };
  fs.writeFileSync(fullpath, JSON.stringify(jsonData));
  fs.renameSync(fullpath, fullpath.replace(".json", ""));
}

async function changeFileName(fs, fullpath, filename) {
  // final step: rename file
  // let rename = fullpath.replace("-", "_");
  let rename = fullpath.replace(filename, "") + `${parseInt(filename.replace(".json", "")) + 7988}.json`;
  await fs.rename(fullpath, rename, function (err) {
    if (err) throw err;
  });
  console.log(rename);
}

const getRearrangeArray = () => {
  const rearrangedArray = [];
  for (let i = 1; i <= 8008; i++) {
    const rIndex = Math.ceil(Math.random() * 8008);
    rearrangedArray.push(rIndex);
  }
  return rearrangedArray;
}

const reArrangefiles = (jsonDir, artDir) => {
  const arrangeArr = getRearrangeArray();
  arrangeArr.forEach((data, index) => {
    console.log(`${index+1} -> ${data} ... ${data} -> ${index+1}`);
    if (data === (index + 1)) return;
    fs.renameSync(path.resolve(jsonDir, `${index+1}.json`), path.resolve(jsonDir, `NoName`));
    fs.renameSync(path.resolve(jsonDir, `${data}.json`), path.resolve(jsonDir, `${index+1}.json`));
    fs.renameSync(path.resolve(jsonDir, `NoName`), path.resolve(jsonDir, `${data}.json`));
    
    fs.renameSync(path.resolve(artDir, `${index+1}.webp`), path.resolve(artDir, `NoName`));
    fs.renameSync(path.resolve(artDir, `${data}.webp`), path.resolve(artDir, `${index+1}.webp`));
    fs.renameSync(path.resolve(artDir, `NoName`), path.resolve(artDir, `${data}.webp`));
  })
}

readFiles("./json", changeContent);
// readFiles("./json", changeFileName);
// reArrangefiles("./json", "./arts");
