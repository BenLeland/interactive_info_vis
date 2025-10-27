// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(255);
    p.fill(180, 60, 60);
    p.textSize(32);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('HWK #4. B', p.width / 2, p.height / 2);
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
