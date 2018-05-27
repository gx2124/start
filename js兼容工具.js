function getScrollOffset() {
    if (window.pageYOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }

    return {
        x: document.documentElement.scrollLeft + document.body.scrollLeft,
        y: document.documentElement.scrollTop + document.body.scrollTop
    }
}

function getViewportOffset() {

    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    }
    if (document.compatMode == "CSS1Compat") {
        return {
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        }
    } else if (document.compatMode == "BackCompat") {
        return {
            w: document.body.clientWidth,
            h: document.body.clientHeight
        }
    }
}

function getElementOffset(ele) {
    var box = ele.getBoundingClientRect();
    var w = box.width || (box.right - box.left);
    var h = box.height || (box.bottom - box.top);
    return {
        w: w,
        h: h
    }
}

function getElementPostion(ele) {

    var x = 0,
        y = 0;

    while (ele != document.body) {
        x += ele.offsetLeft;
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }

    return {
        x: x,
        y: y
    }
}

function getStyle(obj, styleProp) {

    if (obj.currentStyle) {
        return obj.currentStyle[styleProp];
    } else {
        return window.getComputedStyle(obj, null)[styleProp];
    }
}


function addEvent(elem, type, handler) {

    if(elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    }else if(elem.attachEvent) {

        elem['temp' + type + handler] = handler;
        elem[type + handler] = function () {
            elem['temp' + type + handler].call(elem);
        };
        elem.attachEvent('on' + type, elem[type + handler]);

    }else{
        elem['on' + type] = handler;
    }
}

function removeEvent(elem, type, handler) {
    if(elem.removeEventListener) {
        elem.removeEventListener(type, handler, false);
    }else if(elem.detachEvent) {
        elem.detachEvent('on' + type, handler);
    }else{
        elem['on' + type] = null;
    }
}

function stopBubble(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
}

function cancelHandler(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else{
        event.returnValue = false;
    }

}


function drag(elem) {
    var disX,
        disY;
    addEvent(elem, 'mousedown', function (e) {
        var event = e || window.event;
        disX = event.clientX - parseInt(getStyle(elem, 'left'));
        disY = event.clientY - parseInt(getStyle(elem, 'top'));
        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);
        stopBubble(event);
        cancelHandler(event);
    });
    function mouseMove(e) {
        var event = e || window.event;
        elem.style.left = event.clientX - disX + "px";
        elem.style.top = event.clientY - disY + "px";
    }
    function mouseUp(e) {
        var event = e || window.event;
        removeEvent(document, 'mousemove', mouseMove);
        removeEvent(document, 'mouseup', mouseUp);
    }
}

function asyncLoaded(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if(script.readyState) {//IE
        script.onreadystatechange = function () {
            if(script.readyState == "complete" || script.readyState == "loaded") {
                obj[callback]();
                script.onreadystatechange = null;
            }
        }
    }else{//chrome safari firefox
        script.onload = function () {
            obj[callback]();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

function type(target) {
    var typeStr = typeof(target),
        toStr = Object.prototype.toString,
        objStr = {
            "[object Object]" : "object - Object",
            "[object Array]" : "array - Object",
            "[object Number]" : "number - Object",
            "[object Boolean]" : "boolean - Object",
            "[object String]" : "string - Object"
        }
    if(target === null) {
        return null;
    }else if(typeStr === "function") {
        return "function";
    }
    if(typeStr !== "object") {
        return typeStr;
    }else{
        return objStr[toStr.call(target)];
    }
}

