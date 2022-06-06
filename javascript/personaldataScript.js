document.getElementById('back').onclick = ()=>{
    parent.changeContent("usermenu.html");
}
var remain = 10;
var tagList = [];
document.getElementById('tag-enter').onkeydown = (event)=>{
    event = event || window.event;
    if (event.keyCode == 13) {
        let tag = document.getElementById('tag-enter').value;
        if(remain <= 0){
            alert('标签数量已满');
        }
        if(tag == ""){
            return;
        }
        if(tagList.includes(tag)){
            alert('这个标签已经有过了哦');
            return;
        }
        document.getElementById('tag-enter').value = "";
        tagList.push(tag);
        let html = "<div class=\"tag\">" + tag + " ×</div>"
        remain -= 1;
        document.getElementById('tag-num').innerText = '还可以添加' + remain + '个标签';
        document.getElementById('tag-enter').insertAdjacentHTML("beforeBegin", html);
        let t = document.getElementById('tag-enter').previousSibling;
        t.onclick = ()=>{
            t.parentElement.removeChild(t);
            tagList.splice(tagList.indexOf(tag), 1);
            remain += 1;
            document.getElementById('tag-num').innerText = '还可以添加' + remain + '个标签';
        }
    }
}