let isIn = true;
function cubicBezier(p1x, p1y, p2x, p2y) {
    const ZERO_LIMIT = 1e-6;
    const ax = 3 * p1x - 3 * p2x + 1;
    const bx = 3 * p2x - 6 * p1x;
    const cx = 3 * p1x;
    const ay = 3 * p1y - 3 * p2y + 1;
    const by = 3 * p2y - 6 * p1y;
    const cy = 3 * p1y;
    function sampleCurveDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
    }
    function sampleCurveX(t) {
        return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
        return ((ay * t + by) * t + cy) * t;
    }
    function solveCurveX(x) {
        let t2 = x;
        let derivative;
        let x2;

        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            derivative = sampleCurveDerivativeX(t2);
            if (Math.abs(derivative) < ZERO_LIMIT) {
                break;
            }
            t2 -= x2 / derivative;
        }
        let t1 = 1;
        let t0 = 0;
        t2 = x;
        while (t1 > t0) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < ZERO_LIMIT) {
                return t2;
            }
            if (x2 > 0) {
                t1 = t2;
            } else {
                t0 = t2;
            }
            t2 = (t1 + t0) / 2;
        }
        return t2;
    }
    function solve(x) {
        return sampleCurveY(solveCurveX(x));
    }
    return solve;
}
function SpringInterpolator(newFactor){
    const factor = newFactor;
    function solve(x){
        return Math.pow(2, -10 * x) * Math.sin((x - factor / 4) * (2 * Math.PI) / factor) + 1
    }
    return solve;
}
function itemAnim(item) {
    let isRight = item.classList.contains('item-right');
    let user = item.getElementsByClassName("group-item-user")[0];
    item = item.getElementsByClassName("group-item-content")[0];
    clearInterval(item.timer);
    const bezier = cubicBezier(0.38, 0, 0.38, 1);
    const hspring = SpringInterpolator(0.4);
    const wspring = SpringInterpolator(0.8);
    var perc = 0;
    const time = 2;
    const dt = 30.0;
    const dp = dt / (time * 1000.0);
    const rotatePerc = 0.06;
    const oriDeg = isRight ? -75 :75;
    const opaBezier = cubicBezier(0,0,0,1);
    let flag = false;
    const dis = 170;
    user.style.opacity = 0;
    user.style.transform = 'translate(' + (isRight ? dis : -dis) + 'px,' + '0' + ')';
    item.style['transform-origin'] = isRight ? "100% 84%" : "0 84%";
    item.timer = setInterval(() => {
        if(perc < 1){
            let t = bezier(perc);

            let deg = t <= rotatePerc ? oriDeg * (1 - t / rotatePerc) : 0;
            let hscale = 1 * hspring(t);
            let wscale = 1 * wspring(t);

            item.style.transform = 'rotateZ(' + deg + 'deg) scale(' + wscale + ',' + hscale + ')';

            user.style.opacity = opaBezier(Math.min(perc * time/1.5, 1));
            user.style.transform = 'translate(' + (1 -opaBezier(Math.min(perc * time/0.3, 1)))*(isRight ? dis : -dis) + 'px,' + '0' + ')';

            perc += dp;
            if(hscale > 0.1 && !flag){
                item.classList.add('active');
                flag = true;
            }
        }
        else {
            clearInterval(item.timer);
            item.style.transform = 'rotateZ(0) scale(1)';
            user.style.opacity = 1;
        }
    }, dt);
}
function clearNav(){
    var children = document.getElementById("left").getElementsByTagName('p');
    for(let j = 0; j < children.length; ++j){
        children[j].className = "";
    }
}
function activeNav(i){
    clearNav();
    var children = document.getElementById("left").getElementsByTagName('p');
    children[i].className = "active";
}
function pullChange(value){
    let list = document.getElementById("left").classList;
    list.add(value?"in":"out");
    list.remove(value?"out":"in");
    document.getElementById('pull').innerText = value?">":"<";
}
function createItem(data, isRight){
    let conllection = document.getElementById('group');
    let html = "<div class=\"group-item" + (isRight ? " item-right" : "") + "\">" +
        "<div class=\"group-item-user\">" +
        "<img src=\"../data/default-userhead.jpg\">" +
        "<p>" + data.username + "</p>" +
        "</div>" +
        "<div class=\"group-item-content\">" +
        "<p class=\"group-item-title\">" + data.content + "</p>" +
        "</div>" +
        "</div>";
        document.getElementById('bottom-flag').insertAdjacentHTML("beforebegin", html);
    parent.getHeadIcon(data.username, function (src) {
        conllection.getElementsByClassName('group-item')[conllection.getElementsByClassName('group-item').length - 1].getElementsByTagName('img')[0].src = src;
    });
    itemAnim(conllection.getElementsByClassName('group-item')[conllection.getElementsByClassName('group-item').length - 1]);
}
function createItemList(dataset){
    dataset = dataset.items;
    let conllection = document.getElementById('group');
    let bottomflag = document.getElementById('bottom-flag');
    let i = 0;
    let obs = new IntersectionObserver(function(entry, observal){
        console.log(entry[0].target);
        if(entry[0].isIntersecting){
            createItem(dataset[i], i % 2 == 0);
            i += 1;
        }
        if(i >= dataset.length){
            console.log(i);
            observal.unobserve(entry[0].target);
        }
    },{ root:conllection,
        rootMargin: '0px 0px 0px 0px',
        threshold: 1,
        trackVisibility: true,
        delay: 100});
    for(;i<3;++i){
        createItem(dataset[i], i % 2 == 0);
    }
    obs.observe(bottomflag);
}
function readList(url, func){
    $.getJSON(url,
        function (data) {
            func(data);
        }
    );
}
var children = document.getElementById("left").getElementsByTagName('p');
for(let i = 0;i<children.length;++i){
    children[i].onclick = ()=>{
        activeNav(i);
    }
}
activeNav(0);
document.getElementById('pull').onclick = ()=>{
    isIn = !isIn;
    pullChange(isIn);
}
pullChange(isIn);
readList("../data/groupitems.json", createItemList);