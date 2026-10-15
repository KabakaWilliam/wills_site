// A small original pixel landscape; no image downloads or location requests.
export function oxfordScene(date = new Date()) {
  const hour = Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", hour: "2-digit", hourCycle: "h23",
  }).format(date));
  // An ambient clock, not a claim about astronomical sunrise/sunset.
  return hour >= 7 && hour < 19 ? "day" : "night";
}

export function meadowStems(width, height) {
  let seed = 8173;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: Math.round(width * 1.45) }, (_, i) => {
    const layer = i < width * .5 ? 0 : i < width ? 1 : 2;
    return {
      x: random() * (width + 24) - 12,
      y: height * (.79 + layer * .085) + random() * height * .065,
      length: (12 + random() * 19) * (1 + layer * .42),
      phase: random() * Math.PI * 2,
      lean: random() * 5 - 1,
      layer,
      flower: random() > .967,
    };
  });
}

const palettes = {
  day: {
    sky: ["#c1d9ed", "#cbdfee", "#d6e5ed", "#e5ebe7"],
    cloud: "#f6f2df", cloudShade: "#dde6e4", orb: "#f4d997",
    hills: ["#bbc4b0", "#c6c3a1", "#d6c18b"],
    field: ["#d3b577", "#c8a267", "#ba9059"],
    stems: ["#b99c64", "#ac8250", "#977348"],
    heads: ["#e4cb8b", "#f0d69a", "#f7e2ad"],
    flowers: "#9c8ba3", skyline: "#acb6b1",
  },
  night: {
    sky: ["#2b3c60", "#354a70", "#4c6082", "#76809a"],
    cloud: "#8993ab", cloudShade: "#697c9a", orb: "#eee6c5",
    hills: ["#727f8d", "#81858a", "#8e8e8d"],
    field: ["#8a8f86", "#737f7a", "#5b706e"],
    stems: ["#81908c", "#71847c", "#5a756f"],
    heads: ["#b7bdac", "#cbd0b9", "#e0dfbf"],
    flowers: "#b9abc7", skyline: "#65758d",
  },
};

// Each cow has its own small patch of meadow, so they never wander into the UI.
export function meadowCows(width, height, time, scene) {
  return [.26, .7].map((position, index) => {
    const phase = time * .075 + index * 2.3;
    return {
      x: width * position + (scene === "day" ? Math.sin(phase) * Math.min(24, width * .075) : 0),
      y: height - 29 - index * 4,
      facing: scene === "night" ? (index ? -1 : 1) : Math.cos(phase) >= 0 ? 1 : -1,
      sleeping: scene === "night",
      step: Math.sin(time * 3.2 + index * 2) >= 0 ? 1 : -1,
      breath: Math.sin(time * .9 + index) > .7 ? 1 : 0,
      dream: (time * .2 + index * .4) % 1,
    };
  });
}

function drawCow(pixel, cow, scene) {
  const night = scene === "night";
  const ink = night ? "#46545c" : "#575148";
  const coat = night ? "#d7d9cc" : "#fff4d8";
  const shade = night ? "#a5b8b0" : "#dac9a3";
  const nose = night ? "#ba9c9c" : "#d6a396";
  const p = (x, y, w, h, color) => pixel(cow.x + (cow.facing === 1 ? x : -x - w), cow.y + y, w, h, color);
  // A tiny trampled patch anchors their feet among the tall stalks.
  p(-12, -1, 25, 2, night ? "#617771" : "#a88b5b");
  if (cow.sleeping) {
    const rise = cow.breath;
    p(-10, -8 - rise, 18, 8 + rise, ink);
    p(-11, -5, 20, 4, ink);
    p(-9, -7 - rise, 16, 6 + rise, coat);
    p(-6, -7 - rise, 5, 4, ink);
    p(1, -4, 4, 3, ink);
    p(-8, -1, 5, 1, shade);
    p(3, -1, 5, 1, shade);
    p(6, -9, 7, 8, ink);
    p(7, -8, 5, 6, coat);
    p(5, -9, 3, 2, shade);
    p(11, -10, 2, 2, shade);
    p(10, -6, 2, 1, ink); // Closed eyelid.
    p(10, -4, 4, 3, nose);
    // Draw the Zs as actual pixels rather than antialiased canvas text.
    for (let z = 0; z < 2; z++) {
      const lift = Math.floor(cow.dream * 5);
      const x = cow.x + 9 + z * 7;
      const y = cow.y - 15 - z * 7 - lift;
      const glyph = [[0, 0, 5, 1], [3, 1, 1, 1], [2, 2, 1, 1], [1, 3, 1, 1], [0, 4, 5, 1]];
      // A light one-pixel outline keeps the Zs legible against busy wheat.
      for (const [gx, gy, w, h] of glyph) pixel(x + gx - 1, y + gy - 1, w + 2, h + 2, "#e9e7d5");
      for (const [gx, gy, w, h] of glyph) pixel(x + gx, y + gy, w, h, "#344655");
    }
    return;
  }
  p(-11, -13, 18, 10, ink);
  p(-12, -11, 2, 7, ink); // Tail.
  p(-13, -5 + cow.step, 2, 2, ink);
  p(-10, -12, 16, 8, coat);
  p(-7, -12, 5, 4, ink);
  p(-2, -7, 4, 3, ink);
  p(4, -11, 2, 4, ink);
  p(-9 + cow.step, -4, 3, 4, shade);
  p(3 - cow.step, -4, 3, 4, shade);
  p(-9 + cow.step, -1, 3, 1, ink);
  p(3 - cow.step, -1, 3, 1, ink);
  p(5, -16, 8, 10, ink);
  p(6, -15, 6, 8, coat);
  p(4, -15, 3, 2, shade); // Ears and small horns.
  p(11, -17, 2, 2, shade);
  p(7, -18, 1, 2, shade);
  p(11, -12, 1, 1, ink);
  p(10, -10, 5, 4, nose);
  p(13, -9, 1, 1, ink);
}

