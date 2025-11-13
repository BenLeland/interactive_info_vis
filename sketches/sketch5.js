// Example 2
let data;
let sortedData = new Map();
let chosenTeam = 'Seattle Mariners';
let chosenYear = 2001;
let singlePositions = new Map();
let doublePositions = new Map();
let triplePositions = new Map();
let homeRunPositions = new Map();
let yearSlider;
let teamDropdown;

registerSketch('sk5', function (p) {
  p.preload = function() {
    data = p.loadTable('/mlb_data.csv', 'csv', 'header', handleTableLoad);
  };
  
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    console.log(data.getColumnCount());
    sortData();

    const teams = Array.from(sortedData.keys()).sort();
    teamDropdown = p.createSelect();
    teamDropdown.position(p.windowWidth / 2 - 80, p.windowHeight / 2 + 375); // left of field
    teamDropdown.style('font-size', '16px');
    teamDropdown.style('padding', '5px 10px');
    teamDropdown.option('Select a Team');
    teams.forEach(team => teamDropdown.option(team));
    teamDropdown.selected(chosenTeam);

    teamDropdown.changed(() => {
      chosenTeam = teamDropdown.value();
      availableYears = getAvailableYearsForTeam(chosenTeam);

      // Update slider range & position
      yearSlider.remove();
      yearSlider = p.createSlider(0, availableYears.length - 1, 0);
      yearSlider.style('transform-origin', 'center');
      yearSlider.style('width', '600px');
      yearSlider.position(p.windowWidth / 2 - 300, p.windowHeight / 2 + 480);
      yearSlider.input(() => {
        chosenYear = availableYears[yearSlider.value()];
      });

      // Reset to earliest available year for new team
      chosenYear = availableYears[0];
    });

    availableYears = getAvailableYearsForTeam(chosenTeam);
    yearSlider = p.createSlider(0, availableYears.length - 1, availableYears.indexOf(chosenYear));
    yearSlider.style('transform-origin', 'center');
    yearSlider.style('width', '600px');
    yearSlider.position(p.windowWidth / 2 - 300, p.windowHeight / 2 + 480);
    yearSlider.input(() => {
      chosenYear = availableYears[yearSlider.value()];
    });
  };
  
  p.draw = function () {
    p.background(255);
    
    p.textAlign(p.CENTER);
    p.textSize(50);
    p.text('The Evolution of Power Hitting in the MLB', p.windowWidth / 2, 100);

    setupBaseballDiamond();

    p.text(`Team:`, p.windowWidth / 2 - 155, p.windowHeight / 2 + 350);
    p.text(`Year: ${chosenYear}`, p.windowWidth / 2, p.windowHeight / 2 + 410);
    populateSingles(chosenTeam, chosenYear);
    populateDoubles(chosenTeam, chosenYear);
    populateTriples(chosenTeam, chosenYear);
    populateHomeRuns(chosenTeam, chosenYear);
  }
  
  // Preload
  handleTableLoad = function(table) {
    console.log('Table loaded with ' + table.getRowCount() + ' rows and ' + table.getColumnCount() + ' columns.');
  }

  // Setup
  getAvailableYearsForTeam = function(team) {
    if (!sortedData.has(team)) return [];
    return Array.from(sortedData.get(team).keys()).sort((a, b) => a - b);
  }

  sortData = function() {  
    let teamArr = data.getColumn('team_name');
    let yearArr = data.getColumn('year').map(Number);
    let hitsArr = data.getColumn('hits').map(Number);
    let doublesArr = data.getColumn('doubles').map(Number);
    let triplesArr = data.getColumn('triples').map(Number);
    let homeRunsArr = data.getColumn('homeruns').map(Number);
    
    for (let i = 0; i < data.getRowCount(); i++) {
      let singles = hitsArr[i] - doublesArr[i] - triplesArr[i] - homeRunsArr[i];
      let teamStats = [singles, doublesArr[i], triplesArr[i], homeRunsArr[i]];
      let team = teamArr[i];
      let year = yearArr[i];
      
      if (sortedData.has(team)) {
        sortedData.get(team).set(year, teamStats);
      } else {
        sortedData.set(team, new Map([[year, teamStats]]));
      }
    }
  }
  
  // Draw
  setupBaseballDiamond = function() {
    p.push();
  
    p.noStroke();
    p.fill(120); // bleacher base color
    p.arc(p.windowWidth / 2, p.windowHeight - 200, 1200, 1200, p.PI + .75, p.PI + 2.4);
    // add seat-row lines for visual texture
    p.stroke(90);
    p.strokeWeight(2);
    for (let i = 0; i < 8; i++) {
      const inset = 10 + i * 12;
      p.noFill();
      p.arc(p.windowWidth / 2, p.windowHeight - 200, 1200 - inset, 1200 - inset, p.PI + .75, p.PI + 2.4);
    }

    // Outer diamond
    p.fill('green');
    p.stroke('tan');
    p.strokeWeight(20);
    p.arc(p.windowWidth / 2, p.windowHeight - 200, 1000, 1000, p.PI + .75, p.PI + 2.4);
    p.line(p.windowWidth / 2, p.windowHeight - 200, p.windowWidth / 2 - 365, p.windowHeight - 540);
    p.line(p.windowWidth / 2, p.windowHeight - 200, p.windowWidth / 2 + 370, p.windowHeight - 535);
  
    // Infield
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
  
    // Add hit type labels
    p.noFill();
    p.stroke('darkgreen');
    p.strokeWeight(1);
    p.arc(p.windowWidth / 2, p.windowHeight - 215, 750, 770, p.PI + .75, p.PI + 2.4);

    p.pop();
  }

  populateSingles = function(team, year) {
    if (!sortedData || !sortedData.has(team)) return;
    const teamEntries = sortedData.get(team);
    const stats = teamEntries.get(year);
    console.log(year);
    const singles = stats[0];

    const key = `${team}_${year}`;
    let cache = singlePositions.get(key);

    if (!cache || cache.count !== singles) {
      const cx = p.windowWidth / 2;
      const cy = p.windowHeight - 250;
      const rx = 250;
      const ry = 250;
      const startA = p.PI + 0.75;
      const endA = p.PI + 2.4;

      const positions = [];
      for (let i = 0; i < singles; i++) {
        const a = p.random(startA, endA);
        const r = Math.sqrt(p.random());
        const x = cx + r * rx * Math.cos(a);
        const y = cy + r * ry * Math.sin(a);
        positions.push({ x, y });
      }
      cache = { count: singles, positions };
      singlePositions.set(key, cache);
    }

    p.push();
    p.noStroke();
    p.fill(200, 30, 30, 200); // reddish dots

    for (const pos of cache.positions) {
      p.circle(pos.x, pos.y, 3);
    }

    p.pop();
  }

  populateDoubles = function(team, year) {
    if (!sortedData || !sortedData.has(team)) return;
    const teamEntries = sortedData.get(team);
    const stats = teamEntries.get(year);
    const doubles = stats[1];

    const key = `${team}_${year}`;
    let cache = doublePositions.get(key);

    if (!cache || cache.count !== doubles) {
      const cx = p.windowWidth / 2;
      const cyIn = p.windowHeight - 250;
      const rxIn = 250;
      const ryIn = 250;

      const cyMid = p.windowHeight - 215;
      const rxMid = 375;
      const ryMid = 385;

      const startA = p.PI + 0.75;
      const endA = p.PI + 2.4;

      const positions = [];
      for (let i = 0; i < doubles; i++) {
        const a = p.random(startA, endA);

        const xi = cx + rxIn * Math.cos(a);
        const yi = cyIn + ryIn * Math.sin(a);
        const xo = cx + rxMid * Math.cos(a);
        const yo = cyMid + ryMid * Math.sin(a);

        const t = Math.sqrt(p.random());
        const x = xi + t * (xo - xi);
        const y = yi + t * (yo - yi);

        positions.push({ x, y });
      }

      cache = { count: doubles, positions };
      doublePositions.set(key, cache);
    }

    p.push();
    p.noStroke();
    p.fill(30, 130, 200, 200); // bluish dots for doubles

    for (const pos of cache.positions) {
      p.circle(pos.x, pos.y, 3);
    }

    p.pop();
  }

  populateTriples = function(team, year) {
    if (!sortedData || !sortedData.has(team)) return;
    const teamEntries = sortedData.get(team);
    const stats = teamEntries.get(year);
    const triples = stats[2];

    const key = `${team}_${year}`;
    let cache = triplePositions.get(key);

    if (!cache || cache.count !== triples) {
      const cx = p.windowWidth / 2;

      const cyMid = p.windowHeight - 215;
      const rxMid = 375;
      const ryMid = 385;

      const cyOut = p.windowHeight - 200;
      const rxOut = 500;
      const ryOut = 500;

      const startA = p.PI + 0.75;
      const endA = p.PI + 2.4;

      const positions = [];
      for (let i = 0; i < triples; i++) {
        const a = p.random(startA, endA);

        const xm = cx + rxMid * Math.cos(a);
        const ym = cyMid + ryMid * Math.sin(a);
        const xo = cx + rxOut * Math.cos(a);
        const yo = cyOut + ryOut * Math.sin(a);

        const t = Math.sqrt(p.random());
        const x = xm + t * (xo - xm);
        const y = ym + t * (yo - ym);

        positions.push({ x, y });
      }

      cache = { count: triples, positions };
      triplePositions.set(key, cache);
    }

    p.push();
    p.noStroke();
    p.fill(100, 220, 100, 200); // greenish dots for triples     
    
    for (const pos of cache.positions) {
      p.circle(pos.x, pos.y, 3);
    }

    p.pop();
  }

  populateHomeRuns = function(team, year) {
    if (!sortedData || !sortedData.has(team)) return;
    const teamEntries = sortedData.get(team);
    const stats = teamEntries.get(year);
    const homeRuns = stats[3];

    const key = `${team}_${year}`;
    let cache = homeRunPositions.get(key);

    if (!cache || cache.count !== homeRuns) {
      const cx = p.windowWidth / 2;

      // outer field arc (existing)
      const cyField = p.windowHeight - 200;
      const rxField = 500;
      const ryField = 500;

      // bleachers arc (new outer ring)
      const rxBleachers = 600; // 1200 / 2
      const ryBleachers = 600; // 1200 / 2

      const startA = p.PI + 0.75;
      const endA = p.PI + 2.4;

      const positions = [];
      for (let i = 0; i < homeRuns; i++) {
        const a = p.random(startA, endA);

        const xi = cx + rxField * Math.cos(a);
        const yi = cyField + ryField * Math.sin(a);
        const xo = cx + rxBleachers * Math.cos(a);
        const yo = cyField + ryBleachers * Math.sin(a);

        const t = Math.sqrt(p.random());
        const x = xi + t * (xo - xi);
        const y = yi + t * (yo - yi);

        positions.push({ x, y });
      }

      cache = { count: homeRuns, positions };
      homeRunPositions.set(key, cache);
    }

    p.push();
    p.noStroke();
    p.fill(220, 180, 30, 200); // goldish dots for home runs

    for (const pos of cache.positions) {
      p.circle(pos.x, pos.y, 3);
    }

    p.pop();
  }
  
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

    if (yearSlider) {
      yearSlider.position(p.windowWidth / 2 - 300, p.windowHeight / 2 + 480);
    }

    if (teamDropdown) {
      teamDropdown.position(p.windowWidth / 2 - 80, p.windowHeight / 2 + 375);
    }
  };
});