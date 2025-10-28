// Instance-mode sketch for tab 3
registerSketch('sk3', function (p) {
  let rocks = [];

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

  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});