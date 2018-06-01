const THEBODY = document.body;
const MAP_ICON = document.getElementsByClassName("dot");
const ARROW = document.getElementsByClassName("arrow");
const LEFT_WINDOW = document.getElementById("left-window");
const CENTER_WINDOW = document.getElementById("center-window");
const RIGHT_WINDOW = document.getElementById("right-window");
const TOP_WINDOW = document.getElementById("top-window");
const BOTTOM_WINDOW = document.getElementById("bottom-window");
const WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
const WINDOWS_ACROSS = 3;
const WINDOWS_VERTICAL = 3;
const CENTER_SPOT = [Math.ceil(WINDOWS_ACROSS/2), Math.ceil(WINDOWS_VERTICAL/2)];
      //CENTER_SPOT[xAxis, yAxis]
//this tracks updated state - where it is going
var newSpotX = CENTER_SPOT[0];
var newSpotY = CENTER_SPOT[1];
var desiredMapDot = document.getElementsByClassName(returnDesiredWindow())[0];

//setWindowScroll() needs a current state and compare against the updated state
var currentSpotX = newSpotX;
var currentSpotY = newSpotY;
var currentMapDot = document.getElementsByClassName(returnCurrentWindow())[0];

var x = document.getElementById("demo");

//console.log("CENTER-X: ", newSpotX);
//console.log("Center-Y: ", newSpotY);

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

//smooth scroll functions
function scrollUp(yin){

  let desiredPixelLocationY = (WINDOW_HEIGHT * yin) - WINDOW_HEIGHT;
  let currentPixelLocationY = (WINDOW_HEIGHT * currentSpotY) - WINDOW_HEIGHT;
  let currentPixelLocationX = (WINDOW_WIDTH * currentSpotX) - WINDOW_WIDTH;


  //check if there is a difference in the two positions
  if(currentPixelLocationY != desiredPixelLocationY){
    //start interval

    var myInterval = setInterval(function(){scrollUpDoMath();}, 10);
  } else {
    console.log("ERROR: scrollUp() -- no difference");
  }

  function scrollUpDoMath(){
      const SCROLL_SPEED = 55;

      //must subtract pixel location until current = desired
      if(desiredPixelLocationY <= currentPixelLocationY){
          window.scrollTo(currentPixelLocationX, currentPixelLocationY);
          currentPixelLocationY -= SCROLL_SPEED;
      } else {
        //final scrollTo (intervals of 25 don't guraentee a complete scroll
        //clear interval and update current location
        window.scrollTo(currentPixelLocationX, desiredPixelLocationY);
        clearInterval(myInterval);
        currentSpotY = newSpotY;
      }
  }
}

function scrollDown(yin){

  let desiredPixelLocationY = (WINDOW_HEIGHT * yin) - WINDOW_HEIGHT;
  let currentPixelLocationY = (WINDOW_HEIGHT * currentSpotY) - WINDOW_HEIGHT;
  let currentPixelLocationX = (WINDOW_WIDTH * currentSpotX) - WINDOW_WIDTH;


  //check if there is a difference in the two positions
  if(currentPixelLocationY != desiredPixelLocationY){
    //start interval
    var myInterval = setInterval(function(){scrollDownDoMath();}, 10);
  } else {
    console.log("ERROR: scrollDown() -- no difference");
  }

  function scrollDownDoMath(){
      const SCROLL_SPEED = 55;

      //must subtract pixel location until current = desired
      if(currentPixelLocationY <= desiredPixelLocationY){
          window.scrollTo(currentPixelLocationX, currentPixelLocationY);
          currentPixelLocationY += SCROLL_SPEED;
      } else {
        //final scrollTo (intervals of 25 don't guraentee a complete scroll
        //clear interval and update current location
        window.scrollTo(currentPixelLocationX, desiredPixelLocationY);
        clearInterval(myInterval);
        currentSpotY = newSpotY;
      }
  }
}

