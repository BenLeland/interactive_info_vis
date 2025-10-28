// Instance-mode sketch for tab 2
registerSketch('sk2', function (p) {
  let grass = [];
  
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    grassSquiggles = [];
    for (let i = 0; i < 120; i++) {
      let gx = p.random(p.width);
      let gy = p.random(160, p.height - 10);
      let len = p.random(40, 90);
      let amp = p.random(3, 8);
      let freq = p.random(0.12, 0.22);
      grass.push({ gx, gy, len, amp, freq });
    }
  };

  function drawMileMarker(x, y, mile) {
    p.push();

    // Sign legs
    p.stroke('white');
    p.strokeWeight(1);
    p.line(x + 5, y + 50, x + 5, y + 60);
    p.line(x + 20, y + 50, x + 20, y + 60);

    // Sign
    p.fill('darkgreen');
    p.stroke('white')
    p.strokeWeight(1);
    p.rect(x, y, 25, 50, 2);

    // Sign Text
    p.fill('white');
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(9);
    p.text('MILE', x + 12.5, y + 10);
    p.textSize(12);
    p.text(`${mile}`, x + 12.5, y + 30);

    p.pop();
  }

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

    // grass
    p.fill('green');
    p.strokeWeight(0);
    p.rect(0, 150, p.windowWidth, p.windowHeight - 150);

    for (let i = 0; i < grass.length; i++) {
      let s = grass[i];
      p.stroke(`darkgreen`);
      p.strokeWeight(3);
      p.noFill();
      p.beginShape();
      for (let t = 0; t < s.len; t += 4) {
        let x = s.gx + t;
        let y = s.gy + Math.sin(t * s.freq + s.gx * 0.02) * s.amp;
        p.vertex(x, y);
      }
      p.endShape();
    }

    // lake
    p.fill('blue');
    p.stroke('tan');
    p.strokeWeight(30);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 500);

    // track lines
    p.noFill();
    p.stroke('rgb(179, 152, 118)');
    p.strokeWeight(2);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 480);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 500);
    p.circle(p.windowWidth / 2, p.windowHeight / 2, 520);

    // runner on middle ring (seconds)
    let cx = p.windowWidth / 2;
    let cy = p.windowHeight / 2;
    let verticalShift = -15;

    let outerRadius = 520 / 2;
    let hr = p.hour();
    let hrAngle = -p.HALF_PI + p.TWO_PI * ((hr % 12) / 12);
    let runnerX = cx + Math.cos(hrAngle) * (outerRadius) ;
    let runnerY = cy + Math.sin(hrAngle) * (outerRadius) + verticalShift;
    p.drawRunner(runnerX, runnerY, 20, 'yellow');

    let middleRadius = 500 / 2; // Middle ring is the one with diameter 500
    let min = p.minute();
    // At 0 seconds, angle = -PI/2 (top); at 30 seconds, angle = PI/2 (bottom)
    let minAngle = -p.HALF_PI + p.TWO_PI * (min / 60);

    // Offset the runner so the feet are on the ring and shift slightly up
    runnerX = cx + Math.cos(minAngle) * (middleRadius) ;
    runnerY = cy + Math.sin(minAngle) * (middleRadius) + verticalShift;

    // Draw the runner always facing the same direction (no rotation)
    p.drawRunner(runnerX, runnerY, 20, 'orange');

    // runner on inner ring (seconds)
    let innerRadius = 480 / 2;
    let sec = p.second();
    // At 0 seconds, angle = -PI/2 (top); at 30 seconds, angle = PI/2 (bottom)
    let secAngle = -p.HALF_PI + p.TWO_PI * (sec / 60);

    // Offset the runner so the feet are on the ring and shift slightly up
    runnerX = cx + Math.cos(secAngle) * (innerRadius) ;
    runnerY = cy + Math.sin(secAngle) * (innerRadius) + verticalShift;

    // Draw the runner always facing the same direction (no rotation)
    p.drawRunner(runnerX, runnerY, 20, 'red');

    // Mile Markers
    drawMileMarker(p.windowWidth / 2 - 12.5, p.windowHeight / 2 - 330, '12');
    drawMileMarker(p.windowWidth / 2 + 280, p.windowHeight / 2 - 25, '3');
    drawMileMarker(p.windowWidth / 2 - 12.5, p.windowHeight / 2 + 280, '6');
    drawMileMarker(p.windowWidth / 2 - 305, p.windowHeight / 2 - 25, '9');
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
