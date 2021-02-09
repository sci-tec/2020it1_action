var data =JSON.parse(sessionStorage.getItem('Save'));
data.t += data.s;
sessionStorage.setItem('Save', JSON.stringify({s:data.s,t:data.t,lv:data.lv,b:data.b,c:data.c}));
var data =JSON.parse(sessionStorage.getItem('Save'));
const LS_KEY = "score1";

let ran1 = document.getElementById('rn1');
let ran2 = document.getElementById('rn2');
let ran3 = document.getElementById('rn3');
let ran4 = document.getElementById('rn4');
let ran5 = document.getElementById('rn5');
function tui(){
  // 要素を取得
  let ele = document.getElementById('tui');
  // 現在の display プロパティの値を保持
  const displayOriginal = ele.style.display;
  // none に設定して非表示
  ele.style.display = 'none';
}
if(data.lv <= 3){
tui();
}

function getRankArr() {
    let arr = getLS(LS_KEY);
    if (arr == null) {
      return [];
    } else {
      return arr;
    }
  }

function getLS(KEY) {
  let str = localStorage.getItem(LS_KEY);
  console.log(str);
  let arr = JSON.parse(str);
  return arr;
}

function setLS(arr) {
  let strArr = JSON.stringify(arr);
  localStorage.setItem(LS_KEY, strArr);
}

function updateRank(user, score) {
  let rankItems = getRankArr();
  let newItems = [];
  let newItem = { n: user, s: score };
  let isAdded = false;

  if (rankItems.length == 0) {
    newItems.push(newItem);
  } else {
    for (let i = 0; i < rankItems.length; i++) {
      if (rankItems[i].s <= score && !isAdded) {
        newItems.push(newItem);
        isAdded = true;
      }
      newItems.push(rankItems[i]);
    }
  }
  if(newItems.length > 6){
    newItems.splice( 5, newItems.length);
  }
  //　切り捨て
  setLS(newItems);
  newItems =[];
}
function onclickname(){
   //localStorage.removeItem("score");
   updateRank(input.value, data.t);
   rank();
   tui();
}
function rank(){
   console.log(getLS(LS_KEY));
   if(getLS(LS_KEY).length>0){
     ran1.innerHTML = '<p><font size="10"><pre><b>１位</b>  ' + getLS("score")[0].n +"  "+ getLS("score")[0].s +  '</pre></font></p>';
   }
   if(getLS(LS_KEY).length>1){
     ran2.innerHTML = '<p><font size="10"><pre><b>２位</b>  ' + getLS("score")[1].n +"  "+ getLS("score")[1].s +  '</pre></font></p>';
   }
   if(getLS(LS_KEY).length>2){
     ran3.innerHTML = '<p><font size="10"><pre><b>３位</b>  ' + getLS("score")[2].n +"  "+ getLS("score")[2].s +  '</pre></font></p>';
   }
   if(getLS(LS_KEY).length>3){
     ran4.innerHTML = '<p><font size="10"><pre><b>４位</b>  ' + getLS("score")[3].n +"  "+ getLS("score")[3].s +  '</pre></font></p>';
   }
   if(getLS(LS_KEY).length>4){
     ran5.innerHTML = '<p><font size="10"><pre><b>５位</b>  ' + getLS("score")[4].n +"  "+ getLS("score")[4].s +  '</pre></font></p>';
   }
}
rank();




if(data.lv != 4){
  $(function(){
    $('.ranking-btn-return').click(function () {
      history.back();
    });
  });
}else{
  let ele = document.getElementById('ranking1');
  const displayOriginal = ele.style.display;
  ele.style.display = 'none';
}
