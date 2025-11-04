// Example 2
registerSketch('sk5', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(255);

    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(32);
    p.fill(0);
    p.text('Homework 5 Sketch', p.width / 2, p.height / 2);
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
