Introduction
  This module is for changing all files of folder you selected depending on your changing requirement about file contents and file name.

ex: 
-------------------------BEFORE------------------------
<img src="https://github.com/Magic-ca/ChangingFileContent/blob/master/before-changing.PNG" />
-------------------------AFTER-------------------------
<img src="https://github.com/Magic-ca/ChangingFileContent/blob/master/after-changing.PNG" />

1. Your files must be copy in "complete" folder
2. Set up your changing requirement in function generateImageName or customize func "generateImageName" depending on your requirement. 

  const newName = "Chameleons_Piece_" + addName + oldName;

3. Get your changing name from func "generateImageName" and then change value "replaceData" in func "changeContent"

  const genName = generateImageName(
    name.replace("piece_", "").replace(".json", "")
  );

  const replaceDate = data.replace(
    /"image": null/g,
    `"image": "${genName}.png"`
  );

4. And then run "node updateFilecontents.js" in command line