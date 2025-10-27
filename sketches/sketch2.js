// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.drawRunner = function(x, y, size = 20, shirtColor = 'red') {
    p.push();
    p.translate(x, y);

    // Body (torso)
    p.stroke(40);
    p.strokeWeight(3);
    p.noFill();
    p.line(0, 0, 0, size * 0.4);

    // Shirt (drawn as a slightly smaller T-shirt shape)
    p.noStroke();
    p.fill(shirtColor);
    p.beginShape();
    // Neck
    p.vertex(-size * 0.09, 0);
    p.vertex(size * 0.09, 0);
    // Right shoulder
    p.vertex(size * 0.16, size * 0.07);
    // Right sleeve
    p.vertex(size * 0.26, size * 0.16);
    p.vertex(size * 0.19, size * 0.25);
    // Right armpit
    p.vertex(size * 0.11, size * 0.20);
    // Right waist
    p.vertex(size * 0.09, size * 0.38);
    // Left waist
    p.vertex(-size * 0.09, size * 0.38);
    // Left armpit
    p.vertex(-size * 0.11, size * 0.20);
    // Left sleeve
    p.vertex(-size * 0.19, size * 0.25);
    p.vertex(-size * 0.26, size * 0.16);
    // Left shoulder
    p.vertex(-size * 0.16, size * 0.07);
    p.endShape(p.CLOSE);

    // Head
    p.noStroke();
    p.fill(255, 220, 180);
    p.ellipse(0, -size * 0.18, size * 0.25, size * 0.25);

    // Arms (poke out of sleeves)
    p.stroke(40);
    p.strokeWeight(2);
    // Right arm
    p.line(size * 0.22, size * 0.21, size * 0.28, size * 0.26);
    // Left arm
    p.line(-size * 0.22, size * 0.21, -size * 0.28, size * 0.26);

    // Forearms (optional: add a bend for more realism)
    // p.line(size * 0.34, size * 0.32, size * 0.38, size * 0.45);
    // p.line(-size * 0.34, size * 0.32, -size * 0.38, size * 0.45);

    // Legs (simple running pose, animated)
    let t = p.frameCount * 0.15;
    let legSwing = Math.sin(t) * size * 0.18;
    p.line(0, size * 0.4, legSwing, size * 0.7);
    p.line(0, size * 0.4, -legSwing, size * 0.7);

    p.pop();
  }

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

    // runner on inner ring (seconds)
    let cx = p.windowWidth / 2;
    let cy = p.windowHeight / 2;
    let innerRadius = 480 / 2;
    let sec = p.second();
    // At 0 seconds, angle = -PI/2 (top); at 30 seconds, angle = PI/2 (bottom)
    let angle = -p.HALF_PI + p.TWO_PI * (sec / 60);

    let verticalShift = -15;

    // Offset the runner so the feet are on the ring and shift slightly up
    let runnerX = cx + Math.cos(angle) * (innerRadius) ;
    let runnerY = cy + Math.sin(angle) * (innerRadius) + verticalShift;

    // Draw the runner always facing the same direction (no rotation)
    p.drawRunner(runnerX, runnerY, 20, 'red');
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
