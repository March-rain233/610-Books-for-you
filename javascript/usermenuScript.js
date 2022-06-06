document.getElementById('user-changebtn').onclick = ()=>parent.changeContent('personaldata.html');
let atrs = document.getElementById('bar').children;
atrs[0].onclick = ()=>{
    clearNav();
    atrs[0].classList.add('active');
    document.getElementById('score').style.display = 'none';
    document.getElementById('source').style.display = 'none';
}
atrs[1].onclick = ()=>{
    clearNav();
    atrs[1].classList.add('active');
    document.getElementById('score').style.display = 'block';
    document.getElementById('source').style.display = 'none';
}
atrs[2].onclick = ()=>{
    clearNav();
    atrs[2].classList.add('active');
    document.getElementById('score').style.display = 'none';
    document.getElementById('source').style.display = 'block';
}
clearNav();
atrs[0].classList.add('active');
document.getElementById('score').style.display = 'none';
document.getElementById('source').style.display = 'none';
function clearNav(){
    for(let i = 0; i< atrs.length; ++i){
        atrs[i].classList.remove('active');
    }
}