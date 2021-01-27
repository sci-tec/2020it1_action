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

let arr = [
    "./img/Storyline-1-1.png",
    "./img/Storyline-1-2.png",
    "./img/Storyline-1-3.png",
    "./img/Storyline-1-4.png",
    "./img/Storyline-1-5.png",
    "./img/Storyline-1-6.png",
    "./img/Storyline-1-7.png",
    "./img/Storyline-1-8.png"
];

let currentImgIdx = 0;

$(function(){
    $('.storyline-btn').click(function () {
        currentImgIdx++;
        if(currentImgIdx < arr.length){
            let imgsrc = arr[currentImgIdx];
            document.getElementById('img').setAttribute('src', imgsrc);
        }else{
            location.href='../start画面/startpage.html';
        }
        
    });
});
