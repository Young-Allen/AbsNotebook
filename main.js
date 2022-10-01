import './style.css'
import markdownIt from 'markdown-it'
import TurndownService from 'turndown'

//markdown转html
const md = new markdownIt();
//html转markdown
const turndownService = new TurndownService();
turndownService.keep(['del', 'ins'])

var time = 200;
var timeOut = null;

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

//单击cell选中cell
document.querySelector('.showMarkdown').addEventListener('click', function() {
    this.stopPropagation();
    clearTimeout(timeOut); // 清除第一个单击事件
    timeOut = setTimeout(function() {
        alert("单击")
            // 单击事件的代码执行区域
            // ...
    }, time)
})

//双击cell进入编辑模式
document.querySelector('.showMarkdown').addEventListener('dblclick', function() {
    let titleEditing = false;
    this.style.padding = "0";
    const that = this
    clearTimeout(timeOut); // 清除第二个单击事件
    // alert("双击");
    //双击的处理逻辑
    if (titleEditing) {
        return
    }
    titleEditing = true
    let old = this.innerHTML
    old = turndownService.turndown(old)
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