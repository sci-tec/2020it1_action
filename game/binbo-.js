// キーボードの入力状態を記録する配列の定義
var input_key_buffer = new Array();

// キーボードの入力イベントをトリガーに配列のフラグ値を更新させる
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = true;
}

window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  e.preventDefault();
  input_key_buffer[e.keyCode] = false;
}

// canvas要素の取得
const canvas = document.getElementById("sample");
console.log(canvas);
const ctx = canvas.getContext("2d");

// 画像を表示するの座標の定義 & 初期化
var x = 300;
var y = 450;

// 上下方向の速度
var vy = 0;
// ジャンプしたか否かのフラグ値
var isJump = false;
// ジャンプ回数
var jp = 0;
var jplimit = 2;
// ゲームオーバーか否かのフラグ値
var isGameOver = false;
// ゴールか否かのフラグ値
var goal = false;
//キーが押されているか
var isupkeyup = true;

// ブロック要素の定義
var blocks = [];
var bloksy = [];
var coiny = [];
var coinyy = [];
let coinhi = [1500,1500,1500,1500,1500,40,80];
let blockyy = [562,562,562,562,562,562,462,462,1000,462];

for(let j=0; j<200; j++){
  var random = Math.floor( Math.random() * 9 );
  var coin = Math.floor( Math.random() * 7 );
  if(j<=6){
    bloksy.push(blockyy[0]);
    coinyy.push(-100);
  }else{
    bloksy.push(blockyy[random]);
    coinyy.push(blockyy[random]-coinhi[coin]);
  }
}
let sto = [0,0,0,0,0,0,0,0,1,2];
var sakey = [];
var tabakoy = [];
let blockx = 0;
let coinxx = 30;
for(let i=0; i<200; i++){
  let ran = Math.floor(Math.random()*10);
  blocks.push({ x: blockx, y: bloksy[i], w: 100, h: 32 },)
  if(sto[ran]==0){
    coiny.push({ x: coinxx, y: coinyy[i],isShow:true },)
  }else if(sto[ran]==1){
    sakey.push({ x: coinxx, y: coinyy[i], isShow:true},)
  }
  else if(sto[ran]==2){
    tabakoy.push({ x: coinxx, y: coinyy[i],isShow:true},)
  }
  blockx +=100;
  coinxx +=100;

}
　//お金変数
　let okane = 0;
  //速さ変数
  let speed = 3;
    //スピード変化
    let time = 60;
    let timeid = setInterval(function(){
      if(time%6==0){
        speed +=0.3;
      }
      if(time <= 0){
       alert("終了"+okane);
        clearInterval(timeid);
      }
      time--;
    },1000);
    timeid;
  // 背景の定義
  var bg1 = {x: 0, y: 0, w: 1500, h:735};
  var bg2 = {x: 1500, y: 0, w: 1500, h:735};



// ロード時に画面描画の処理が実行されるようにする
window.addEventListener("load", update);

// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // 画面全体をクリア
  ctx.clearRect(0, 0, 1500, 735);
  
  // 更新後の座標
  var updatedX = x;
  var updatedY = y;

  if (isGameOver) {
    // 上下方向は速度分をたす
    updatedY = y + vy;

    // 落下速度はだんだん大きくなる
    vy = vy + 0.5;

    if (y > 800) {
      // ゲームオーバーのキャラが更に下に落ちてきた時にダイアログを表示し、各種変数を初期化する
      alert("GAME OVER");
      isGameOver = false;
      isJump = false;
      updatedX = 300;
      updatedY = 300;
      vy = 0;
    }
  } else if(goal){
    if (blocks[199].x < 300){

      // alert("Goal");
      goal = false;
      vy = 0;
      sessionStorage.setItem('score', okane);
      // let score = document.getElementById('score');
      // score.innerHTML = 'Score:' + okane;
      // console.log(okane);
      location.href = "../goalpage/goalpage.html";
    }
  } else {
    // 入力値の確認と反映
    const blockTargetIsOn = getBlockTargrtIsOn(x, y, updatedX, updatedY);
    if(!input_key_buffer[32] && jp > 0) {
      isupkeyup = true;
    }
    if (input_key_buffer[32] && jp < jplimit && isupkeyup) {
      vy = -7.5;
      isJump = true;
      jp = jp + 1;
      isupkeyup = false;
    } else if (blockTargetIsOn !== null) {
      jp = 0;
      isupkeyup = true;
    }

    // ジャンプ中である場合のみ落下するように調整する
    if (isJump) {
      // 上下方向は速度分をたす
      updatedY = y + vy;

      // 落下速度はだんだん大きくなる
      vy = vy + 0.5;

      // 主人公が乗っているブロックを取得する
      const blockTargetIsOn = getBlockTargrtIsOn(x, y, updatedX, updatedY);

      // ブロックが取得できた場合には、そのブロックの上に立っているよう見えるように着地させる
      if (blockTargetIsOn !== null) {
        updatedY = blockTargetIsOn.y - 32;
        isJump = false;
      }
    } else {
      // ブロックの上にいなければジャンプ中の扱いとして初期速度0で落下するようにする
      if (getBlockTargrtIsOn(x, y, updatedX, updatedY) === null) {
        isJump = true;
        vy = 0;
      }
    }

    if (y > 800) {
      // 下まで落ちてきたらゲームオーバーとし、上方向の初速度を与える
      isGameOver = true;
      updatedY = 750;
      vy = -15;
    }

    if (blocks[199].x < 300) {
      goal = true;
    }
  }
  
  console.log(jp);
  console.log(isupkeyup);
  console.log(x);
  
  x = updatedX;
  y = updatedY;

