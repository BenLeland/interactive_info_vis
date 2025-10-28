// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let rocks = [];
  let secondPrints = [];

  function seededRandom(seed) {
    // Mulberry32 PRNG
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }

  function getFootprints(count, size, color, seedOffset = 0) {
    let arr = [];
    for (let i = 0; i < count; i++) {
      // Use a deterministic seed for each footprint
      let sx = seededRandom(i + 1000 * seedOffset + 12345);
      let sy = seededRandom(i + 1000 * seedOffset + 54321);
      arr.push({
        x: sx * p.width,
        y: sy * p.height,
        size,
        color
      });
    }
    return arr;
  }

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // Generate static rocks
    rocks = [];
    for (let i = 0; i < 60; i++) {
      rocks.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(7, 18),
        gray: p.random(90, 140),
        rot: p.random(p.TWO_PI),
        noiseSeed: p.random(1000)
      });
    }
  };

  function drawFoot(x, y, size, color) {
    p.push();
    p.fill(color);
    p.translate(x, y);
    p.rotate(p.PI);
    // Ball of foot
    p.arc(0, 0, size * .4, size, 0, p.PI);
    // Heel
    p.rotate(0);
    p.translate(0, -(size * 0.3));
    p.rotate(p.PI);
    p.arc(0, -size * 0.22, size * .35, size * .4, 0 , p.PI);
    p.pop();
  }

  p.draw = function () {
    p.background('tan');

    // Draw rocks (static, small, irregular)
    for (let i = 0; i < rocks.length; i++) {
      let rock = rocks[i];
      p.push();
      p.translate(rock.x, rock.y);
      p.rotate(rock.rot);
      p.fill(rock.gray, rock.gray * 0.95, rock.gray * 0.9, 220);
      p.stroke(rock.gray * 0.7, 120);
      p.strokeWeight(1);
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += 0.3) {
        let rad = rock.size * (0.7 + p.noise(rock.noiseSeed + a * 2, rock.noiseSeed + a * 3) * 0.5);
        let x = rad * Math.cos(a);
        let y = rad * Math.sin(a);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }

    let minuteCount = p.minute();
    let secondCount = p.second();

    minutePrints = getFootprints(minuteCount, 60, 'rgb(150, 100, 62)', 2);
    secondPrints = getFootprints(secondCount, 32, 'rgba(204, 136, 84, 1)', 3);

    for (let i = 0; i < minutePrints.length; i++) {
      let f = minutePrints[i];
      drawFoot(f.x, f.y, f.size, f.color);
    }

    for (let i = 0; i < secondPrints.length; i++) {
      let f = secondPrints[i];
      drawFoot(f.x, f.y, f.size, f.color);
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});