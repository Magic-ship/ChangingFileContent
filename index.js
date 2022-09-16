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
  const filenames = fs.readdirSync(dir);

  filenames.forEach((filename) => {
    const fullpath = path.resolve(dir, filename);
    processFile(fs, fullpath, filename);
  });
}

let legendlist = ["fda318cabd4980c57d39165ad6155e69a0c801a4", "cdce605603b68a9f5c8c163317d069d1001e9c7b", "bfc72b44914f4d3e25940f2ebba27aac874978a4",
    "71f591ea9518d94a97bca6b93882e7df35b9e803", "b85db21a304e8e43e19e3a4fa370a01da1fcd500", "827eee14e33e2e973aa43b8fde1de8c1ac88c02a",
    "2db16c169537902f8d1b3551bc1aa4a028f4fe55", "7ae97da6887cd7bf5954941ff610a9581904f657", "2799e528d54fc1538732efaaef39e16cfa895064",
    "014bc3eb0589201bd0ed47afb450644ffb063472", "8ecd1005c697a0636c383a9970fa8bed13c73586", "d544ca16a689195576eaff6d5f0947d3fc3aaeb3",
    "d0285087ad9e76f5d17def4f7db7d31824ced3bb", "af886ea83e523f73749f646ba0a77c63eb2a3362", "3437be1a11c7010d2d6e74e85ff486d0739220d3",
    "4661cf7291e885749c3867cf028e2eb731d32a7d", "cd84734997320ed371b8b7e832f2e8952edeae14",
    "43d0940c3e3e14f95bd63afaa1158f75d2d700eb", "5301001e6644a6e66666540272e40b8a975d10e4", "e682dbabb73f3889d4b6d4f233b71dd00d11c0c6"];

function changeContent(fs, fullpath, filename) {
  // changing content
  let name = filename;
  
  const genName = name.replace(".json", "");

  const data = fs.readFileSync(fullpath, "utf8");
  let jsonData = JSON.parse(data);
  if (!jsonData.type) {
    if (legendlist.findIndex(item => item === jsonData.dna) >= 0) {
      legendlist = legendlist.filter(item => item !== jsonData.dna);
      console.log(filename);
      jsonData = { ...jsonData, "type": "legend" };
      fs.writeFileSync(fullpath, JSON.stringify(jsonData));
      fs.renameSync(fullpath, fullpath.replace(".json", ""));
    }
  }
  // jsonData = { ...jsonData, "name": `RBBC #${genName}`, "description" : null, "image": `https://rbbc.mypinata.cloud/ipfs/QmSm41sSAuKKpnV34LBcrc1BkJdMBHN4b9rbe9MvGCjSBi/${genName}.webp`, "compiler": "RRBC Art Engine" };
  // fs.writeFileSync(fullpath, JSON.stringify(jsonData));
  // fs.renameSync(fullpath, fullpath.replace(".json", ""));
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
