var results = [];
function search(text){
    $.getJSON("../data/books.json", "",
        function (data) {
            let list = text.split(' ');
            let books = data.books;
            results = [];
            books.map(book=>{
                for(let i = 0; i < list.length; ++i){
                    if(book.name.indexOf(list[i]) != -1){
                        if(results.find(elem=>elem.name == book.name) != undefined){
                            results.find(elem=>elem.book == book.name).priority += 1;
                        }
                        else{
                            results.push({
                                book:book,
                                priority:1
                            })
                        }
                    }
                }
            });
            document.getElementById('search-num').innerText = '共' + results.length + '项相关结果';
            createList();
        }
    );
}
function createList(){
    document.getElementById('results').innerHTML = "";
    for(let i = 0;i<results.length;++i){
        createItem(results[i].book);
    }
}
function createItem(book){
    let stars = '';
    for(let i = 0; i < book.score / 2; ++i){
        stars += '★';
    }
    let html = "<div class=\"result-item\">" +
        "<div class=\"item-preview\">" +
            "<img class=\"item-cover\" src=\"../data/default-cover.jpg\">" +
            "<img class=\"item-web-icon\" src=\"../data/default-web-icon.jpg\">" +
        "</div>" +
            "<div class=\"item-detail\">" +
                "<div class=\"item-name-group\">" +
                    "<p class=\"item-name\">" + book.name + "</p>" +
                    "<p>-</p>" +
                    "<p class=\"item-web\">" + book.webname + "</p>" +
                "</div>" +
            "<div class=\"item-score-group\">" +
            "<p class=\"item-score-stars\">" +
                stars +
            "</p>" +
            "<p class=\"item-score-text\">" + book.score + "</p>" +
        "</div>" +
            "<div class=\"item-notify\">" +
                "<p>资源缺失</p>" +
                "<span class=\"spilt-line\"></span>"+
                "<p>有软广告</p>" +
                "<span class=\"spilt-line\"></span>" +
                "<p>部分免费</p>" +
            "</div>" +
        "</div>" +
        "<div class=\"item-button-group\">" +
            "<button>跳转</button>" +
            "<button>评价</button>" +
        "</div>" +
        "</div>";
    document.getElementById('results').insertAdjacentHTML("beforeEnd", html);
}
document.getElementsByClassName('search-submit')[0].onclick = ()=>{
    search(document.getElementsByClassName('search-input')[0].value);
    return false;
}