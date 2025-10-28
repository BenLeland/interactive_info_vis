// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background('tan');

    // Watch band
    p.fill('rgb(90, 90, 90)');
    p.stroke(0);
    p.strokeWeight(1);
    p.rect((p.windowWidth / 2) - 100, 0, 200, p.windowHeight);

    // Watch band holes
    p.fill('tan');
    p.stroke(0);
    p.strokeWeight(1);
    for (let i = 0; i < 10; i++) {
      p.circle(p.windowWidth / 2, i * 100 + 50, 20);
    }

    // Watch
    p.fill(30);
    p.stroke('rgb(90, 90, 90)');
    p.strokeWeight(5);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 500);

    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(50);
    p.fill('red');
    p.text(`${p.hour()}   Miles`, p.windowWidth / 2, p.windowHeight / 2 - 100);
    p.fill('green');
    p.text(`${p.minute()}   Flights`, p.windowWidth / 2, p.windowHeight / 2);
    p.fill('blue');
    p.text(`${p.second()}   Steps`, p.windowWidth / 2, p.windowHeight / 2 + 100);
  };
  
  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
