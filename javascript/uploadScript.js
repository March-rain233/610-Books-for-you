document.getElementById('submit').onclick = ()=>{
    let value = ""
    value += document.getElementById('name').value;
    value += document.getElementById('webname').value;
    value += document.getElementById('web').value;
    if(value == ""){
        alert('请填写完整表格');
        return;
    }
    alert('提交成功，请等待审核！');
    parent.changeContent("home.html");
    return false;
}