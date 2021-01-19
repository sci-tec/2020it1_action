const LS_KEY = "score";

function getRankArr() {
    let arr = getLS(LS_KEY);
    if (arr == null) {
      return [];
    } else {
      return arr;
    }
  }

function getLS(KEY) {
  let str = localStorage.getItem(KEY);
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
  let newItem = { p: user, s: score };
  let isAdded = false;

  if (rankItems.length == 0) {
    newItems.push(newItem);
  } else {
    for (let i = 0; i < rankItems.length; i++) {
      if (rankItems[i].s <= score && !isAdded) {
        newItems.push(newItem);
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
    updateRank(input.value, 100);
    console.log(getRankArr());
}