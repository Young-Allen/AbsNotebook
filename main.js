// import { readFiles } from './js/read-files.js'
import fs from "fs"

/**
 * 点击打开文件夹
 */
let open_folder = document.querySelector('.open-folder')
open_folder.onclick = function() {
    alert("点击了")
    let folderPath = "F:\\test01"
    let folder = []
    readFiles(folderPath, folder)
    console.log(folder);
}


//读取文件的函数
function readFiles(folderPath, insertFile) {
    let regex = /\.{1}/
    let arr = fs.readdirSync(folderPath);
    if (arr.length == 0) return

    arr.forEach(filePath => {
        if (!regex.test(filePath)) {
            let newPath = folderPath + "\\" + filePath
            insertFile.push({
                'text': filePath,
                'children': []
            })
            readFiles(newPath, insertFile[insertFile.length - 1].children)
        } else {
            insertFile.push({
                'text': filePath
            })
        }
    })
}