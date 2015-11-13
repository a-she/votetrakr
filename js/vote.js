var jsonStuff = {
  "coord": {"lon":-122.68, "lat":45.52},
  "weather":[ {"id":500,
               "main":"Rain",
               "description":"light rain",
               "icon":"10n"}
            ],
  "base":"cmc stations",
  "main":{"temp":279.638,
          "pressure":1001.55,
	  "humidity":97,
	  "temp_min":279.638,
	  "temp_max":279.638,
	  "sea_level":1036.48,
	  "grnd_level":1001.55},
  "wind":{"speed":3.76,
	  "deg":204},
  "rain":{"3h":0.52},
  "clouds":{"all":92},
  "dt":1447216221,
  "sys":{"message":0.0037,
	 "country":"US",
	 "sunrise":1447254260,
	 "sunset":1447289076},
  "id":5746545,
  "name":"Portland",
  "cod":200
  };

console.log(jsonStuff.name);

function mylog(v) { divStatsE.html(divStatsE.html() + v + "<br>"); }

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

  if (myChartObj) { myChartObj.destroy(); }
}

function global_init() {
  // Don't use "var" in this function; we need to init global vars

  img_fn = [
    "blueMarinatedTurkey.jpg",
    "condimentSprays.jpg",
    "cornDogs.jpg",
    "cranberryCandles.jpg",
    "frozenShrimp.jpg",
    "frozenWhatAreThese.jpg",
    "heatedSoda.jpg",
    "jelloMayoTurkey.jpg",
    "pastaOnionsCandy.jpg",
    "whipcreamSoup.jpg",
    "good_cauliDog.jpg",
    "good_happyPyramid.jpg",
    "good_rawPyramid.jpg",
    "good_rawVeganPyramid.jpg",
    "good_vegPlate.jpg",
    "good_veganProteinPowde.jpg"
  ];
  // TODO: Add 4 more images

  // Tracks indices (of original array) of images that have been shown
  img_idx = [];
  for (var ii=0; ii < img_fn.length; ii++) { img_idx[ii] = ii; }

  imgDir = "./img/";

  imgLeftE  = $('#imgLeft');
  imgRightE = $('#imgRight');
  btnVoteE  = $('#btnVote');
  btnNewE   = $('#btnNew');
  divStatsE = $('#divStats');
  myChartE  = $('#myChart');

  ctx = myChartE[0].getContext("2d");
  myChartObj = 0;

  resetPool();

  imgLeftE.on( "click", function() { selectImg(imgLeftE ); } );
  imgRightE.on("click", function() { selectImg(imgRightE); } );

  btnVoteE.on("click", function() { recordVote(); } );
  btnNewE.on("click",  function() { newPair(); }    );
}

function getRandIntOnRange (a, b) {
  var r = Math.random();
  var t = a + Math.floor(r * (b-a+1));
  return t;
}

function removeFilename(idx, maxIdx) {
  // Remove img filename. ( Note: The code below is faster than splice(). )
  fnPool[idx] = fnPool[maxIdx];
  fnPool.pop();
  // Update indices list
  idxPool[idx]= idxPool[maxIdx];
  idxPool.pop();
}

function showRandImg(imgE) {
  var maxIdx = fnPool.length - 1;
  if (maxIdx < 1) {
    console.log("No images left in pool. Resetting pool.");
    resetPool();
    maxIdx = fnPool.length - 1;
  }

  var idx = getRandIntOnRange(0, maxIdx);
  imgE.attr('src', imgDir + fnPool[idx]);
   // Extend object to have an property that holds idx w.r.t. original fn array
  imgE.idxOrig = idxPool[idx];
mylog("idx = " + idx);
  removeFilename(idx, maxIdx);
}

function selectImg(el) {
  if (voteAllowed) {
    resetImgs();
    el.attr('class', 'imgPicked');
    idxSelect = el.idxOrig;
  }
}

function recordVote() {
  if (idxSelect > -1) {
    voteAllowed = false;
    btnVoteE.css("visibility", "hidden");
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


  btnNewE.css("display",    "inline");
  btnNewE.css("visibility", "visible");
}

function newPair() {
  btnNewE.css( "visibility", "hidden");
  btnVoteE.css("visibility", "visible");
  resetImgs();


  /*** !! Insert code HERE to hide your chart !! ***/


  // This seems to correctly free no-longer-used memory, but it doesn't wipe or
  // hide the graphic that is "cached" in your <canvas>
  if (myChartObj) { myChartObj.destroy(); }

  // TODO: If total img count is odd, handle case where only one filename is "left in the hat"
//console.log("fnPool.length = " + fnPool.length);
  showRandImg(imgLeftE);
//removeFilename(imgLeftE.idxOrig, fnPool.length-1);
  showRandImg(imgRightE);
}

$(document).ready(function() {
  global_init();
  showRandImg(imgLeftE);
  showRandImg(imgRightE);
});