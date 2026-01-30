/**
 * CS Crosshair Generator
 * A modern crosshair customization tool for Counter-Strike
 */

// ===== DOM Elements =====
const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");

// Controls
const size = document.getElementById("size");
const gap = document.getElementById("gap");
const thickness = document.getElementById("thickness");
const opacity = document.getElementById("opacity");
const outline = document.getElementById("outline");
const color = document.getElementById("color");
const style = document.getElementById("style");
const drawDot = document.getElementById("drawDot");

// Value displays
const sizeValue = document.getElementById("sizeValue");
const gapValue = document.getElementById("gapValue");
const thicknessValue = document.getElementById("thicknessValue");
const opacityValue = document.getElementById("opacityValue");
const outlineValue = document.getElementById("outlineValue");

// Buttons
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy");
const shareBtn = document.getElementById("share");
const themeToggle = document.getElementById("themeToggle");

// Preset buttons
const presetButtons = document.querySelectorAll(".preset-btn");

// All inputs that trigger redraw
const inputs = [size, gap, thickness, opacity, outline, color, style, drawDot];

// ===== Pro Player Presets =====
const presets = {
  s1mple: { size: 7, gap: -3, thickness: 1, color: "#50FA7B", style: "classic", outline: 1, opacity: 200, drawDot: false },
  niko: { size: 4, gap: -2, thickness: 0, color: "#00FF00", style: "classic", outline: 1, opacity: 255, drawDot: true },
  zywoo: { size: 3, gap: -3, thickness: 1, color: "#00FF00", style: "classic", outline: 1, opacity: 255, drawDot: false },
  device: { size: 5, gap: -3, thickness: 1, color: "#50FA7B", style: "classic", outline: 0, opacity: 200, drawDot: false },
  electronic: { size: 5, gap: -1, thickness: 1, color: "#00FFFF", style: "classic", outline: 1, opacity: 255, drawDot: false },
  twistzz: { size: 4, gap: -3, thickness: 0, color: "#00FF00", style: "classic", outline: 1, opacity: 255, drawDot: false },
  ropz: { size: 2, gap: 1, thickness: 1, color: "#FFFFFF", style: "dot", outline: 1, opacity: 255, drawDot: false },
  m0nesy: { size: 6, gap: -2, thickness: 1, color: "#FFFF00", style: "classic", outline: 1, opacity: 220, drawDot: false }
};

// ===== Theme Management =====
/**
 * Initialize theme from localStorage or system preference
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");

  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

/**
 * Update theme toggle icon
 */
function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  if (theme === "dark") {
    // Sun icon for light mode option
    icon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  } else {
    // Moon icon for dark mode option
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  }
}

