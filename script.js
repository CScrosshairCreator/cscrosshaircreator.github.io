const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");

const size = document.getElementById("size");
const gap = document.getElementById("gap");
const thickness = document.getElementById("thickness");
const color = document.getElementById("color");
const style = document.getElementById("style");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy");

const inputs = [size, gap, thickness, color, style];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
  ctx.lineWidth = thickness.value;

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const s = parseInt(size.value);
  const g = parseInt(gap.value);

  if (style.value === "classic") {
    ctx.beginPath();
    ctx.moveTo(cx - g - s, cy);
    ctx.lineTo(cx - g, cy);
    ctx.moveTo(cx + g, cy);
    ctx.lineTo(cx + g + s, cy);
    ctx.moveTo(cx, cy - g - s);
    ctx.lineTo(cx, cy - g);
    ctx.moveTo(cx, cy + g);
    ctx.lineTo(cx, cy + g + s);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(cx, cy, thickness.value + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  updateCommand();
}

function updateCommand() {
  const rgb = hexToRgb(color.value);
  const cmd = [
    `cl_crosshairsize ${size.value}`,
    `cl_crosshairgap ${gap.value}`,
    `cl_crosshairthickness ${thickness.value}`,
    `cl_crosshaircolor 5`,
    `cl_crosshaircolor_r ${rgb.r}`,
    `cl_crosshaircolor_g ${rgb.g}`,
    `cl_crosshaircolor_b ${rgb.b}`,
    `cl_crosshairstyle ${style.value === "classic" ? 4 : 2}`
  ].join("; ");

  output.value = cmd;
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

copyBtn.onclick = () => {
  output.select();
  document.execCommand("copy");
};

inputs.forEach(i => i.addEventListener("input", draw));
draw();
