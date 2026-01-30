# CS Crosshair Generator 🎯

A modern, feature-rich crosshair customization tool for Counter-Strike (CS:GO and CS2). Create your perfect crosshair with real-time preview and instantly generate console commands.

**Live Demo:** [cscrosshaircreator.github.io](https://cscrosshaircreator.github.io)

## ✨ Features

### 🎨 Customization Options
- **Size, Gap & Thickness** - Fine-tune your crosshair dimensions
- **Color Picker** - Choose any color with hex color support
- **Opacity Control** - Adjust transparency from 0-255
- **Outline** - Add black outline for better visibility (0-3 thickness)
- **Multiple Styles** - Classic, Dot, T-Style, Circle, and Square
- **Center Dot** - Optional center dot for precise aiming

### ⭐ Pro Player Presets
One-click presets from professional players:
- s1mple
- NiKo
- ZywOo
- dev1ce
- electronic
- Twistzz
- ropz
- m0NESY

### 🚀 Modern Features
- **Real-time Preview** - See your crosshair exactly as it will appear in-game
- **Instant Copy** - Modern clipboard API for seamless command copying
- **URL Sharing** - Share your crosshair with friends via URL
- **Auto-Save** - Your settings are automatically saved in your browser
- **Theme Toggle** - Switch between dark and light modes
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Accessibility** - Full keyboard navigation and ARIA labels

## 🎮 How to Use

1. **Customize** - Adjust the sliders and options to create your perfect crosshair
2. **Preview** - See real-time updates on the canvas
3. **Copy** - Click "Copy Command" to copy the generated console command
4. **Apply** - Open CS, press `~` to open console, paste and press Enter
5. **Share** - Use "Share URL" to share your crosshair with friends

## 🛠️ Development

This is a static web application built with:
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties and animations
- **Vanilla JavaScript** - No dependencies, pure JS
- **Canvas API** - For crosshair rendering

### Local Development

Simply clone and open `index.html` in your browser:

```bash
git clone https://github.com/CScrosshairCreator/cscrosshaircreator.github.io.git
cd cscrosshaircreator.github.io
# Open index.html in your browser
```

### Project Structure

```
.
├── index.html      # Main HTML structure
├── style.css       # Styles and themes
├── script.js       # Application logic
├── favicon.svg     # Site icon
└── README.md       # This file
```

## 🎯 CS Console Commands

The generator creates commands compatible with both CS:GO and CS2:

- `cl_crosshairsize` - Size of crosshair lines
- `cl_crosshairgap` - Gap from center
- `cl_crosshairthickness` - Line thickness
- `cl_crosshairalpha` - Opacity (0-255)
- `cl_crosshair_drawoutline` - Enable/disable outline
- `cl_crosshair_outlinethickness` - Outline thickness
- `cl_crosshaircolor` - Color mode (5 = custom RGB)
- `cl_crosshaircolor_r/g/b` - RGB color values
- `cl_crosshairstyle` - Crosshair style
- `cl_crosshairdot` - Center dot toggle

## 🌟 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your favorite crosshair presets

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Acknowledgments

- Pro player crosshair settings from various community sources
- Inspired by the Counter-Strike community
- Built with ❤️ for CS players worldwide

---

**Made for the CS community** | [Report an Issue](https://github.com/CScrosshairCreator/cscrosshaircreator.github.io/issues)