// ===== Drawing Functions =====
/**
 * Main draw function - renders the crosshair on canvas
 */
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const s = parseInt(size.value);
  const g = parseInt(gap.value);
  const t = parseInt(thickness.value);
  const o = parseInt(outline.value);
  const a = parseInt(opacity.value) / 255;

  const rgb = hexToRgb(color.value);
  const colorStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;

  // Draw outline first (if enabled)
  if (o > 0) {
    ctx.strokeStyle = `rgba(0, 0, 0, ${a})`;
    ctx.fillStyle = `rgba(0, 0, 0, ${a})`;
    ctx.lineWidth = t + (o * 2);
    drawCrosshairShape(cx, cy, s, g, style.value);
  }

  // Draw main crosshair
  ctx.strokeStyle = colorStr;
  ctx.fillStyle = colorStr;
  ctx.lineWidth = t;
  drawCrosshairShape(cx, cy, s, g, style.value);

  // Draw center dot if enabled
  if (drawDot.checked) {
    ctx.fillStyle = colorStr;
    ctx.beginPath();
    ctx.arc(cx, cy, t + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  updateCommand();
  updateValueDisplays();
}

/**
 * Draw crosshair based on selected style
 */
function drawCrosshairShape(cx, cy, s, g, styleType) {
  switch (styleType) {
    case "classic":
      drawClassic(cx, cy, s, g);
      break;
    case "dot":
      drawDotOnly(cx, cy);
      break;
    case "t-style":
      drawTStyle(cx, cy, s, g);
      break;
    case "circle":
      drawCircle(cx, cy, s, g);
      break;
    case "square":
      drawSquare(cx, cy, s, g);
      break;
  }
}

/**
 * Classic crosshair (4 lines)
 */
function drawClassic(cx, cy, s, g) {
  ctx.beginPath();
  // Left
  ctx.moveTo(cx - g - s, cy);
  ctx.lineTo(cx - g, cy);
  // Right
  ctx.moveTo(cx + g, cy);
  ctx.lineTo(cx + g + s, cy);
  // Top
  ctx.moveTo(cx, cy - g - s);
  ctx.lineTo(cx, cy - g);
  // Bottom
  ctx.moveTo(cx, cy + g);
  ctx.lineTo(cx, cy + g + s);
  ctx.stroke();
}

/**
 * Dot only style
 */
function drawDotOnly(cx, cy) {
  ctx.beginPath();
  ctx.arc(cx, cy, ctx.lineWidth + 1, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * T-Style crosshair (no top line)
 */
function drawTStyle(cx, cy, s, g) {
  ctx.beginPath();
  // Left
  ctx.moveTo(cx - g - s, cy);
  ctx.lineTo(cx - g, cy);
  // Right
  ctx.moveTo(cx + g, cy);
  ctx.lineTo(cx + g + s, cy);
  // Bottom only
  ctx.moveTo(cx, cy + g);
  ctx.lineTo(cx, cy + g + s);
  ctx.stroke();
}

/**
 * Circle crosshair
 */
function drawCircle(cx, cy, s, g) {
  ctx.beginPath();
  ctx.arc(cx, cy, g + s, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Square crosshair
 */
function drawSquare(cx, cy, s, g) {
  const size = (g + s) * 2;
  ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
}

// ===== Command Generation =====
/**
 * Generate CS console command from current settings
 */
function updateCommand() {
  const rgb = hexToRgb(color.value);
  const csStyle = getCSStyle(style.value);
  const alpha = parseInt(opacity.value);
  const outlineThickness = parseInt(outline.value);
  const dot = drawDot.checked ? 1 : 0;

  const cmd = [
    `cl_crosshairsize ${size.value}`,
    `cl_crosshairgap ${gap.value}`,
    `cl_crosshairthickness ${thickness.value}`,
    `cl_crosshairalpha ${alpha}`,
    `cl_crosshair_drawoutline ${outlineThickness > 0 ? 1 : 0}`,
    `cl_crosshair_outlinethickness ${outlineThickness}`,
    `cl_crosshaircolor 5`,
    `cl_crosshaircolor_r ${rgb.r}`,
    `cl_crosshaircolor_g ${rgb.g}`,
    `cl_crosshaircolor_b ${rgb.b}`,
    `cl_crosshairstyle ${csStyle}`,
    `cl_crosshairdot ${dot}`
  ].join("; ");

  output.value = cmd;
}

/**
 * Map our style names to CS style numbers
 */
function getCSStyle(styleType) {
  const styleMap = {
    "classic": 4,
    "dot": 2,
    "t-style": 4,
    "circle": 0,
    "square": 3
  };
  return styleMap[styleType] || 4;
}

/**
 * Update value displays next to sliders
 */
function updateValueDisplays() {
  sizeValue.textContent = size.value;
  gapValue.textContent = gap.value;
  thicknessValue.textContent = thickness.value;
  opacityValue.textContent = opacity.value;
  outlineValue.textContent = outline.value;
}

// ===== Utility Functions =====
/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

/**
 * Convert RGB to hex color
 */
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ===== Copy & Share Functions =====
/**
 * Copy command to clipboard using modern Clipboard API
 */
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(output.value);

    // Visual feedback
    copyBtn.classList.add("copied");
    const originalText = copyBtn.innerHTML;
    copyBtn.innerHTML = "✅ Copied!";

    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyBtn.innerHTML = originalText;
    }, 2000);
  } catch (err) {
    // Fallback for older browsers or non-HTTPS
    output.select();
    try {
      document.execCommand("copy");
      copyBtn.innerHTML = "✅ Copied!";
      setTimeout(() => {
        copyBtn.innerHTML = "📋 Copy Command";
      }, 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
      alert("Failed to copy. Please copy manually.");
    }
  }
}

/**
 * Generate shareable URL with current settings
 */
function shareURL() {
  const params = new URLSearchParams({
    size: size.value,
    gap: gap.value,
    thickness: thickness.value,
    opacity: opacity.value,
    outline: outline.value,
    color: color.value.slice(1), // Remove #
    style: style.value,
    dot: drawDot.checked ? "1" : "0"
  });

  const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  // Copy to clipboard
  navigator.clipboard.writeText(shareUrl).then(() => {
    const originalText = shareBtn.innerHTML;
    shareBtn.innerHTML = "✅ URL Copied!";
    setTimeout(() => {
      shareBtn.innerHTML = originalText;
    }, 2000);
  }).catch(() => {
    // Fallback: show prompt
    prompt("Share this URL:", shareUrl);
  });
}

// ===== URL Parameters & LocalStorage =====
/**
 * Load settings from URL parameters or localStorage
 */
function loadSettings() {
  const params = new URLSearchParams(window.location.search);

  // Check URL parameters first
  if (params.has("size")) {
    size.value = params.get("size");
    gap.value = params.get("gap");
    thickness.value = params.get("thickness");
    opacity.value = params.get("opacity") || 255;
    outline.value = params.get("outline") || 0;
    color.value = "#" + params.get("color");
    style.value = params.get("style");
    drawDot.checked = params.get("dot") === "1";
  } else {
    // Load from localStorage if available
    const saved = localStorage.getItem("crosshairSettings");
    if (saved) {
      try {
        const settings = JSON.parse(saved);
        size.value = settings.size;
        gap.value = settings.gap;
        thickness.value = settings.thickness;
        opacity.value = settings.opacity || 255;
        outline.value = settings.outline || 0;
        color.value = settings.color;
        style.value = settings.style;
        drawDot.checked = settings.drawDot || false;
      } catch (e) {
        console.error("Failed to load settings:", e);
      }
    }
  }
}

/**
 * Save current settings to localStorage
 */
function saveSettings() {
  const settings = {
    size: size.value,
    gap: gap.value,
    thickness: thickness.value,
    opacity: opacity.value,
    outline: outline.value,
    color: color.value,
    style: style.value,
    drawDot: drawDot.checked
  };

  localStorage.setItem("crosshairSettings", JSON.stringify(settings));
}

// ===== Preset Functions =====
/**
 * Apply a preset configuration
 */
function applyPreset(presetName) {
  const preset = presets[presetName];
  if (!preset) return;

  size.value = preset.size;
  gap.value = preset.gap;
  thickness.value = preset.thickness;
  opacity.value = preset.opacity;
  outline.value = preset.outline;
  color.value = preset.color;
  style.value = preset.style;
  drawDot.checked = preset.drawDot;

  draw();
  saveSettings();
}

// ===== Event Listeners =====
// Input changes
inputs.forEach(input => {
  input.addEventListener("input", () => {
    draw();
    saveSettings();
  });
});

// Buttons
copyBtn.addEventListener("click", copyToClipboard);
shareBtn.addEventListener("click", shareURL);
themeToggle.addEventListener("click", toggleTheme);

// Presets
presetButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const presetName = btn.getAttribute("data-preset");
    applyPreset(presetName);
  });
});

// ===== Initialization =====
initTheme();
loadSettings();
draw();

