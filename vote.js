function mylog(v) { divStats.innerHTML += (v + "<br>"); }

function resetImgs() {
  idxSelect = -99;
  voteAllowed = true;
  imgLeftE.className  = "imgNormal";
  imgRightE.className = "imgNormal";
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
   // Slice() forces value copying (doesn't just creating a reference)
  fnPool  = img_fn.slice();
  idxPool = img_idx.slice();
}

function global_init() {
  // Don't use "var" in this function; we need to init global vars

  img_fn = ["blueMarinatedTurkey.jpg", "condimentSprays.jpg", "cornDogs.jpg", "cranberryCandles.jpg", "frozenShrimp.jpg", "frozenWhatAreThese.jpg", "heatedSoda.jpg", "jelloMayoTurkey.jpg", "pastaOnionsCandy.jpg", "whipcreamSoup.jpg"];

  // To track which imgs' indices of the original array have already by shown
  img_idx = [];
  for (var ii=0; ii < img_fn.length; ii++) { img_idx[ii] = ii; }

  imgDir = "./img/"
  imgLeftE  = document.getElementById("imgLeft");
  imgRightE = document.getElementById("imgRight");
  btnVote   = document.getElementById("btnVote");
  btnNew    = document.getElementById("btnNew");
  divStats  = document.getElementById("divStats");

  resetPool();
  imgLeftE.addEventListener( "click", selectImg);
  imgRightE.addEventListener("click", selectImg);
  imgLeftE.addEventListener( "mouseover", selectImg);
  imgRightE.addEventListener("mouseover", selectImg);

  btnVote.addEventListener("click", recordVote);
  btnNew.addEventListener("click", newPair);
}

function getRandIntOnRange (a, b) {
  var r = Math.random();
  var t = a + Math.floor(r * (b-a+1));
  return t;
}

function showRandImg(imgE) {
  var maxIdx = fnPool.length - 1;
  if (maxIdx < 1) {
    resetPool();
    maxIdx = fnPool.length - 1;
  }

  var idx = getRandIntOnRange(0, maxIdx);
  imgE.src = imgDir + img_fn[idx];
   // Extend object to have an property that holds idx w.r.t. original fn array
  imgE.idxOrig = idxPool[idx];

  // Rmove chosen img filename. ( Note: this is faster than using splice(). )
  fnPool[idx] = fnPool[maxIdx];
  fnPool.pop();
  idxPool[idx]= idxPool[maxIdx];
  idxPool.pop();
}

function selectImg() {
  if (voteAllowed) {
    resetImgs();
    this.className = "imgPicked";
    idxSelect = this.idxOrig;
  }
}

function recordVote() {
  if (idxSelect > -1) {
    console.log("voted. idxSelect="+idxSelect);
    voteAllowed = false;
    btnVote.style.visibility = "hidden";
    showChart();
  }
}

function showChart() {
  console.log("showChart()");


  /*** !! Insert code HERE to draw your chart and make it visible !! ***/


  btnNew.style.display = "inline";
  btnNew.style.visibility = "visible";
}

function newPair() {
  console.log("newPair()");  
  btnNew.style.visibility = "hidden";
  btnVote.style.visibility = "visible";


  /*** !! Insert code HERE to reset and hide your chart !! ***/


  if (fnPool.length < 2) {
    console.log("Not enough images left. Resetting pool");  
    resetPool();
  }

  voteAllowed = true;
  showRandImg(imgLeftE);
  showRandImg(imgRightE);
}

global_init();

showRandImg(imgLeftE);
showRandImg(imgRightE);
