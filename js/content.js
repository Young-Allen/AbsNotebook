let $parentNode = window.parent.document;

function $childNode(name) {
    return window.frames[name]
}

// tooltips
$('.tooltip-demo').tooltip({
    selector: "[data-toggle=tooltip]",
    container: "body"
});

// 使用animation.css修改Bootstrap Modal
$('.modal').appendTo("body");

$("[data-toggle=popover]").popover();

//折叠ibox
$('.collapse-link').click(function() {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    var content = ibox.find('div.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function() {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
    }, 50);
});

//关闭markdown
$('.close-link').click(function() {
    var content = $(this).closest('div.ibox');
    content.remove();
});


//animation.css
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function() {
            //动画完成之前移除class
            window.setTimeout(function() {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}