export function drawMeadow(ctx, width, height, time, scene, stems) {
  const palette = palettes[scene];
  const pixel = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.max(1, Math.round(w)), Math.max(1, Math.round(h)));
  };
  const line = (x0, y0, x1, y1, color) => {
    const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (let n = 0; n <= steps; n++) {
      pixel(x0 + (x1 - x0) * n / steps, y0 + (y1 - y0) * n / steps, 1, 1, color);
    }
  };
  const disc = (x, y, radius, color) => {
    for (let dy = -radius; dy <= radius; dy++) {
      const dx = Math.floor(Math.sqrt(radius * radius - dy * dy));
      pixel(x - dx, y + dy, dx * 2 + 1, 1, color);
    }
  };
  ctx.imageSmoothingEnabled = false;
  const horizon = Math.round(height * .73);
  for (let band = 0; band < 4; band++) {
    pixel(0, band * horizon / 4, width, horizon / 4 + 1, palette.sky[band]);
  }
  const orbX = width * .88, orbY = Math.min(32, height * .12);
  disc(orbX, orbY, 10, palette.orb);
  if (scene === "night") {
    disc(orbX + 5, orbY - 3, 9, palette.sky[0]);
    for (let i = 0; i < 19; i++) {
      const x = (i * 71 + 23) % width;
      const y = 9 + (i * 37 % Math.max(10, horizon * .52));
      pixel(x, y, 1, 1, i % 3 ? "#aeb7c7" : "#e7dfc2");
    }
  }
  for (let i = 0; i < 5; i++) {
    const x = ((i * width * .34 + time * (.55 + i * .06)) % (width + 100)) - 65;
    const y = 17 + (i % 3) * horizon * .15;
    pixel(x, y + 6, 59, 6, palette.cloudShade);
    pixel(x + 5, y + 2, 51, 7, palette.cloud);
    pixel(x + 16, y - 2, 27, 5, palette.cloud);
    pixel(x + 24, y - 5, 12, 4, palette.cloud);
    pixel(x + 57, y + 8, 15, 2, palette.cloudShade);
  }
  // Distant Oxford-like towers, softened by the haze and the reading scrim.
  for (let i = 0; i < 7; i++) {
    const x = width * (.08 + i * .14);
    const y = horizon - 9 - (i % 3) * 3;
    pixel(x, y, 11, 18, palette.skyline);
    pixel(x + 3, y - 4, 5, 4, palette.skyline);
    if (i % 2) {
      line(x + 5, y - 14, x + 1, y - 3, palette.skyline);
      line(x + 5, y - 14, x + 8, y - 3, palette.skyline);
    }
  }
  for (let layer = 0; layer < 3; layer++) {
    for (let x = 0; x < width; x += 3) {
      const y = horizon + layer * 8 + Math.sin(x / (49 + layer * 17) + layer) * 5;
      pixel(x, y, 3, height - y, palette.hills[layer]);
    }
  }
  for (let layer = 0; layer < 3; layer++) {
    const baseline = height * (.82 + layer * .065);
    for (let x = 0; x < width; x += 5) {
      const y = baseline + Math.sin(x / 55 + layer * 2) * 4;
      pixel(x, y, 5, height - y, palette.field[layer]);
    }
    for (const stem of stems) {
      if (stem.layer !== layer) continue;
      // Shared travelling waves make patches bend together; each stalk still varies.
      const wind = Math.sin(time * .6 - stem.x / 56) * 3
        + Math.sin(time * .24 - stem.x / 103) * 2;
      const bend = stem.lean + wind * (1 + layer * .5) + Math.sin(time * .85 + stem.phase);
      const tipX = stem.x + bend;
      const tipY = stem.y - stem.length;
      const midX = stem.x + bend * .25;
      const midY = stem.y - stem.length * .48;
      line(stem.x, stem.y, midX, midY, palette.stems[layer]);
      line(midX, midY, tipX, tipY, palette.stems[layer]);
      line(midX, midY + 3, midX - 5 + bend * .3, midY - 4, palette.stems[layer]);
      if (stem.flower) {
        pixel(tipX - 1, tipY - 4, 2, 7, palette.flowers);
        pixel(tipX - 2, tipY, 4, 2, palette.flowers);
      } else {
        for (let grain = 0; grain < 4; grain++) {
          const gx = tipX + bend * .025 * grain;
          const gy = tipY + grain * 2;
          pixel(gx - 2, gy, 2, 1, palette.heads[layer]);
          pixel(gx + 1, gy - 1, 2, 1, palette.heads[layer]);
        }
        line(tipX, tipY - 4, tipX, tipY + 7, palette.heads[layer]);
      }
    }
  }
  for (const cow of meadowCows(width, height, time, scene)) {
    drawCow(pixel, cow, scene);
  }
}
