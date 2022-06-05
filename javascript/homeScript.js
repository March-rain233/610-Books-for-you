document.getElementsByClassName("search-submit")[0].onclick = ()=>{
    if(document.getElementsByClassName('search-input')[0].value == '')
        return;
    parent.search(document.getElementsByClassName('search-input')[0].value);
    return false;
}