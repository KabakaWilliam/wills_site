// The simulation is independent of canvas so jump timing and generation can be tested.
export const FLOOR = 208;
export const PLAYER_X = 100;
export const GRAVITY = 1000;
export const JUMP_SPEED = 365;

export function createRun(random = Math.random) {
  return {
    distance: 0, elapsed: 0, score: 0, speed: 145, y: FLOOR, vy: 0,
    grounded: true, coyote: .075, buffer: 0, over: false, cause: null,
    jumpsUsed: 0, spark: null, deadlines: [], holesGenerated: 0,
    holes: [], gpus: [{ x: 245, y: 184 }, { x: 295, y: 184 }],
    nextHole: 570, random,
  };
}

export function jump(run) {
  if (!run.over) run.buffer = .12;
}

export function step(run, dt) {
  if (run.over) return;
  // A fixed upper bound avoids tunnelling after a browser stalls.
  dt = Math.min(dt, 1 / 30);
  run.elapsed += dt;
  run.speed = Math.min(195, 145 + run.distance / 250);
  run.distance += run.speed * dt;
  while (run.nextHole < run.distance + 1000) {
    const x = run.nextHole;
    const width = 45 + run.random() * 17;
    run.holes.push({ x, width });
    run.holesGenerated++;
    run.gpus.push({ x: x - 135, y: 184 }, { x: x - 85, y: 184 },
      { x: x + width / 2, y: 145 }, { x: x + width + 95, y: 184 });
    // Every third stretch, beginning after hole two, is a long, solid runway.
    // A deadline gets its own encounter; it never shares a jump with a hole.
    if (run.holesGenerated % 3 === 2) {
      run.deadlines.push({ active: false, startAt: x + width + 100,
        minX: x + width + 40, x: 0 });
      run.nextHole += width + 840;
    } else {
      run.nextHole += width + 280 + run.random() * 120;
    }
  }
  const worldX = run.distance + PLAYER_X;
  const aboveHole = run.holes.some(hole => worldX > hole.x + 3 && worldX < hole.x + hole.width - 3);
  if (run.grounded && !aboveHole) run.coyote = .075;
  else run.coyote = Math.max(0, run.coyote - dt);
  const groundJump = run.coyote > 0;
  const airJump = !run.grounded && run.jumpsUsed < 2 && run.y <= FLOOR + 8;
  if (run.buffer > 0 && (groundJump || airJump)) {
    run.jumpsUsed = groundJump ? 1 : 2;
    if (!groundJump) run.spark = { x: worldX, y: run.y, life: .22 };
    run.vy = -JUMP_SPEED;
    run.grounded = false;
    run.coyote = 0;
    run.buffer = 0;
  }
  run.buffer = Math.max(0, run.buffer - dt);
  const previousY = run.y;
  run.vy += GRAVITY * dt;
  run.y += run.vy * dt;
  run.grounded = false;
  if (!aboveHole && previousY <= FLOOR && run.y >= FLOOR && run.vy >= 0) {
    run.y = FLOOR;
    run.vy = 0;
    run.grounded = true;
    run.jumpsUsed = 0;
  }
  if (run.spark) {
    run.spark.life -= dt;
    if (run.spark.life <= 0) run.spark = null;
  }
  for (const deadline of run.deadlines) {
    if (!deadline.active && worldX >= deadline.startAt) {
      deadline.active = true;
      deadline.x = worldX + 420;
    }
    if (!deadline.active) continue;
    deadline.x -= 70 * dt;
    // The flag is decorative: only the clock body has a hitbox.
    if (Math.abs(deadline.x - worldX) < 23 && run.y > FLOOR - 31 && run.y - 36 < FLOOR) {
      run.over = true;
      run.cause = 'deadline';
    }
  }
  run.deadlines = run.deadlines.filter(deadline =>
    !deadline.active || (deadline.x > deadline.minX && deadline.x > run.distance - 40));
  for (const gpu of run.gpus) {
    if (!gpu.collected && Math.abs(gpu.x - worldX) < 21
      && gpu.y + 8 > run.y - 36 && gpu.y - 8 < run.y) {
      gpu.collected = true;
      run.score++;
    }
  }
  run.holes = run.holes.filter(hole => hole.x + hole.width > run.distance - 30);
  run.gpus = run.gpus.filter(gpu => !gpu.collected && gpu.x > run.distance - 30);
  if (run.y > 320) {
    run.over = true;
    run.cause = 'hole';
  }
}
