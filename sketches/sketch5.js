// Example 2
let data;
let sortedData;

registerSketch('sk5', function (p) {
  p.preload = function() {
    data = p.loadTable('/mlb_data.csv', 'csv', 'header');
  };
  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
    sortedData = new Map();
    
    console.log(data.getColumnCount());
  };

  setupBaseballDiamond = function() {
    p.push();

    // Outer diamond
    p.fill('green');
    p.stroke('tan');
    p.strokeWeight(20);
    p.arc(p.windowWidth / 2, p.windowHeight - 200, 1000, 1000, p.PI + .75, p.PI + 2.4);
    p.line(p.windowWidth / 2, p.windowHeight - 200, p.windowWidth / 2 - 365, p.windowHeight - 540);
    p.line(p.windowWidth / 2, p.windowHeight - 200, p.windowWidth / 2 + 370, p.windowHeight - 535);

    // Inner diamond
    p.fill('tan');
    p.noStroke();
    p.arc(p.windowWidth / 2, p.windowHeight - 250, 500, 500, p.PI + .75, p.PI + 2.4);

    // Home plate
    p.circle(p.windowWidth / 2, p.windowHeight - 270, 40);
    p.fill(255);
    p.triangle(p.windowWidth / 2 - 10, p.windowHeight - 270, p.windowWidth / 2 + 10, p.windowHeight - 270, p.windowWidth / 2, p.windowHeight - 260);
    p.rect(p.windowWidth / 2 - 10, p.windowHeight - 275, 20, 5);

    // Pitcher's mound
    p.fill('green');
    p.circle(p.windowWidth / 2, p.windowHeight - 380, 60);
    p.fill(255);
    p.rect(p.windowWidth / 2 - 7.5, p.windowHeight - 380, 15, 5);

    // Second base
    p.rect(p.windowWidth / 2 - 5, p.windowHeight - 475, 10, 10);

    // First base
    p.rect(p.windowWidth / 2 + 115, p.windowHeight - 385, 10, 10);

    // Third base
    p.rect(p.windowWidth / 2 - 115, p.windowHeight - 385, 10, 10);

    p.pop();
  }

  // sortData = function() {  
  //   let teamArr = data.getColumn('team_name');
  //   let yearArr = data.getColumn('year');
  //   let doublesArr = data.getColumn('doubles');
  //   let triplesArr = data.getColumn('triples');
  //   let homeRunsArr = data.getColumn('homeruns');

  //   for (let i = 0; i < data.getRowCount(); i++) {
  //     let singles = data.getColumn('hits')[i] - doublesArr[i] - triplesArr[i] - homeRunsArr[i];
  //     let teamStats = [singles, doublesArr[i], triplesArr[i], homeRunsArr[i]];

  //     if (!sortedData.has(teamArr[i])) {
  //       sortedData.set(teamArr[i], sortedData.get(teamArr[i]).push(new Map([yearArr[i], teamStats])));
  //     } else {
  //       sortedData.set(teamArr[i], [new Map([yearArr[i], teamStats])]);
  //     }
  //   }
  // }

  p.draw = function () {
    p.background(255);

    setupBaseballDiamond();
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});