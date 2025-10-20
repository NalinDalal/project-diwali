let fireworks = [];
let particles = [];
let diyas = [];
let lanterns = [];
let sparkler = [];
let chakris = [];
let rangolis = [];
let messages = ["Happy Diwali!", "शुभ दीपावली", "Celebrate!", "Joy & Light"];
let currentMessage = 0;

class Rangoli {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(80, 120);
    this.rotation = 0;
    this.colors = [
      [255, 50, 100],
      [255, 200, 50],
      [50, 200, 255],
      [150, 50, 255],
      [50, 255, 150],
    ];
    this.pulseOffset = random(100);
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    let pulse = sin(frameCount * 0.05 + this.pulseOffset) * 0.2 + 1;

    // Draw multiple layers
    for (let layer = 0; layer < 3; layer++) {
      for (let i = 0; i < 8; i++) {
        let angle = (TWO_PI / 8) * i;
        let col = this.colors[i % this.colors.length];
        fill(col[0], col[1], col[2], 150);
        noStroke();

        push();
        rotate(angle);
        ellipse(this.size * 0.4 * pulse, 0, this.size * 0.3, this.size * 0.15);
        pop();
      }
      this.size *= 0.6;
    }

    pop();
    this.rotation += 0.005;
  }
}

class Lantern {
  constructor(x) {
    this.x = x;
    this.y = height + 50;
    this.speed = random(0.5, 1.5);
    this.size = random(30, 50);
    this.sway = random(TWO_PI);
    this.color = random([
      [255, 200, 50],
      [255, 100, 100],
      [100, 200, 255],
    ]);
  }

  update() {
    this.y -= this.speed;
    this.sway += 0.05;
  }

  show() {
    let swayX = sin(this.sway) * 10;

    // Glow
    for (let i = 3; i > 0; i--) {
      fill(this.color[0], this.color[1], this.color[2], 20);
      ellipse(this.x + swayX, this.y, this.size * i * 0.8, this.size * i);
    }

    // Lantern body
    fill(this.color[0], this.color[1], this.color[2], 200);
    noStroke();
    rect(
      this.x + swayX - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size * 1.2,
      5,
    );

    // Lantern lines
    stroke(0, 50);
    strokeWeight(1);
    for (let i = 0; i < 3; i++) {
      line(
        this.x + swayX - this.size / 2,
        this.y - this.size / 2 + (i * this.size) / 3,
        this.x + swayX + this.size / 2,
        this.y - this.size / 2 + (i * this.size) / 3,
      );
    }
  }

  isDead() {
    return this.y < -100;
  }
}

class Chakri {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.radius = 0;
    this.maxRadius = random(40, 70);
    this.speed = random(0.2, 0.4);
    this.life = 255;
    this.color = random([
      [255, 50, 50],
      [255, 200, 50],
      [50, 255, 50],
    ]);
  }

  update() {
    this.angle += 0.3;
    if (this.radius < this.maxRadius) {
      this.radius += this.speed;
    }
    this.life -= 1;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // Spinning trail
    for (let i = 0; i < 12; i++) {
      let a = (TWO_PI / 12) * i;
      let x = cos(a) * this.radius;
      let y = sin(a) * this.radius;

      fill(this.color[0], this.color[1], this.color[2], this.life);
      noStroke();
      ellipse(x, y, 8, 8);

      // Sparkles
      stroke(255, 255, 255, this.life * 0.5);
      strokeWeight(2);
      point(x, y);
    }
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

class SparklerParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.life = 255;
    this.size = random(2, 5);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;
    this.life -= 8;
  }

  show() {
    fill(255, 200, 100, this.life);
    noStroke();
    ellipse(this.x, this.y, this.size);

    // Sparkle
    stroke(255, 255, 255, this.life);
    strokeWeight(1);
    line(this.x - 3, this.y, this.x + 3, this.y);
    line(this.x, this.y - 3, this.x, this.y + 3);
  }

  isDead() {
    return this.life <= 0;
  }
}

