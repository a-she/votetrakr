function mylog(v) { divStatsE.innerHTML += (v + "<br>"); }

function resetImgs() {
  idxSelect = -99;
  imgLeftE.attr( 'class', 'imgNormal');
  imgRightE.attr('class', 'imgNormal');
  voteAllowed = true;
}

function resetPool() { // Once all images have been shown, start over
  resetImgs();
   // Slice() forces copy by value (doesn't just create a reference)
  fnPool  = img_fn.slice();
  idxPool = img_idx.slice();
  if (myChartObj) { delete myChartObj; }
}

function global_init() {
  // Don't use "var" in this function; we need to init global vars

  img_fn = ["blueMarinatedTurkey.jpg", "condimentSprays.jpg", "cornDogs.jpg", "cranberryCandles.jpg", "frozenShrimp.jpg", "frozenWhatAreThese.jpg", "heatedSoda.jpg", "jelloMayoTurkey.jpg", "pastaOnionsCandy.jpg", "whipcreamSoup.jpg"];
  // Only 10 images here. Add at least 10 more images of your own!

  // To track which imgs' indices of the original array have already by shown
  img_idx = [];
  for (var ii=0; ii < img_fn.length; ii++) { img_idx[ii] = ii; }

  imgDir = "./img/";

  imgLeftE  = $('#imgLeft');
  imgRightE = $('#imgRight');
//imgLeftE  = document.getElementById("imgLeft");
//imgRightE = document.getElementById("imgRight");
  btnVoteE  = document.getElementById("btnVote");
  btnNewE   = document.getElementById("btnNew");
  divStatsE = document.getElementById("divStats");
  myChartE  = document.getElementById("myChart");

  ctx = myChartE.getContext("2d");
  myChartObj = 0;

  resetPool();

  imgLeftE.on( "click", function(ev) { selectImg(imgLeftE ); } );
  imgRightE.on("click", function(ev) { selectImg(imgRightE); } );
//imgRightE.addEventListener("click", selectImg);
/*imgLeftE.addEventListener( "mouseover", selectImg);
  imgRightE.addEventListener("mouseover", selectImg);*/

  btnVoteE.addEventListener("click", recordVote);
  btnNewE.addEventListener("click", newPair);
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
  imgE.attr('src', imgDir + fnPool[idx]);
   // Extend object to have an property that holds idx w.r.t. original fn array
  imgE.idxOrig = idxPool[idx];

  // Rmove chosen img filename. ( Note: this is faster than using splice(). )
  fnPool[idx] = fnPool[maxIdx];
  fnPool.pop();
  idxPool[idx]= idxPool[maxIdx];
  idxPool.pop();
}

function selectImg(el) {
  if (voteAllowed) {
    resetImgs();
    el.attr('class', 'imgPicked');
    idxSelect = el.idxOrig;
console.log("el = " + el);
console.log("el.idxOrig = " + el.idxOrig); // this.idxOrig);
    //console.log("ev.which = " + el.which);
  }
}

function recordVote() {
console.log("recordVote() called");
  if (idxSelect > -1) {
console.log("ok to select");
    console.log("voted. idxSelect="+idxSelect);
    voteAllowed = false;
    btnVoteE.style.visibility = "hidden";
    showChart();
  }
}

function showChart() {
  // The charting code here is just a placeholder, and is NOT the best way to
  // show votes or relative popularity. Improve the code below to generate more
  // easily understandable charts.
  var fnL = img_fn[imgLeftE.idxOrig];
  var fnR = img_fn[imgRightE.idxOrig];
  var labelL = fnL.split(".")[0];
  var labelR = fnR.split(".")[0];

  var data = {
    labels: [labelL, labelR],
    datasets: [
      { label: "Raw votes",
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: [5, 2] // Bogus data -- use your vote counts instead
      },
      { label: "Percentage split",
        fillColor: "rgba(151,187,205,0.5)",
        strokeColor: "rgba(151,187,205,0.8)",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        data: [5/(5+2), 2/(5+2)]
      }
    ]
  };

  // This call to create the chart does not include options as an arg. Modify
  // this to use options that make the labels, colors, etc.  match the look and
  // feel of the rest of your web page.
  //
  // Options (see www.chartjs.org/docs/) should look similar to this:
  //
  //  { //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
  //    scaleBeginAtZero : true,
  //
  //    //Boolean - Whether grid lines are shown across the chart
  //    scaleShowGridLines : true,
  //
  //    ... and so on...
  myChartObj = new Chart(ctx).Bar(data);


  /*** !! Insert code HERE to draw your chart and make it visible !! ***/


  btnNewE.style.display = "inline";
  btnNewE.style.visibility = "visible";
}

function newPair() {
  btnNewE.style.visibility = "hidden";
  btnVoteE.style.visibility = "visible";


  /*** !! Insert code HERE to hide your chart !! ***/


  // This seems to correctly free no-longer-used memory, but it
  // doesn't wipe or hide the graphic that is "cached" in your
  // <canvas>
  if (myChartObj) { myChartObj.destroy(); }

  if (fnPool.length < 2) {
    console.log("No images left in pool. Resetting pool");
    resetPool();
  }

  resetImgs();
  showRandImg(imgLeftE);
  showRandImg(imgRightE);
}

global_init();

showRandImg(imgLeftE);
showRandImg(imgRightE);
