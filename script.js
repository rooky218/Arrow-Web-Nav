const THEBODY = document.body;
const LEFT_WINDOW = document.getElementById("left-window");
const CENTER_WINDOW = document.getElementById("center-window");
const RIGHT_WINDOW = document.getElementById("right-window");
const TOP_WINDOW = document.getElementById("top-window");
const BOTTOM_WINDOW = document.getElementById("bottom-window");
// const SCROLL_BAR_WIDTH_CHROME = 0; //15px
const WINDOWS_ACROSS = 3;
const WINDOWS_VERTICAL = 3;
const CENTER_SPOT = [Math.ceil(WINDOWS_ACROSS/2), Math.ceil(WINDOWS_VERTICAL/2)];
      //CENTER_SPOT[xAxis, yAxis]
      //return the window location for center window.
      //If there are 3 windows, center spot is 2 (1 on each side)
      //If there are 5 windows, center spot is 3 (2 on each side)
      //Side spots and then added or subtracted from this number
var newSpotX = CENTER_SPOT[0];
var newSpotY = CENTER_SPOT[1];
console.log("CENTER-X: ", newSpotX);
console.log("Center-Y: ", newSpotY);



const WINDOW_WIDTH = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

const WINDOW_HEIGHT = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var x = document.getElementById("demo");

//function sets inner window size
function setWindowSize(windowIn){
  //windows are nested inside the body, thus we must make them smaller by removing border and padding
  // let bodyPadding2 = windowIn.style.padding;
  // console.log("Padding is: ", bodyPadding2);
  let bodyPadding = 25 * 2;
  let bodyborderWidth = 3 * 2;
  windowIn.style.width = (WINDOW_WIDTH) + "px";
  windowIn.style.height = (WINDOW_HEIGHT) + "px";
}

//function determines absolute location of divs in body
function setWindowPosition(windowIn, xAxis, yAxis){

  let scrollBarWidthChrome = 15;
  let bodyPadding = 25 * 2; //25px on both sides
  let bodyborderWidth = 3 * 2; //3px on both sides
  let halfBorderAndPadding = (bodyPadding/2) + (bodyborderWidth/2);
  let bodyWidth = THEBODY.style.width;
  let bodyHeight = THEBODY.style.height;

  //find string lengths
  let bodyWidthCharLength = bodyWidth.length;
  let bodyHeightCharLength = bodyHeight.length;

  //convert bodyWidth from string "123px" to string "123" for math
  bodyWidth = bodyWidth.substring(0, (bodyWidthCharLength - 2));
  bodyHeight = bodyHeight.substring(0, (bodyHeightCharLength - 2));

  //total body width is divided by window width. This is to find how many windows can fit in space
  let totalXAxisWindows = Math.ceil(bodyWidth/WINDOW_WIDTH);
  let totalYAxisWindows = Math.ceil(bodyHeight/WINDOW_HEIGHT);

  //set horizontal location
  if(xAxis == 0){
    let pixelsFromLeft = (WINDOW_WIDTH * CENTER_SPOT[0]) - WINDOW_WIDTH;
    document.getElementById(windowIn).style.left = pixelsFromLeft + "px";
    //console.log("Center Spot Called");


  } else if(xAxis > 0){
    let pixelsFromLeft = (WINDOW_WIDTH * (CENTER_SPOT[0] + xAxis)) - WINDOW_WIDTH;
    document.getElementById(windowIn).style.left = pixelsFromLeft + "px";
    //console.log("Right Spot Filled");


  } else {
    let pixelsFromLeft = (WINDOW_WIDTH * (CENTER_SPOT[0] + xAxis)) - WINDOW_WIDTH;
    document.getElementById(windowIn).style.left = pixelsFromLeft + "px";
    //console.log("Left Spot Filled", xAxis);

  }

  //set Vertical location
  if(yAxis == 0){
    let pixelsFromTop = (WINDOW_HEIGHT * CENTER_SPOT[1]) - WINDOW_HEIGHT;
    document.getElementById(windowIn).style.top = pixelsFromTop + "px";
    //console.log("Center Spot Called");


  } else if(yAxis > 0){
    let pixelsFromTop = (WINDOW_HEIGHT * (CENTER_SPOT[1] + yAxis)) - WINDOW_HEIGHT;
    document.getElementById(windowIn).style.top = pixelsFromTop + "px";
    //console.log("Right Spot Filled");


  } else {
    let pixelsFromTop = (WINDOW_HEIGHT * (CENTER_SPOT[1] + yAxis)) - WINDOW_HEIGHT;
    document.getElementById(windowIn).style.top = pixelsFromTop + "px";
    //console.log("Left Spot Filled", xAxis);
  }
}

