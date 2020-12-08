
// コンテを隠す
function hideBtn(){

    let x = document.getElementById("btn-wrap");
    x.style.display = "none"
}
// hideBtn();

// ルーレットコード

function button(){
    let startBtn = document.getElementById("startBtn") ;
    startBtn.addEventListener('click',function(){
        alert("Start!");
    });
    let stopBtn = document.getElementById("stopBtn");
    stopBtn.addEventListener('click',function(){
        alert("Stop!")
    })
};

button();

