// let storyarr = [document.getElementsByClassName("storyline1"),
//                 document.getElementsByClassName("storyline2"),
//                 document.getElementsByClassName("storyline3"),
//                 document.getElementsByClassName("storyline4"),
//                 document.getElementsByClassName("storyline5"),
//                 document.getElementsByClassName("storyline6"),
//                 document.getElementsByClassName("storyline7"),
//                 document.getElementsByClassName("storyline8")];

// for(i = 0; i > storyarr.length; i++){
//     // console.log(storyarr[i]);
// }

// let arr = [
//     "./img/Storyline-1-1.png",
//     "./img/Storyline-1-7 2.png",
//     "./img/Storyline-1-8 2.png",
//     "./img/Storyline-1-4.png",
//     "./img/Storyline-1-5.png",
//     "./img/Storyline-1-6.png",
//     "./img/Storyline-1-7.png",
//     // "./img/Storyline-1-8.png"
    
// ];


let arr = [
    { "img": "./img/Storyline-1 (1)-1 (1).png", "text": "ある日、5年付き合った彼女からフラれブロックされてしまった.........." },
    { "img": "./img/Storyline-1 (1)-2 (1).png", "text": "ショックのあまり毎日酒におぼれるようになった....." },
    { "img": "./img/Storyline-1 (1)-3 (1).png", "text": "それから、酒とパチンコを繰り返す日々" },
    { "img": "./img/Storyline-1 (1)-4 (1).png", "text": "いつの間にか家賃を払うお金さえ無くなった" },
    { "img": "./img/Storyline-1 (1)-5 (1).png", "text": "3か月も家賃を払うことができず10年住んだアパートを追い出された" },
    { "img": "./img/Storyline-1 (1)-6 (1).png", "text": "ホームレスになって1週間が経ち" },
    { "img": "./img/Storyline-1 (1)-7 (1).png", "text": "自分の今までの酒やパチンコを繰り返す生活を変える決断をし、お金を集める冒険が始まる！！！" }
];


let currentImgIdx = 0;

$(function(){
    $('.storyline-btn').click(function () {
        currentImgIdx++;
        if(currentImgIdx < arr.length){
            let imgsrc = arr[currentImgIdx].img;
            document.getElementById('img').setAttribute('src', imgsrc);
            typewriter(currentImgIdx);
        }else{
            location.href='../start画面/startpage.html';
        }
        
    });
    typewriter(currentImgIdx);
});


function typewriter(idx) {
    let str = arr[idx].text;
    $("#text").html("");
    ityped.init(document.querySelector("#text"), {
        strings: [str], //表示させたい文字の設定 区切りはカンマ
        startDelay: 200, //アニメーション開始までの遅延、大きいほど遅れる
        typeSpeed: 100, //表示させるスピード、大きいほどゆっくり
        loop: false, //ループ
        backSpeed: 80, //戻るスピード
        backDelay: 150, //戻る時間指定
        showCursor: true, //カーソル表示
        cursorChar: "" //カーソルとして表示するテキスト
    });
}