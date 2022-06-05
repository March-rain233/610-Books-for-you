document.getElementById("footer").onclick = ()=>parent.window.changeContent("login.html");
document.getElementById("submit").onclick = function() {  
    let user = document.getElementById("user").value;
    let psw = document.getElementById("password").value;
    if(user == ''){
        alert('请输入账号');
        return;
    }
    if(psw == ''){
        alert('请输入密码');
        return;
    }
    if(psw != document.getElementById('overpassword').value){
        alert('两次密码输入不一致');
        return;
    }
    $.getJSON("../data/userdata.json", "",
        function (data) {
            data = data.users;
            data = data.find(elem=>elem.name==user);
            if(data != undefined){
                alert('该账号已注册');
                return;
            }
            parent.login('浅仓雨');
        }
    );
    return false;
}