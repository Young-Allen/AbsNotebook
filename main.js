import './css/main.css'
import markdownIt from 'markdown-it'
import TurndownService from 'turndown'

//markdown转html
const md = new markdownIt();
//html转markdown
const turndownService = new TurndownService();
turndownService.keep(['del', 'ins'])

var time = 200;
var timeOut = null;
let activeNode = 0;
let marklist = document.querySelector('.markdown-box')
let activeNum = document.querySelector('.activeNum')

//Cell上移
document.querySelector('.moveUp').addEventListener('click', function() {
    if (activeNode === 0) {
        console.log("当前是第一个元素");
        return
    }
    swapElements(marklist.children[activeNode], marklist.children[activeNode - 1])
    activeNode--;
    activeNum.innerHTML = activeNode;

    listenClick()
});

//Cell下移
document.querySelector('.moveDwon').addEventListener('click', function() {
    if (activeNode === marklist.children.length - 1) {
        console.log("当前是最后一个元素");
        return
    }
    swapElements(marklist.children[activeNode], marklist.children[activeNode + 1])
    activeNode++;
    activeNum.innerHTML = activeNode;

    listenClick()
});

//Cell上方新建
document.querySelector('.CreateUp').addEventListener('click', function() {
    let newObj = document.createElement('div')
    newObj.className = "showMarkdown"
    newObj.innerHTML = "随便写点什么..."

    newObj.ondblclick = function() {
        for (let j = 0; j < marklist.children.length; j++) {
            marklist.children[j].className = ''
            marklist.children[j].classList.add('showMarkdown')
        }

        let titleEditing = false;
        this.style.padding = "0";
        const that = this
        clearTimeout(timeOut); // 清除第二个单击事件
        //双击的处理逻辑
        if (titleEditing) {
            return
        }
        titleEditing = true
        let old = turndownService.turndown(this.innerHTML)
        this.innerHTML = ""

        let newObj = document.createElement("TEXTAREA");
        newObj.id = "textarea"
        newObj.className = "test_box"
        newObj.rows = "5"
        newObj.value = old
        makeExpandingArea(newObj);

        this.append(newObj)
        newObj.focus()
        newObj.onblur = function() {
            that.innerHTML = md.render(this.value)
            titleEditing = false
            that.style.padding = "10px 10px";
            makeExpandingArea(newObj);
        }
    }

    marklist.insertBefore(newObj, marklist.children[activeNode])

    activeNode++;
    activeNum.innerHTML = activeNode;

    listenClick()
});

//Cell下方新建
document.querySelector('.CreateDown').addEventListener('click', function() {
    let newObj = document.createElement('div')
    newObj.className = "showMarkdown"
    newObj.innerHTML = "随便写点什么..."

    marklist.insertBefore(newObj, marklist.children[activeNode + 1])

    newObj.ondblclick = function() {
        for (let j = 0; j < marklist.children.length; j++) {
            marklist.children[j].className = ''
            marklist.children[j].classList.add('showMarkdown')
        }

        let titleEditing = false;
        this.style.padding = "0";
        const that = this
        clearTimeout(timeOut); // 清除第二个单击事件
        //双击的处理逻辑
        if (titleEditing) {
            return
        }
        titleEditing = true
        let old = turndownService.turndown(this.innerHTML)
        this.innerHTML = ""

        let newObj = document.createElement("TEXTAREA");
        newObj.id = "textarea"
        newObj.className = "test_box"
        newObj.rows = "5"
        newObj.value = old
        makeExpandingArea(newObj);

        this.append(newObj)
        newObj.focus()
        newObj.onblur = function() {
            that.innerHTML = md.render(this.value)
            titleEditing = false
            that.style.padding = "10px 10px";
            makeExpandingArea(newObj);
        }
    }

    activeNum.innerHTML = activeNode;

    listenClick()
});

//删除
document.querySelector('.delete').addEventListener('click', function() {
    marklist.removeChild(marklist.children[activeNode])

    activeNum.innerHTML = "未选中";
    listenClick()
});

