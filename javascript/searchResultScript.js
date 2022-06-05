var results = [];
var filter = [{name:'miss', value:false}, {name:'ad', value:false}, {name:'pay', value:false}];
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
            results.sort((a, b)=>b.priority-a.priority);
            results.sort((a, b)=>b.book.score - a.book.score);
            sort();
        }
    );
}
function sort(){
    let res = results.map(elem=>elem);
    if(filter[0].value){
        res = res.sort((a,b)=>{
            let av = a.book.miss?0:1;
            let bv = b.book.miss?0:1;
            return bv - av;
        })
    }
    if(filter[1].value){
        res = res.sort((a,b)=>{
            let av = a.book.ad=='none'?2:a.book.ad=='soft'?1:0;
            let bv = b.book.ad=='none'?2:b.book.ad=='soft'?1:0;
            return bv - av;
        })
    }
    if(filter[2].value){
        res = res.sort((a,b)=>{
            let av = a.book.pay=='none'?2:a.book.pay=='soft'?1:0;
            let bv = b.book.pay=='none'?2:b.book.pay=='soft'?1:0;
            return bv - av;
        })
    }
    createList(res);
}
function createList(res){
    document.getElementById('results').innerHTML = "";
    for(let i = 0;i<res.length;++i){
        createItem(res[i].book);
    }
}
function createItem(book){
    let stars = '';
    for(let i = 0; i < book.score / 2; ++i){
        stars += '★';
    }
    let atr = "";
    if(book.miss){
        atr += "<p>资源缺失</p>" + "<span class=\"spilt-line\"></span>";
    }
    if(book.ad == 'soft'){
        atr +="<p>有软广告</p>" +"<span class=\"spilt-line\"></span>";
    }
    else if(book.ad == 'hard'){
        atr +="<p>有硬广告</p>" +"<span class=\"spilt-line\"></span>";
    }
    if(book.pay == 'soft'){
        atr +="<p>少量付费</p>" +"<span class=\"spilt-line\"></span>";
    }
    else if(book.pay == 'hard'){
        atr +="<p>大量付费</p>" +"<span class=\"spilt-line\"></span>";
    }
    atr = atr.replace(/<span class="spilt-line"><\/span>$/, '');
    let html = "<div class=\"result-item\">" +
        "<div class=\"item-preview\">" +
            "<img class=\"item-cover\" src=" + book.cover + ">" +
            "<img class=\"item-web-icon\" src=" + book.icon + ">" +
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
                atr + 
            "</div>" +
        "</div>" +
        "<div class=\"item-button-group\">" +
            "<button onclick=\"window.open(\'" + book.web +"\')\">跳转</button>" +
            "<button>评价</button>" +
        "</div>" +
        "</div>";
    document.getElementById('results').insertAdjacentHTML("beforeEnd", html);
}
document.getElementsByClassName('search-submit')[0].onclick = ()=>{
    search(document.getElementsByClassName('search-input')[0].value);
    return false;
}
pris = document.getElementsByClassName('search-priority-select');
for(let i = 0;i<pris.length;++i){
    let n = i;
    pris[i].onclick = ()=>{
        if(pris[n].classList.contains('active')){
            pris[n].classList.remove('active');
            filter[n].value = false;
        }
        else{
            pris[n].classList.add('active');
            filter[n].value = true;
        }
        sort();
    }
}