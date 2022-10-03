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