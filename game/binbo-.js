
//開発中はtrueにしてください。
const ON_OFF = true;
let on_off = 100;
if(ON_OFF==true){
on_off = 20;
}
//データ呼び出し
var data =JSON.parse(sessionStorage.getItem('Save'));
var Gdata =JSON.parse(sessionStorage.getItem('gz'));

$(function() {
  console.log(data);
// キーボードの入力状態を記録する配列の定義
var input_key_buffer = new Array();
/*//URL　？あとの文字を取得
var hurl = window.location.search;
hurl = hurl.substring(1);
//文字を＆で分けて配列に入れる
var hhai = hurl.split('&');*/

//変数定義

var imgsPlayerSrc = [
  "./img/player_1.png",
  "./img/player_2.png",
  "./img/player_3.png",
];
var frameCounter = 0;
var imgsCoinSrc = [
  // './img/coin/coin0001.png',
  // './img/coin/coin0001.png',
  // './img/coin/coin0002.png',
  // './img/coin/coin0002.png',
  // './img/coin/coin0003.png',
  // './img/coin/coin0003.png',
  // './img/coin/coin0003.png',
  // './img/coin/coin0004.png',
  // './img/coin/coin0004.png',
  // './img/coin/coin0005.png',
  // './img/coin/coin0005.png',
  // './img/coin/coin0005.png',
  // './img/coin/coin0006.png',
  // './img/coin/coin0006.png',
  // './img/coin/coin0007.png',
  // './img/coin/coin0007.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 6.png',
  './img/coin/アセット 7.png',
  './img/coin/アセット 7.png',
  './img/coin/アセット 7.png',
  './img/coin/アセット 7.png',
  './img/coin/アセット 8.png',
  './img/coin/アセット 8.png',
  './img/coin/アセット 8.png',
  './img/coin/アセット 8.png',
  './img/coin/アセット 9.png',
  './img/coin/アセット 9.png',
  './img/coin/アセット 9.png',
  './img/coin/アセット 9.png',

];

var x, y, vy,isJump,jp,jplimit,isGameOver,goal,isupkeyup,blocks,
bloksy,coiny,sakey,tabakoy,tabakoy,coinyy;
let blockx,coinxx,sto,coinhi,blockyy,okane,time,speed,bg1,bg2,timeid,blv,sotlv,kane;
//ステージレベル関数
function Stage(lv){
if(lv==1){
  blv = 8;
  sotlv = 6;
  kane = 100;
}else if(lv==2){
  blv = 9;
  sotlv = 7;
  kane = 200 * data.b;
}else if(lv==3){
  blv = 10;
  sotlv = 8;
  kane = 300 * data.b;
}
}
//ステージレベル関数data.lvは、１～３までの数字(レベル)が入る。
Stage(data.lv);


//音
const jpSound = new Audio("./img/jump01.mp3");
const conSound = new Audio("./img/coin07.mp3");
const saketabakoSound = new Audio("./img/select08.mp3");
const bgm = new Audio("./img/bgm.mp3");

//文字を表示
let Time = document.getElementById('Time');
let score = document.getElementById('score');
let Total = document.getElementById('total');
let StageLv = document.getElementById('stageLv');
let Bai = document.getElementById('bai');
// canvas要素の取得
const canvas = document.getElementById("sample");
console.log(canvas);
const ctx = canvas.getContext("2d");
///////////////////////////////////////////////////////////////
function init(){
  // 画像を表示するの座標の定義 & 初期化
  x = 300;
  y = 450;

  // 上下方向の速度
  vy = 0;
  //ジャンプしたか否かのフラグ値
  isJump = false;
  // ジャンプ回数
  jp = 0;
  jplimit = 2;
  // ゲームオーバーか否かのフラグ値
  isGameOver = false;
  // ゴールか否かのフラグ値
  goal = false;
  //キーが押されているか
  isupkeyup = true;

  // ブロック要素の定義
  blocks = [];//ブッロクのxとyの位置
  bloksy = [];//x,y座標をを決める
  coiny = [];//お金のxとyの位置
  sakey = [];//酒のxとyの位置
  tabakoy = [];//タバコのxとyの位置
  coinyy = [];//x,y座標をを決める
  blockx = 0;//ブッロクのxの位置
  coinxx = 30;//お金、酒、タバコのxの位置
  sto = [0,0,0,0,0,0,0,0,1,2];//お金、酒、タバコの出る確率
  coinhi = [1500,1500,1500,1500,40,80,40,80,40,80];//お金、酒、タバコの位置Ｙ座標
  if(1 <= data.c){
    for(let i=0; i<data.c; i++){
      sto.push(0,0,0,0);
      coinhi[i] = 40;
    }
  }
  
  blockyy = [562,562,562,562,562,562,462,462,1000,462.1];//ブッロクの位置座標

  //お金変数
  okane = 0;
  //速さ変数
  speed = 3;
  //時間
  time = 60;
  // 背景の定義
  bg1 = {x: 0, y: 0, w: 1500, h:735};
  bg2 = {x: 1500, y: 0, w: 1500, h:735};

}
///////////////////////////////////////////////////////////////
  init();
  addEventListeners();
  setYaxisBlockAndCoin();
  createMap();
  start();
// 画面を更新する関数を定義 (繰り返しここの処理が実行される)
function update() {
  // console.log("update");
  // 画面全体をクリア
  ctx.clearRect(0, 0, 1500, 735);
  // 更新後の座標
  var updatedX = x;
  var updatedY = y;
  //ゲームプレイ中の動作、ゲームオーバー、ゲームクリア関数
  
  if (isGameOver) {
    // 上下方向は速度分をたす
    updatedY = y + vy;

    // 落下速度はだんだん大きくなる
    vy = vy + 0.5;

    if (y > 800) {
      // ゲームオーバーのキャラが更に下に落ちてきた時にダイアログを表示し、各種変数を初期化する
      isGameOver = false;
      clearInterval(timeid);
      
      location.href = "../gameOver画面/gameOver.html?";

    }
  } else if(goal){
    sessionStorage.removeItem('didRoulette');
    if (blocks[on_off].x < 300){
      speed = 0;
      goal = false;
      clearInterval(timeid);
      sessionStorage.setItem('Save', JSON.stringify({s:okane,t:data.t,lv:data.lv+1,b:data.b,c:data.c,suit:data.suit,car:data.car,home:data.home}));
      if(data.lv == 3){
        location.href = "../Rank/rank.html?";
      }else{
        location.href = "../goalpage/goalpage.html?";
      }
        
      
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
      jpSound.currentTime = 0;
      jpSound.play();
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


    if (blocks[on_off].x < 300) {

      goal = true;
    }
  }
  // 更新後の座標
  x = updatedX;
  y = updatedY;
  //画像を表示
  refleshImages(kane);
  // 再描画
  window.requestAnimationFrame(update);
}
///////////////////////////////////////////////////////////////
// 変更前後のxy座標を受け取って、ブロック上に存在していればそのブロックの情報を、存在していなければnullを返す
function getBlockTargrtIsOn(x, y, updatedX, updatedY) {
  // console.log("getBlockTargrtIsOn");
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
///////////////////////////////////////////////////////////////
//画像まとめ関数
function refleshImages(kane){
// console.log("refleshImages");
  frameCounter++;

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
    // image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAB1klEQVR42u3csRECIRAFULowsAgDm7AQUxtyLMRS7AbNNOJ09pAD3p/7KQfsi0mp8+TX17JJABAABAABQAAQAAQAeQ/oesmlbn3AtYFE7wcAAAAAAAAAAAAAAAAAAAAAAP45wGgP+12xi2s87uVG9xhcP3y+YAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgSwAbLwAAAAAAAAAAAAAAAAAAAAAA9ASg9gMOSxcUbe0Bhvc3+gMUAAAAAAAAAAAAAAAAAAAAAADwSxsPKAxs9ocoAQAAAAAAAAAAAAAAAAAAAABgRQCbLwAAAAAAAAAAAAAAAAAAAAAAAPB1T+dcbOsBL+4PAAAAAAAAAAAAAAAAAAAAAAAmAhAFsnTBtQdQ+/9p9gAAAAAAAAAAAAAAAAAAAAAgH4kOoHUBAAAAAAAAAAAAAAAAAAAAAGAkAMd0yzXbO4Da9wMAAAAAAAAAAAAAAAAAAAAAACMB2DqQ1ucHAAAAAAAAAAAAAAAAAAAAAICZAIQfogwWAAAAAAAAAAAAAAAAAAAAAABmAjA6EAMGAAAAAAAAAAAAAAAAAAAAAIB+gPQOGAAAAAAAAAAAAAAAAAAAAAAAVswT8IsWg8TZxVcAAAAASUVORK5CYII=";
    image.src = "./img/playerGameover.png";
  } else {
  // image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABsElEQVR42u3dvQ3CMBCAUVcsQMEYFCzBILQsxCSMwjYHZaoYZJ8x4X3iyihI96ooP6VMXrx+M08RAAJAAAgAASAABIA2s2DAAAAAAAAAAAAAAAAAAAAAAACgX8fDPjInbte2edzXp3K8Kz0ACAABIAAEgAAQAAJAAAgAAQAAAAAAAAAAAAAAwOcLTAfw5QEAAAAAAAAAAAAAAAAAAAAAAADmmewLWQAAAAAAAAAAAAAAAAAAAAAA4H6BcUCyz++OEAAEgAAQAAJAAAgAvd/5ErE2tRcx1o6vjQ0AIAAEgAAQAAJAAGjcglun9YMOgAAAAAAAAAAAAAAAAAAAAAAAQL+yL+Rkf/gREAAAAAAAAAAAAAAAAAAAAAAAWCy49vBEMoBmIF4UCQAAAAAAAAAAAAAAAAAAAAAA3QBkL7gZCAAAAAAAAAAAAAAAAAAAAAAAADDshpBfnyIABIAAEAACQAAIgD/qtItomewFAAAAAAAAAAAAAAAAAAAAAAAAAPMAqM3W/x8AAAAAAAAAAAAAAAAAAAAAAADSbwHZ5wcEAAAAAAAAAAAAAAAAAAAAgIEAnrQrn26JvN6oAAAAAElFTkSuQmCC";
    // image.src = "./img/player_1.png";
    image.src = imgsPlayerSrc[Math.floor(frameCounter/5)%imgsPlayerSrc.length];
  }
  ctx.drawImage(image, x, y, 32, 32);
  // 地面の画像を表示
  var groundImage = new Image();
  groundImage.src = "./img/20140108152220 (1).png";
  for (const block of blocks) {block.x -=speed;
    ctx.drawImage(groundImage, block.x, block.y, block.w, block.h);
  }


    //お金を表示
     mono(congaz,coiny,-kane,0);

     //酒を表示
     mono(sizeswich,sakey,kane,5);
     //タバコを表示
     mono(sizehenkou,tabakoy,kane,5);
}

var sizeswich = "./img/お酒.png";
var sizehenkou = "./img/タバコ.png";

const congaz = "./img/コイン￥.png";

//画像の表示関数　引数➡（画像、配列、お金）
function mono(gaz,hai,kane,TIME){
  // console.log("mono");
  score.innerHTML='所持金' + Number(okane).toLocaleString() + '円';
  var ga = new Image();
  // ga.src =gaz;
  ga.src = (gaz == congaz) ? imgsCoinSrc[frameCounter%imgsCoinSrc.length] : gaz;
  for (let con of hai) {
    con.x -=speed;
    if(con.isShow){
      if(gaz == sizeswich || gaz == sizehenkou){
        ctx.drawImage(ga, con.x, con.y, 20, 35);
      }
      else{
        ctx.drawImage(ga, con.x, con.y, 35, 35);
      }
    }
  if((x<=con.x+25&&x>=con.x-25)&&(y<=con.y+32 &&y>=con.y-32)){
     if(con.isShow) {
       okane-=kane;
       time-=TIME;
       }
      con.isShow=false;
      if(gaz == congaz) {
        conSound.currentTime = 0;
        conSound.play();
      } else {
        saketabakoSound.currentTime = 0;
        saketabakoSound.play();
      }
      
    }
  }
}
///////////////////////////////////////////////////////////////
function  createMap(){
  console.log("createMap")
    for(let i=0; i<200; i++){
      let ran = Math.floor(Math.random()*sto.length);
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
}
////////////////////////////////////////////////////////////////
function addEventListeners(){
  console.log("addEventListeners");
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
}
//ステージレベルを変える関数　引数➡（ブロックのLv,コイン、酒、タバコのLv)
function setYaxisBlockAndCoin (){
  console.log("setYaxisBlockAndCoin");
  for(let j=0; j<200; j++){
  var random = Math.floor( Math.random() * blv );
  var coin = Math.floor( Math.random() * sotlv );
  if(j<=6){
    bloksy.push(blockyy[0]);
    coinyy.push(-100);
  }else{
    if(bloksy[j-1]==blockyy[9]){
      bloksy.push(362);
      coinyy.push(362-coinhi[coin]);
    }else if(bloksy[j-1]==1000 && bloksy[j-2]==1000){
      bloksy.push(562);
      coinyy.push(562-coinhi[coin]);
    }else{
      bloksy.push(blockyy[random]);
      coinyy.push(blockyy[random]-coinhi[coin]);
    }
  }
}
}
function playBGM() {
  var log = function(){
    console.log("kita");
    bgm.play();
    clearTimeout(timer);
  };
  var timer = setTimeout(log, 1000);
}
///////////////////////////////////////////////
function start(){
  console.log("start");
  let d = sessionStorage.getItem('Save');
  Total.innerHTML = 'トータルスコア:' + data.t;
  StageLv.innerHTML = 'ステージレベル:' + data.lv;
  Bai.innerHTML = '倍率:' + data.b　+ '倍';
  timeid = setInterval(function(){
   Time.innerHTML = 'タイマー:' + time + '秒';
   if(time%6==0){
     speed +=0.3;
   }
   if(time <= 0){
     clearInterval(timeid);
     location.href = "../gameOver画面/gameOver.html?"// + hhai[0] + "&" +  hhai[1];
   }
   time--;
  },1000);
  // ロード時に画面描画の処理が実行されるようにする
  window.addEventListener("load", update);
  playBGM();
}
});