class Diya {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.flicker = 0;
    this.color = col || [180, 90, 30];
  }

  show() {
    this.flicker = noise(frameCount * 0.1 + this.x) * 5;

    // Diya base
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();
    ellipse(this.x, this.y, 30, 15);

    // Flame glow
    for (let i = 3; i > 0; i--) {
      fill(255, 150, 0, 30);
      ellipse(this.x, this.y - 15 + this.flicker, 20 * i, 25 * i);
    }

    // Flame
    fill(255, 200, 0);
    beginShape();
    vertex(this.x, this.y - 10 + this.flicker);
    bezierVertex(
      this.x - 5,
      this.y - 20 + this.flicker,
      this.x - 3,
      this.y - 30 + this.flicker,
      this.x,
      this.y - 35 + this.flicker,
    );
    bezierVertex(
      this.x + 3,
      this.y - 30 + this.flicker,
      this.x + 5,
      this.y - 20 + this.flicker,
      this.x,
      this.y - 10 + this.flicker,
    );
    endShape(CLOSE);

    // Inner flame
    fill(255, 255, 150);
    ellipse(this.x, this.y - 20 + this.flicker, 8, 12);
  }
}

class Firework {
  constructor(x, y, hasMessage) {
    this.x = x;
    this.y = height;
    this.targetY = y;
    this.speed = random(8, 12);
    this.exploded = false;
    this.hue = random(360);
    this.hasMessage = hasMessage;
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.explode();
        this.exploded = true;
      }
    }
  }

  explode() {
    let colors = [
      [255, 50, 50],
      [255, 200, 50],
      [50, 255, 50],
      [50, 150, 255],
      [255, 100, 255],
      [255, 150, 50],
    ];

    let particleColor = random(colors);
    let particleCount = random(80, 150);

    for (let i = 0; i < particleCount; i++) {
      let angle = random(TWO_PI);
      let speed = random(2, 8);
      particles.push(
        new Particle(
          this.x,
          this.y,
          angle,
          speed,
          particleColor,
          this.hasMessage,
        ),
      );
    }
  }

  show() {
    if (!this.exploded) {
      strokeWeight(4);
      stroke(this.hue, 255, 255);
      point(this.x, this.y);

      for (let i = 0; i < 5; i++) {
        stroke(this.hue, 255, 255, 100 - i * 20);
        point(this.x + random(-2, 2), this.y + i * 5);
      }
    }
  }
}

class Particle {
  constructor(x, y, angle, speed, col, showMessage) {
    this.x = x;
    this.y = y;
    this.vx = cos(angle) * speed;
    this.vy = sin(angle) * speed;
    this.alpha = 255;
    this.size = random(2, 6);
    this.color = col;
    this.gravity = 0.1;
    this.showMessage = showMessage;
    this.message = showMessage ? messages[currentMessage] : null;
  }

  update() {
    this.vx *= 0.98;
    this.vy *= 0.98;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 4;
  }

  show() {
    noStroke();
    fill(this.color[0], this.color[1], this.color[2], this.alpha);
    ellipse(this.x, this.y, this.size);

    if (random(1) > 0.95) {
      stroke(255, 255, 255, this.alpha);
      strokeWeight(1);
      line(this.x - 3, this.y, this.x + 3, this.y);
      line(this.x, this.y - 3, this.x, this.y + 3);
    }

    // Show message in center
    if (
      this.showMessage &&
      this.alpha > 200 &&
      dist(this.x, this.y, width / 2, height / 3) < 50
    ) {
      fill(255, 255, 255, this.alpha);
      textSize(40);
      textAlign(CENTER, CENTER);
      text(this.message, width / 2, height / 3);
    }
  }

  isDead() {
    return this.alpha <= 0;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB);

  // Create rangolis
  for (let i = 0; i < 3; i++) {
    rangolis.push(
      new Rangoli(random(100, width - 100), random(height - 150, height - 50)),
    );
  }

  // Create colorful diyas
  let diyaColors = [
    [180, 90, 30],
    [200, 50, 50],
    [50, 150, 200],
    [150, 50, 150],
  ];
  for (let i = 100; i < width - 100; i += 120) {
    diyas.push(new Diya(i, height - 50, random(diyaColors)));
  }

