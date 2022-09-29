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

//按钮点击显示和隐藏左侧侧边栏
let close_left_bar = document.querySelector('.close-left-bar')
let row = document.querySelector('.row')
close_left_bar.onclick = function() {
    if (row.style.display === 'none') {
        row.style.display = 'block'
    } else {
        row.style.display = 'none'
    }
}

// jstree的视图
let jsTree = document.getElementById('jstree1')
$(jsTree).jstree({
    'core': {
        'check_callback': true
    },
    'plugins': ['types', 'dnd'],
    'types': {
        'default': {
            'icon': 'fa fa-folder'
        },
        'html': {
            'icon': 'fa fa-file-code-o'
        },
        'svg': {
            'icon': 'fa fa-file-picture-o'
        },
        'css': {
            'icon': 'fa fa-file-code-o'
        },
        'img': {
            'icon': 'fa fa-file-image-o'
        },
        'js': {
            'icon': 'fa fa-file-text-o'
        }

    }
});

//jsTree的文件夹json数据（本来使用readFiles函数读取返回，但是浏览器端无法使用fs模块）
let filesName = [{
        'text': 'html',
        'children': [{
            'text': 'tom.js',
            'icon': 'fa fa-file-text-o'
        }]
    }, {
        'text': 'javascript',
        'children': [{
            'text': 'css',
            'children': [{
                'text': 'animate.css',
                'icon': 'fa fa-file-text-o'
            }],
            'state': {
                'opened': true
            }
        }, {
            'text': 'js',
            'children': [{
                'text': 'bootstrap.js',
                'icon': 'fa fa-file-text-o'
            }, {
                'text': 'hplus.min.js',
                'icon': 'fa fa-file-text-o'
            }],
        }]
    },
    'css'
]

let jsonTree = document.querySelector('#using_json')
$(jsonTree).jstree({
    'core': {
        'data': filesName
    }
});