//背景ループ
    if(bg1.x <= -1500){
      bg1.x = 1495;
    } else { 
      bg1.x -= 1;
    }
    if(bg2.x <= -1500){
      bg2.x = 1495;
    } else {
      bg2.x -= 1;
    }
//背景の画像を表示
  var background1 = new Image();
  background1.src = "./img/背景画像.png";
  ctx.drawImage(background1, bg1.x, bg1.y, 1500, 735);
  var background2 = new Image();
  background2.src = "./img/背景画像.png";
  ctx.drawImage(background2, bg2.x, bg2.y, 1500, 735);
  // 主人公の画像を表示
  var image = new Image();
  if (isGameOver) {
    // ゲームオーバーの場合にはゲームオーバーの画像が表示する
    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAB1klEQVR42u3csRECIRAFULowsAgDm7AQUxtyLMRS7AbNNOJ09pAD3p/7KQfsi0mp8+TX17JJABAABAABQAAQAAQAeQ/oesmlbn3AtYFE7wcAAAAAAAAAAAAAAAAAAAAAAP45wGgP+12xi2s87uVG9xhcP3y+YAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgSwAbLwAAAAAAAAAAAAAAAAAAAAAA9ASg9gMOSxcUbe0Bhvc3+gMUAAAAAAAAAAAAAAAAAAAAAADwSxsPKAxs9ocoAQAAAAAAAAAAAAAAAAAAAABgRQCbLwAAAAAAAAAAAAAAAAAAAAAAAPB1T+dcbOsBL+4PAAAAAAAAAAAAAAAAAAAAAAAmAhAFsnTBtQdQ+/9p9gAAAAAAAAAAAAAAAAAAAAAgH4kOoHUBAAAAAAAAAAAAAAAAAAAAAGAkAMd0yzXbO4Da9wMAAAAAAAAAAAAAAAAAAAAAACMB2DqQ1ucHAAAAAAAAAAAAAAAAAAAAAICZAIQfogwWAAAAAAAAAAAAAAAAAAAAAABmAjA6EAMGAAAAAAAAAAAAAAAAAAAAAIB+gPQOGAAAAAAAAAAAAAAAAAAAAAAAVswT8IsWg8TZxVcAAAAASUVORK5CYII=";
  } else {
image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABsElEQVR42u3dvQ3CMBCAUVcsQMEYFCzBILQsxCSMwjYHZaoYZJ8x4X3iyihI96ooP6VMXrx+M08RAAJAAAgAASAABIA2s2DAAAAAAAAAAAAAAAAAAAAAAACgX8fDPjInbte2edzXp3K8Kz0ACAABIAAEgAAQAAJAAAgAAQAAAAAAAAAAAAAAwOcLTAfw5QEAAAAAAAAAAAAAAAAAAAAAAADmmewLWQAAAAAAAAAAAAAAAAAAAAAA4H6BcUCyz++OEAAEgAAQAAJAAAgAvd/5ErE2tRcx1o6vjQ0AIAAEgAAQAAJAAGjcglun9YMOgAAAAAAAAAAAAAAAAAAAAAAAQL+yL+Rkf/gREAAAAAAAAAAAAAAAAAAAAAAAWCy49vBEMoBmIF4UCQAAAAAAAAAAAAAAAAAAAAAA3QBkL7gZCAAAAAAAAAAAAAAAAAAAAAAAADDshpBfnyIABIAAEAACQAAIgD/qtItomewFAAAAAAAAAAAAAAAAAAAAAAAAAPMAqM3W/x8AAAAAAAAAAAAAAAAAAAAAAADSbwHZ5wcEAAAAAAAAAAAAAAAAAAAAgIEAnrQrn26JvN6oAAAAAElFTkSuQmCC";
  }
  ctx.drawImage(image, x, y, 32, 32);

  // 地面の画像を表示
  var groundImage = new Image();
  groundImage.src = "./img/20140108152220 (1).png";
  for (const block of blocks) {block.x -=speed;
    ctx.drawImage(groundImage, block.x, block.y, block.w, block.h);
  }


    //お金を表示
     mono("./img/コイン￥.png",coiny,-100);
     //酒を表示
     mono("./img/お酒.png",sakey,100);
     //タバコを表示
     mono("./img/タバコ.png",tabakoy,100);

  

  
  // 再描画
  window.requestAnimationFrame(update);
}

// 変更前後のxy座標を受け取って、ブロック上に存在していればそのブロックの情報を、存在していなければnullを返す
function getBlockTargrtIsOn(x, y, updatedX, updatedY) {
  // 全てのブロックに対して繰り返し処理をする
  for (const block of blocks) {
    if (y + 32 <= block.y && updatedY + 32 >= block.y) {
      if (
        (x + 32 <= block.x || x >= block.x + block.w) &&
        (updatedX + 32 <= block.x || updatedX >= block.x + block.w)
      ) {
        // ブロックの上にいない場合には何もしない
        continue;
      }
      // ブロックの上にいる場合には、そのブロック要素を返す
      return block;
    }
  }
  // 最後までブロック要素を返さなかった場合はブロック要素の上にいないということなのでnullを返却する
  return null;
}
//画像の表示関数　引数➡（画像、配列、お金）
function mono(gaz,hai,kane){
  var ga = new Image();
  ga.src =gaz;
  for (let con of hai) {
    con.x -=speed;
    if(con.isShow){
      ctx.drawImage(ga, con.x, con.y, 35, 35);
    }
  if((x<=con.x+20&&x>=con.x-20)&&(y<=con.y+8 &&y>=con.y-32)){
     if(con.isShow) {
       okane-=kane;
       }
      con.isShow=false;
  }
  }
}