  // Auto-launch fireworks
  setInterval(() => {
    if (random(1) > 0.3) {
      let hasMessage = random(1) > 0.85;
      fireworks.push(
        new Firework(
          random(width * 0.2, width * 0.8),
          random(height * 0.2, height * 0.5),
          hasMessage,
        ),
      );
      if (hasMessage) {
        currentMessage = (currentMessage + 1) % messages.length;
      }
    }
  }, 800);

  // Launch lanterns periodically
  setInterval(() => {
    if (random(1) > 0.7) {
      lanterns.push(new Lantern(random(width * 0.2, width * 0.8)));
    }
  }, 3000);

  // Spawn chakris occasionally
  setInterval(() => {
    if (random(1) > 0.6) {
      chakris.push(new Chakri(random(100, width - 100), height - 60));
    }
  }, 2500);
}

function draw() {
  // Night sky with fade
  fill(10, 14, 39, 40);
  noStroke();
  rect(0, 0, width, height);

  // Stars
  for (let i = 0; i < 100; i++) {
    let starX = noise(i * 100) * width;
    let starY = noise(i * 200) * height * 0.7;
    let twinkle = noise(frameCount * 0.01 + i) * 255;
    stroke(255, 255, 255, twinkle);
    strokeWeight(random(1, 2));
    point(starX, starY);
  }

  // Show rangolis
  for (let rangoli of rangolis) {
    rangoli.show();
  }

  // Update and show lanterns
  for (let i = lanterns.length - 1; i >= 0; i--) {
    lanterns[i].update();
    lanterns[i].show();
    if (lanterns[i].isDead()) {
      lanterns.splice(i, 1);
    }
  }

  // Update and show chakris
  for (let i = chakris.length - 1; i >= 0; i--) {
    chakris[i].update();
    chakris[i].show();
    if (chakris[i].isDead()) {
      chakris.splice(i, 1);
    }
  }

  // Update and show fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].exploded) {
      fireworks.splice(i, 1);
    }
  }

  // Update and show particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Update and show sparkler trail
  for (let i = sparkler.length - 1; i >= 0; i--) {
    sparkler[i].update();
    sparkler[i].show();
    if (sparkler[i].isDead()) {
      sparkler.splice(i, 1);
    }
  }

  // Show diyas
  for (let diya of diyas) {
    diya.show();
  }

  // Title
  fill(255, 215, 0, 200);
  textSize(32);
  textAlign(CENTER);
  text("✨ शुभ दीपावली ✨", width / 2, 50);

  // Instructions
  fill(255, 255, 255, 150);
  textSize(14);
  text(
    "Click: Fireworks | Drag: Sparkler | Space: Chakri",
    width / 2,
    height - 20,
  );
}

function mousePressed() {
  let hasMessage = random(1) > 0.7;
  fireworks.push(
    new Firework(mouseX, random(height * 0.2, height * 0.5), hasMessage),
  );
  if (hasMessage) {
    currentMessage = (currentMessage + 1) % messages.length;
  }
}

function mouseDragged() {
  // Sparkler effect
  for (let i = 0; i < 5; i++) {
    sparkler.push(
      new SparklerParticle(mouseX + random(-5, 5), mouseY + random(-5, 5)),
    );
  }
}

function keyPressed() {
  if (key === " ") {
    chakris.push(new Chakri(random(100, width - 100), height - 60));
  }
  if (key === "l" || key === "L") {
    lanterns.push(new Lantern(random(width * 0.2, width * 0.8)));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  diyas = [];
  rangolis = [];
  let diyaColors = [
    [180, 90, 30],
    [200, 50, 50],
    [50, 150, 200],
    [150, 50, 150],
  ];
  for (let i = 100; i < width - 100; i += 120) {
    diyas.push(new Diya(i, height - 50, random(diyaColors)));
  }
  for (let i = 0; i < 3; i++) {
    rangolis.push(
      new Rangoli(random(100, width - 100), random(height - 150, height - 50)),
    );
  }
}
