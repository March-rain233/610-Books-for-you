var user;
let page = document.getElementById("content");
let navLeft = document.getElementById("nav-left");
let home = navLeft.getElementsByTagName("li")[0];
let group = navLeft.getElementsByTagName("li")[1];
let quit = document.getElementById("quit");
let loginMenu = document.getElementById("login-menu");
home.onclick = ()=>{
    changeContent("home.html");
    activeNav(0);
}
group.onclick = ()=>{
    changeContent("bookgroup.html");
    activeNav(1);
}
quit.onclick = ()=>{
    document.getElementById("user-menu").style.display = "none";
    document.getElementById("login").style.display = "block";
    changeContent("home.html");
}
document.getElementById("login").onclick = ()=>changeContent("login.html");
// loginMenu.getElementsByTagName("li")[0].onclick = ()=>changeContent("login.html");
// loginMenu.getElementsByTagName("li")[1].onclick = ()=>changeContent("register.html");
document.getElementById("user-head").onclick = ()=>changeContent("usermenu.html");
document.getElementById("usercenter").onclick = ()=>changeContent("usermenu.html");
document.getElementById("user-nickname").onclick = ()=>changeContent("usermenu.html");
activeNav(0);
login('浅仓雨');
function changeContent(url){
    clearNav();
    if(url == "home.html"){
        activeNav(0);
    }
    document.getElementById("content").setAttribute("src", url);
    document.getElementById("content").onload = ()=>{
        let sub = document.getElementById("content").contentWindow.document;
        let fileref = sub.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", '../css/themes.css');
        sub.getElementsByTagName("head")[0].appendChild(fileref);
    }
}
function clearNav(){
    var children = document.getElementById("nav-left").getElementsByTagName('li');
    for(let j = 0; j < children.length; ++j){
        children[j].className = "";
    }
}
function activeNav(i){
    clearNav();
    var children = document.getElementById("nav-left").getElementsByTagName('li');
    children[i].className = "active";
}
function getHeadIcon(username, func){
    $.getJSON("../data/headpath.json", "",
        function (data) {
            let path = "../" + data.paths[username];
            func(path);
        }
    );
}
function login(username){
    user = username;
    document.getElementById("user-menu").style.display = "flex";
    document.getElementById("login").style.display = "none";
    document.getElementById("user-nickname").innerText = username;
    getHeadIcon(username, (src)=>{
        document.getElementById("user-head").src = src;
    })
    document.getElementById("user-head")
    changeContent("home.html");
}
function search(text){
    changeContent("search-result.html");
    document.getElementById("content").onload = ()=>{
        let sub = document.getElementById("content").contentWindow;
        sub.search(text);
    }
}