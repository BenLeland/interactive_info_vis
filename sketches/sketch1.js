// Instance-mode sketch for tab 1
registerSketch('sk1', function (p) {
//custom variables for y-coordinate of sun & horizon
let shapeHeight;

let width = 600;
let height= 600;
let horizon ;

p.setup = function() {
  p.createCanvas(p.windowWidth, p.windowHeight);
  horizon = height/2;
}

p.draw = function() {
  //shape follows y-coordinate of mouse
  shapeHeight = p.mouseY;
  currentWidth = p.mouseX;

  //light blue background if the shape is above horizon

  //with if-else statement
  if (shapeHeight < horizon) {
    p.background("lightblue"); // blue if above horizon
    
  } else {
    p.background("grey"); // grey if below horizon
  }

  //sun
  p.fill("white");
  
  p.rect(width/4, shapeHeight, width/2);
  p.textSize(20);
  p.fill("black");
  p.text('Hi! My name is Ben Leland', currentWidth/2, shapeHeight/2);
  


  // draw line for horizon
  p.stroke('lavender');
  p.line(0,horizon,width,horizon);

  //grass

  p.fill("lavender");

  p.rect(0, horizon, width, height);

}

p.windowResized = function() {
  p.resizeCanvas(windowWidth, windowHeight);
  horizon = height / 2; // recalc horizon after resize
}

});