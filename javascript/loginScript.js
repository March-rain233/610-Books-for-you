document.getElementById("footer").onclick = ()=>parent.changeContent("register.html");
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
    $.getJSON("../data/userdata.json", "",
        function (data) {
            data = data.users;
            data = data.find(elem=>elem.name==user);
            if(data == undefined){
                alert('该账号尚未注册');
                return;
            }
            if(psw != data.psw){
                alert('密码输入错误');
                return;
            }
            parent.login(user);
        }
    );
    return false;
}