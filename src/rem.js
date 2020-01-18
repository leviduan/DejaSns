var win = window;
var doc = win.document;
var docEl = doc.documentElement;
var tid;

function refreshRem(){
    var width = docEl.clientWidth;
    var height = docEl.clientHeight;
    // var width = docEl.getBoundingClientRect().width;
    // var height = docEl.getBoundingClientRect().height;

    if(width>=640){
        docEl.style.fontSize = '100px';
    }else{
        docEl.style.fontSize = 100 * (width / 375) + 'px';
    }



    // if ((width / height) > (375 / 667)) {
    //     var rem = height / (667 / 100);
    // } else {
    //     var rem = width / (375 / 100);
    // }
    // docEl.style.fontSize = rem + 'px';
}

win.addEventListener('resize', function() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
}, false);
win.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
    }
}, false);

refreshRem();