function scrollLeft(xin){

  let desiredPixelLocationX = (WINDOW_WIDTH * xin) - WINDOW_WIDTH;
  let currentPixelLocationY = (WINDOW_HEIGHT * currentSpotY) - WINDOW_HEIGHT;
  let currentPixelLocationX = (WINDOW_WIDTH * currentSpotX) - WINDOW_WIDTH;

  //console.log("Cur:Des >> " + currentPixelLocationX + ":" + desiredPixelLocationX);

  //check if there is a difference in the two positions
  if(currentPixelLocationX != desiredPixelLocationX){
    //start interval
    var myInterval = setInterval(function(){scrollLeftDoMath();}, 10);
  } else {
    console.log("ERROR: scrollLeft() -- no difference");
  }

  function scrollLeftDoMath(){
      const SCROLL_SPEED = 55;

      //must subtract pixel location until current = desired
      if(desiredPixelLocationX <= currentPixelLocationX){
          window.scrollTo(currentPixelLocationX, currentPixelLocationY);
          currentPixelLocationX -= SCROLL_SPEED;
      } else {
        //final scrollTo (intervals of 25 don't guraentee a complete scroll
        //clear interval and update current location
        window.scrollTo(desiredPixelLocationX, currentPixelLocationY);
        clearInterval(myInterval);
        currentSpotX = newSpotX;
      }
  }
}

function scrollRight(xin){

  let desiredPixelLocationX = (WINDOW_WIDTH * xin) - WINDOW_WIDTH;
  let currentPixelLocationY = (WINDOW_HEIGHT * currentSpotY) - WINDOW_HEIGHT;
  let currentPixelLocationX = (WINDOW_WIDTH * currentSpotX) - WINDOW_WIDTH;

  //console.log("Cur:Des >> " + currentPixelLocationX + ":" + desiredPixelLocationX);


  //check if there is a difference in the two positions
  if(currentPixelLocationX != desiredPixelLocationX){
    //start interval
    var myInterval = setInterval(function(){scrollRightDoMath();}, 10);
  } else {
    console.log("ERROR: scrollRight() -- no difference");
  }

  function scrollRightDoMath(){
      const SCROLL_SPEED = 55;


      //must ADD pixel location until current = desired
      if(currentPixelLocationX <= desiredPixelLocationX){
          window.scrollTo(currentPixelLocationX, currentPixelLocationY);
          currentPixelLocationX += SCROLL_SPEED;
      } else {
        //final scrollTo (intervals of 25 don't guraentee a complete scroll
        //clear interval and update current location
        window.scrollTo(desiredPixelLocationX, currentPixelLocationY);
        clearInterval(myInterval);
        currentSpotX = newSpotX;
      }
  }
}

//mouse click on DOM triggers scroll functions
function clickTriggerScrollArrows(value){

  if(value == "up"){
    console.log("UP Arrow Clicked");
    //Up window on MAP clicked
    if(newSpotY > 1 && newSpotX == CENTER_SPOT[0]){
      --newSpotY;
      updateArrowColor()
      updateDesiredMapDot();
      setMapColor("des");
      scrollUp(newSpotY);

    }
  } else

  if(value == "down"){
    console.log("Down Arrow Clicked");
    if(newSpotY < WINDOWS_VERTICAL && newSpotX == CENTER_SPOT[0]){
      ++newSpotY;
      updateArrowColor()
      updateDesiredMapDot();
      setMapColor("des");
      scrollDown(newSpotY);
    }
  } else

  if(value == "left"){
    console.log("Left Arrow Clicked");
    if(newSpotX > 1 && newSpotY == CENTER_SPOT[1]){
      --newSpotX;
      updateArrowColor()
      updateDesiredMapDot();
      setMapColor("des");
      scrollLeft(newSpotX);
    }
  } else

  if(value == "right"){
    console.log("Right Arrow Pressed");
    if(newSpotX < WINDOWS_ACROSS && newSpotY == CENTER_SPOT[1]){
      ++newSpotX;
      updateArrowColor()
      updateDesiredMapDot();
      setMapColor("des");
      scrollRight(newSpotX);
    }
  }


}

