// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background('skyblue');


    // Watch
    p.fill(30);
    p.stroke('rgb(90, 90, 90)');
    p.strokeWeight(5);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 400);
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
