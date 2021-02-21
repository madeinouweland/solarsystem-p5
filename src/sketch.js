let angle = 0;
let scaledAu = 150000;
const au = 150000000;
const fitFaktor = 700;
const fitFaktorM = 30;
const zoomFaktor = 1000;
let offsetX = 0;

const kugeln = [
  new Kugel("Sun", 1390000 / au, "#F9F871", 0, 0, [
    new Kugel("Mercurius", 4880 / au, "#D5CABD", 0.3871, 88, []),
    new Kugel("Venus", 12103 / au, "#DDF1FA", 0.723, 225, []),
    new Kugel("Erde", 12756 / au, "#338BA7", 1, 365, [
      new Kugel("Moon", 3474 / au, "#B0A8B9", 0.00256, 27, []),
    ]),
    new Kugel("Mars", 6792 / au, "#EC094D", 1.524, 687, [
      new Kugel("Phobos", 3000 / au, "#CA5100", 0.0010, 20, []),
      new Kugel("Deimos", 3000 / au, "#954293", 0.0011, 18, []),
    ]),
    new Kugel("Jupiter", 142984 / au, "#448700", 5.204, 4000, [
      new Kugel("Ganymed", 3500 / au, "#EC094D", 0.023, 44, []),
      new Kugel("Kallisto", 3100 / au, "#740000", 0.020, 60, []),
      new Kugel("Io", 2800 / au, "#0EBEBD", 0.025, 65, []),
      new Kugel("Europa", 3900 / au, "#F3EED9", 0.021, 55, []),
    ]),
    new Kugel("Saturn", 120536 / au, "#009093", 9.582, 10767, [
      new Kugel("Titan", 3474 / au, "#EC094D", 0.02, 50, []),
    ]),
  ]),
];

function preload() {
}

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
}

function update() {
  handleInput();
  angle += deltaTime * .08;
}

function draw() {
  update();
  background("#4B4453");

  const wx = windowWidth / 2 + offsetX;
  const wy = windowHeight / 2;
  for(let sun of kugeln) {
    fill(sun.color);
    ellipse(wx, wy, sun.diameter * scaledAu / 10);
    for (let planet of sun.trabanten) {
      fill(planet.color);
      const px = wx + Math.sin(angle / planet.orbitSpeed) * planet.orbit * scaledAu / fitFaktor;
      const py = wy + Math.cos(angle / planet.orbitSpeed) * planet.orbit * scaledAu / fitFaktor;
      ellipse(px, py, planet.diameter * scaledAu);
      text(planet.name, px + 10, py - 10);
      for (let moon of planet.trabanten) {
        fill(moon.color);
        const mx = px + Math.sin(angle / moon.orbitSpeed) * moon.orbit * scaledAu / fitFaktorM;
        const my = py + Math.cos(angle / moon.orbitSpeed) * moon.orbit * scaledAu / fitFaktorM;
        ellipse(mx, my, moon.diameter * scaledAu);
        text(moon.name, mx + 10, my - 10);
      }
    }
  }
}

function handleInput(dt) {
  if (keyIsDown(UP_ARROW)) {
    scaledAu += zoomFaktor;
  }
  if (keyIsDown(LEFT_ARROW)) {
    offsetX -= 10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    offsetX += 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    scaledAu -= zoomFaktor;
    if (scaledAu < 0){
      scaledAu = 0
    }
  }
}