//set white dot for current window on dot map
function setMapColor(xin){
  //console.log("function called map color");
  //Reset colors
  MAP_ICON[0].style.backgroundColor = "#848484";
  MAP_ICON[1].style.backgroundColor = "#848484";
  MAP_ICON[2].style.backgroundColor = "#848484";
  MAP_ICON[3].style.backgroundColor = "#848484";
  MAP_ICON[4].style.backgroundColor = "#848484";

  //set current color
  //current.style.backgroundColor = "white";
  if(xin == "des"){
    desiredMapDot.style.backgroundColor = "white";
  } else
  if(xin == "cur") {
    currentMapDot.style.backgroundColor = "white";
  } else {
    console.log("ERROR: setMapColor() needs correct parameter");
  }

}

//arrow keys trigger scroll functions
function keyboardTriggerScroll(e){

    if(e.keyCode == '38'){
      //Up Key Press
      if(newSpotY > 1 && newSpotX == CENTER_SPOT[0]){
        console.log("Up Pressed");
        --newSpotY;
        updateDesiredMapDot();
        setMapColor("des");
        toggleHoverState("up");
        scrollUp(newSpotY);
        updateArrowColor();
        //setWindowScroll(newSpotX, newSpotY);

        //console.log("UP - X: " + newSpotX + " Y: " + newSpotY);
      }
    }
    else if(e.keyCode == '40'){
      //Down Key Press
      if(newSpotY < WINDOWS_VERTICAL && newSpotX == CENTER_SPOT[0]){
        console.log("Down Pressed");
        ++newSpotY;
        updateDesiredMapDot();
        setMapColor("des");
        toggleHoverState("down");
        updateArrowColor();
        scrollDown(newSpotY);
      }
    }
    else if(e.keyCode == '37'){
      //Left Key Press
      if(newSpotX > 1 && newSpotY == CENTER_SPOT[1]){
        console.log("Left Pressed");
        --newSpotX;
        updateDesiredMapDot();
        setMapColor("des");
        toggleHoverState("left");
        updateArrowColor();
        scrollLeft(newSpotX);
      }
      //console.log("Left: ", newSpot);
    }
    else if(e.keyCode == '39'){
      //Right Key Press
      if(newSpotX < WINDOWS_ACROSS && newSpotY == CENTER_SPOT[1]){
        console.log("Right Pressed");
        ++newSpotX;
        updateDesiredMapDot();
        setMapColor("des");
        toggleHoverState("right");
        updateArrowColor();
        scrollRight(newSpotX);
      }
      //console.log("Right: ", newSpot);
    }

    if(e.keyCode == '66'){
      console.log("Hello Ben");
    }
}

//returnes the dot on the map for current window
function returnCurrentWindow(){

  //Top Dot
  if(currentSpotX == 2 && currentSpotY == 1){
    return "dot-1";
  } else
  //Left Dot
  if(currentSpotX == 1 && currentSpotY == 2){
    return "dot-3";
  } else
  //Center Dot
  if(currentSpotX == 2 && currentSpotY == 2){
    return "dot-2";
  } else
  //Right Dot
  if(currentSpotX == 3 && currentSpotY == 2){
    return "dot-5";
  } else
  //Bottom Dot
  if(currentSpotX == 2 && currentSpotY == 3){
    return "dot-4";
  }

}

//returnes the dot on the map for desired window
function returnDesiredWindow(){

  //Top Dot
  if(newSpotX == 2 && newSpotY == 1){
    return "dot-1";
  } else
  //Left Dot
  if(newSpotX == 1 && newSpotY == 2){
    return "dot-3";
  } else
  //Center Dot
  if(newSpotX == 2 && newSpotY == 2){
    return "dot-2";
  } else
  //Right Dot
  if(newSpotX == 3 && newSpotY == 2){
    return "dot-5";
  } else
  //Bottom Dot
  if(newSpotX == 2 && newSpotY == 3){
    return "dot-4";
  }

}

