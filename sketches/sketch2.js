// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    // sky
    p.background('rgba(147, 235, 255, 1)');

    // sun
    p.fill('yellow');
    p.stroke('orange');
    p.strokeWeight(5);
    p.circle(p.windowWidth - 75, 75, 100);

    // ground
    p.fill('green');
    p.strokeWeight(0);
    p.rect(0, 150, p.windowWidth, p.windowHeight - 150);

    // lake
    p.fill('blue');
    p.stroke('tan');
    p.strokeWeight(30);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 500);

    // track lines
    p.noFill();
    p.stroke('black');
    p.strokeWeight(2);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 480);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 500);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 520);
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