//set the position of the scroll - center on window spots
function setWindowScroll(windowSpotX, windowSpotY){
    let pixelsFromLeft = (WINDOW_WIDTH * windowSpotX) - WINDOW_WIDTH;
    let pixelsFromTop = (WINDOW_HEIGHT * windowSpotY) - WINDOW_HEIGHT;

    // let pixelsFromLeft = (WINDOW_WIDTH * CENTER_SPOT[0]) - WINDOW_WIDTH;
    if(windowSpotX <= WINDOWS_ACROSS && windowSpotX > 0){
      window.scrollTo(pixelsFromLeft, pixelsFromTop);
      console.log("SUCCESS - X", pixelsFromLeft);
    } else {
      console.log("FAILED");
    }

    if(windowSpotY <= WINDOWS_VERTICAL && windowSpotY > 0){
      window.scrollTo(pixelsFromLeft, pixelsFromTop);
      console.log("SUCCESS - Y", pixelsFromTop);
    } else {
      console.log("FAILED");
    }
}

//set the position of the scroll - center on window spots
// function setWindowScrollY(windowSpot){
//     let pixelsFromTop = (WINDOW_HEIGHT * windowSpot) - WINDOW_HEIGHT;
//     console.log("Window Width: " + WINDOW_HEIGHT + " xin: " + windowSpot);
//
//
//     console.log("Scroll function called", pixelsFromTop);
//
//     // let pixelsFromLeft = (WINDOW_WIDTH * CENTER_SPOT[0]) - WINDOW_WIDTH;
//     if(windowSpot <= WINDOWS_VERTICAL && windowSpot > 0){
//       window.scrollTo(0, pixelsFromTop);
//       console.log("SUCCESS");
//     } else {
//       console.log("FAILED");
//     }
// }

//set the position of the scroll - center on window spots
function callWindowScroll(e){

    if(e.keyCode == '38'){
      //Up Key Press
      if(newSpotY > 1 && newSpotX == CENTER_SPOT[0]){
        console.log("UP - X: " + newSpotX + " Y: " + newSpotY);
        --newSpotY;
        setWindowScroll(newSpotX, newSpotY);
        console.log("UP - X: " + newSpotX + " Y: " + newSpotY);
      }
    }
    else if(e.keyCode == '40'){
      //Down Key Press
      if(newSpotY < WINDOWS_VERTICAL && newSpotX == CENTER_SPOT[0]){
        console.log("DOWN - X: " + newSpotX + " Y: " + newSpotY);
        ++newSpotY;
        setWindowScroll(newSpotX, newSpotY);
        console.log("DOWN - X: " + newSpotX + " Y: " + newSpotY);
      }
    }
    else if(e.keyCode == '37'){
      //Left Key Press
      if(newSpotX > 1 && newSpotY == CENTER_SPOT[1]){
        console.log("LEFT - X: " + newSpotX + " Y: " + newSpotY);
        --newSpotX;
        setWindowScroll(newSpotX, newSpotY);
        console.log("LEFT - X: " + newSpotX + " Y: " + newSpotY);
      }
      //console.log("Left: ", newSpot);
    }
    else if(e.keyCode == '39'){
      //Right Key Press
      if(newSpotX < WINDOWS_ACROSS && newSpotY == CENTER_SPOT[1]){
        console.log("Right - X: " + newSpotX + " Y: " + newSpotY);
        ++newSpotX;
        setWindowScroll(newSpotX, newSpotY);
        console.log("Right - X: " + newSpotX + " Y: " + newSpotY);
      }
      //console.log("Right: ", newSpot);
    }

    if(e.keyCode == '66'){
      console.log("Hello Ben");
    }
}

//set body window size
THEBODY.style.width = ((WINDOW_WIDTH) * WINDOWS_ACROSS) + "px";
THEBODY.style.height = ((WINDOW_HEIGHT) * WINDOWS_VERTICAL) + "px";
window.scrollTo(WINDOW_WIDTH, WINDOW_HEIGHT);

//function calls
setWindowSize(LEFT_WINDOW);
setWindowSize(CENTER_WINDOW);
setWindowSize(RIGHT_WINDOW);
setWindowSize(TOP_WINDOW);
setWindowSize(BOTTOM_WINDOW);

setWindowPosition('center-window', 0, 0);
setWindowPosition('right-window', 1, 0);
setWindowPosition('left-window', -1, 0);
setWindowPosition('top-window', 0, -1);
setWindowPosition('bottom-window', 0, 1);


//eventListeners
document.onkeydown = callWindowScroll;

//output window dimensions for reference and testing only
x.innerHTML = "Browser inner window width: " + WINDOW_WIDTH + ", height: " + WINDOW_HEIGHT + ".";
console.log("Total Width: ", THEBODY.style.width);