function updateCurrentMapDot(){
  currentMapDot = document.getElementsByClassName(returnCurrentWindow())[0];
}

function updateDesiredMapDot(){
  desiredMapDot = document.getElementsByClassName(returnDesiredWindow())[0];
}

//updates the color arrows based on which window you are in
function updateArrowColor(){
  //let currentWindow = document.getElementsByClassName(returnCurrentWindow())[0];
  let currentId = returnDesiredWindow();
  console.log("updateArrowColor Called ", currentId);

  //top window
  if(currentId == "dot-1"){
    console.log("Top Dot: ", currentId);
    //left
    document.getElementsByClassName("arrow")[0].style.color = "#e0d221";
    //right
    document.getElementsByClassName("arrow")[1].style.color = "#e0d221";
    //top
    document.getElementsByClassName("arrow")[2].style.color = "#e0d221";
    //bottom
    document.getElementsByClassName("arrow")[3].style.color = "#4c3375";
  } else
  //center window
  if(currentId == "dot-2"){
    console.log("if confirmed");
    //left
    document.getElementsByClassName("arrow")[0].style.color = "#a39a16";
    //right
    document.getElementsByClassName("arrow")[1].style.color = "#a39a16";
    //top
    document.getElementsByClassName("arrow")[2].style.color = "#a39a16";
    //bottom
    document.getElementsByClassName("arrow")[3].style.color = "#a39a16";
  } else
  //Left window
  if(currentId == "dot-3"){
    console.log("if confirmed");
    //left
    document.getElementsByClassName("arrow")[0].style.color = "#d1fdc7";
    //right
    document.getElementsByClassName("arrow")[1].style.color = "#026609";
    //top
    document.getElementsByClassName("arrow")[2].style.color = "#d1fdc7";
    //bottom
    document.getElementsByClassName("arrow")[3].style.color = "#d1fdc7";
  } else
  //Bottom Window
  if(currentId == "dot-4"){
    console.log("if confirmed");
    //left
    document.getElementsByClassName("arrow")[0].style.color = "#2c2d9b";
    //right
    document.getElementsByClassName("arrow")[1].style.color = "#2c2d9b";
    //top
    document.getElementsByClassName("arrow")[2].style.color = "#e4ee24";
    //bottom
    document.getElementsByClassName("arrow")[3].style.color = "#2c2d9b";
  } else
  //Right Window
  if(currentId == "dot-5"){
    console.log("if confirmed");
    //left
    document.getElementsByClassName("arrow")[0].style.color = "#6ff4e9";
    //right
    document.getElementsByClassName("arrow")[1].style.color = "#b92f2e";
    //top
    document.getElementsByClassName("arrow")[2].style.color = "#b92f2e";
    //bottom
    document.getElementsByClassName("arrow")[3].style.color = "#b92f2e";
  }

}

//used with Map Dot to navigate. Click a dot to teleport - no smooth scroll functionality
function jumpToWindow(xin, yin){
  //calculate pixel location
  let desiredPixelLocationX = (WINDOW_WIDTH * xin) - WINDOW_WIDTH;
  let desiredPixelLocationY = (WINDOW_HEIGHT * yin) - WINDOW_HEIGHT;

  //update current location
  newSpotX = xin;
  newSpotY = yin;
  currentSpotX = xin;
  currentSpotY = yin;

  //update map location
  updateCurrentMapDot();
  updateArrowColor();
  updateDesiredMapDot();
  setMapColor("cur");

  //jump to new location
  window.scrollTo(desiredPixelLocationX, desiredPixelLocationY);
}

