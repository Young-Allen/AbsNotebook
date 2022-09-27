import fs from 'fs'

export function readFiles(folderPath, insertFile) {
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

// let folderPath = "F:\\test01"
// let folder = []

// readFiles(folderPath, folder)

// console.log(folder);