//双击编辑框事件
for (let i = 0; i < marklist.children.length; i++) {
    marklist.children[i].addEventListener('dblclick', function() {
        console.log(marklist.children[i]);
        for (let j = 0; j < marklist.children.length; j++) {
            marklist.children[j].className = ''
            marklist.children[j].classList.add('showMarkdown')
        }

        let titleEditing = false;
        this.style.padding = "0";
        const that = this
        clearTimeout(timeOut); // 清除第二个单击事件
        //双击的处理逻辑
        if (titleEditing) {
            return
        }
        titleEditing = true
        let old = turndownService.turndown(this.innerHTML)
        this.innerHTML = ""

        let newObj = document.createElement("TEXTAREA");
        newObj.id = "textarea"
        newObj.className = "test_box"
        newObj.rows = "5"
        newObj.value = old
        makeExpandingArea(newObj);

        this.append(newObj)
        newObj.focus()
        newObj.onblur = function() {
            that.innerHTML = md.render(this.value)
            titleEditing = false
            that.style.padding = "10px 10px";
            makeExpandingArea(newObj);
        }
    })
}

//单击事件
for (let i = 0; i < marklist.children.length; i++) {
    marklist.children[i].addEventListener('click', function() {
        for (let j = 0; j < marklist.children.length; j++) {
            marklist.children[j].className = ''
            marklist.children[j].classList.add('showMarkdown')
        }
        marklist.children[i].classList.add('choose-markdown')
        clearTimeout(timeOut); // 清除第一个单击事件
        timeOut = setTimeout(function() {
            // 单击事件的代码执行区域
        }, time)

        activeNum.innerHTML = i
        activeNode = i
    })
}

//交换两个元素
function swapElements(el1, el2) {
    let prev1 = el1.previousSibling;
    let prev2 = el2.previousSibling;
    prev1.after(el2);
    prev2.after(el1);
}

//重新添加单击的监听事件
function listenClick() {
    for (let i = 0; i < marklist.children.length; i++) {
        marklist.children[i].addEventListener('click', function() {
            for (let j = 0; j < marklist.children.length; j++) {
                marklist.children[j].className = ''
                marklist.children[j].classList.add('showMarkdown')
            }
            marklist.children[i].classList.add('choose-markdown')
            clearTimeout(timeOut); // 清除第一个单击事件
            timeOut = setTimeout(function() {
                // 单击事件的代码执行区域
            }, time)

            activeNum.innerHTML = i
            activeNode = i
        })
    }
}

//单击修改标题
let titleEditing = false;
document.querySelector('#title').firstChild.addEventListener('click', function() {
    const that = this
    if (titleEditing) {
        return
    }
    titleEditing = true
    let old = this.innerHTML
    this.innerHTML = ""
    var newObj = document.createElement("input")
    newObj.className = "newTitle"
    newObj.value = old
    this.append(newObj)
    newObj.focus()
    newObj.onblur = function() {
        that.innerHTML = this.value ? this.value : old
        titleEditing = false
    }
})

//单击修改备注信息
let remarksEditing = false;
document.querySelector('.remarks').addEventListener('click', function() {
    const that = this
    if (remarksEditing) {
        return
    }
    remarksEditing = true
    let old = this.innerHTML
    this.innerHTML = ""
    var newObj = document.createElement("TEXTAREA")
    newObj.className = "remarks"
    newObj.value = old
    this.append(newObj)
    newObj.focus()
    newObj.onblur = function() {
        that.innerHTML = this.value ? this.value : old
        remarksEditing = false
    }
})

//设置textarea随文字内容自动调节高度
function makeExpandingArea(el) {
    var timer = null;
    //由于ie8有溢出堆栈问题，故调整了这里
    var setStyle = function(el, auto) {
        if (auto) el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }
    var delayedResize = function(el) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function() {
            setStyle(el)
        }, 200);
    }
    if (el.addEventListener) {
        el.addEventListener('input', function() {
            setStyle(el, 1);
        }, false);
        setStyle(el)
    } else if (el.attachEvent) {
        el.attachEvent('onpropertychange', function() {
            setStyle(el)
        })
        setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
        el.attachEvent("onkeydown", function() {
            var key = window.event.keyCode;
            if (key == 8 || key == 46) delayedResize(el);

        });
        el.attachEvent("oncut", function() {
            delayedResize(el);
        }); //处理粘贴
    }
}