//this triggers the CSS transition animation when arrow key pressed
//simiulates hover state, makes arrow jump
function toggleHoverState(xin){
  if(xin == "left"){
    console.log("left called");
    let currentClasses = ARROW[0].className;
    ARROW[0].className = currentClasses + " arrow-left-JS-hover";
    setTimeout(function(){toggleHoverState("r-left");}, 200);
  } else
  if(xin == "right"){
    console.log("right called");
    let currentClasses = ARROW[1].className;
    ARROW[1].className = currentClasses + " arrow-right-JS-hover";
    setTimeout(function(){toggleHoverState("r-right");}, 200);
  } else
  if(xin == "up"){
    console.log("up called");
    let currentClasses = ARROW[2].className;
    ARROW[2].className = currentClasses + " arrow-up-JS-hover";
    setTimeout(function(){toggleHoverState("r-up");}, 200);
  } else
  if(xin == "down"){
    console.log("down called");
    let currentClasses = ARROW[3].className;
    ARROW[3].className = currentClasses + " arrow-down-JS-hover";
    setTimeout(function(){toggleHoverState("r-down");}, 200);
  } else

  if(xin == "r-left"){
    console.log("recursion called");
    let currentClasses = ARROW[0].className;
    currentClasses = currentClasses.replace(" arrow-left-JS-hover", " ")
    ARROW[0].className = currentClasses;
  } else
  if(xin == "r-right"){
    console.log("recursion called");
    let currentClasses = ARROW[1].className;
    currentClasses = currentClasses.replace(" arrow-right-JS-hover", " ")
    ARROW[1].className = currentClasses;
  } else
  if(xin == "r-up"){
    console.log("recursion called");
    let currentClasses = ARROW[2].className;
    currentClasses = currentClasses.replace(" arrow-up-JS-hover", " ")
    ARROW[2].className = currentClasses;
  } else
  if(xin == "r-down"){
    console.log("recursion called");
    let currentClasses = ARROW[3].className;
    currentClasses = currentClasses.replace(" arrow-down-JS-hover", " ")
    ARROW[3].className = currentClasses;
  }

}

//set body window size
THEBODY.style.width = ((WINDOW_WIDTH) * WINDOWS_ACROSS) + "px";
THEBODY.style.height = ((WINDOW_HEIGHT) * WINDOWS_VERTICAL) + "px";
window.scrollTo(WINDOW_WIDTH, WINDOW_HEIGHT); //this only works when there is a 3x3 grid

//function calls -- eventually change this to a loop and array
setWindowSize(LEFT_WINDOW);
setWindowSize(CENTER_WINDOW);
setWindowSize(RIGHT_WINDOW);
setWindowSize(TOP_WINDOW);
setWindowSize(BOTTOM_WINDOW);

updateArrowColor();

setWindowPosition('center-window', 0, 0);
setWindowPosition('right-window', 1, 0);
setWindowPosition('left-window', -1, 0);
setWindowPosition('top-window', 0, -1);
setWindowPosition('bottom-window', 0, 1);

//eventListeners
document.onkeydown = keyboardTriggerScroll;
MAP_ICON[0].addEventListener('click', function(){jumpToWindow(2, 1)}, false); //top
MAP_ICON[1].addEventListener('click', function(){jumpToWindow(2, 2)}, false); //center
MAP_ICON[2].addEventListener('click', function(){jumpToWindow(1, 2)}, false); //left
MAP_ICON[3].addEventListener('click', function(){jumpToWindow(2, 3)}, false); //bottom
MAP_ICON[4].addEventListener('click', function(){jumpToWindow(3, 2)}, false); //right

ARROW[0].addEventListener('click', function(){clickTriggerScrollArrows("left")}, false);
ARROW[1].addEventListener('click', function(){clickTriggerScrollArrows("right")}, false);
ARROW[2].addEventListener('click', function(){clickTriggerScrollArrows("up")}, false);
ARROW[3].addEventListener('click', function(){clickTriggerScrollArrows("down")}, false);
//console.log("MAP", MAP_ICON[0]);

//CURRENT_MAP_WINDOW.style.backgroundColor = "hotpink";
//console.log("map stuff: ", CURRENT_MAP_WINDOW[0]);

//output window dimensions for reference and testing only
x.innerHTML = "Browser inner window width: " + WINDOW_WIDTH + ", height: " + WINDOW_HEIGHT + ".";
//console.log("Total Width: ", THEBODY.style.width);
