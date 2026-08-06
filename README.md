# Online Notepad by Biswajit Nandi

A free, lightweight, and beautifully designed online notepad for writing, saving, and organizing notes instantly. No account needed, no ads, no distractions. Works offline with auto-save and local storage.

**Created by:** [Biswajit Nandi (bjnandi)](https://bjnandi.dev)  
**Domain:** [notepad.bjnandi.dev](https://notepad.bjnandi.dev)

## Overview

**Online Notepad** is a fully free and open-source note-taking application built with vanilla JavaScript, HTML, and CSS. It provides a distraction-free writing experience with automatic local storage and offline support. Features:

- ✍️ **Lightweight & Fast** - Minimal dependencies, instant load times (< 1 second)
- 💾 **Local Storage** - All notes saved locally on your device, no cloud account or external server needed
- 🌐 **Works Offline** - Complete offline functionality with Service Worker support
- 📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile devices
- 🎨 **Beautiful Design** - Modern UI with smooth animations and decorative accents
- 📑 **Multi-Document Support** - Create and manage multiple notes simultaneously in tabs
- ⌨️ **Keyboard Shortcuts** - Quick commands for power users
- ♿ **Accessible** - WCAG 2.1 AA compliant, built for screen readers and keyboard navigation
- 📊 **Live Statistics** - Real-time word, line, and character counting
- 🔄 **Auto-Save** - Automatic draft saving with visual feedback
- 🔒 **Private & Secure** - 100% private, no data collection or tracking

## Features

### Core Features

- **Create & Manage Notes** - Create new notes, rename documents, and organize multiple tabs
- **File Operations**
  - Open `.txt`, `.md`, or `.text` files from your device
  - Download notes as `.txt` files
  - Copy all text to clipboard with one click
- **Local Storage** - All notes are automatically saved to your browser's local storage
- **Live Statistics** - Real-time word, line, and character counting
- **Auto-Save** - Changes are automatically saved with visual save state indicator
- **Responsive Design** - Optimized for all screen sizes from mobile to desktop

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` / `Cmd+S` | Download current note |
| `Ctrl+O` / `Cmd+O` | Open a text file |

## How to Use

### Getting Started

1. Visit [Online Notepad by Biswajit Nandi](https://notepad.bjnandi.dev)
2. Start typing instantly - no login required
3. Enter a title for your note in the title field
4. Your notes are automatically saved to your browser's local storage
5. Works offline - use it even without internet connection

### Managing Documents

- **New Document** - Click the `+` button or use the new document feature
- **Open File** - Click the `O` button to open a `.txt`, `.md`, or `.text` file
- **Save Document** - Click the `S` button to download your note as a `.txt` file
- **Copy Text** - Click the `C` button to copy all text to clipboard
- **Switch Documents** - Click tabs to switch between open notes
- **Close Document** - Click the `x` on a tab to close that note (only when multiple documents are open)

## SEO & Technical Details

### Search Engine Optimization

This application is fully optimized for search engines and AI crawlers:

- **50+ Meta Tags** - Comprehensive SEO meta tags for better indexing
- **5 JSON-LD Schemas** - Structured data for rich snippets and featured snippets
- **FAQ Schema** - 8 frequently asked questions for AI and search engines
- **Mobile-Friendly** - Fully responsive and mobile-optimized
- **Performance** - Optimized for Core Web Vitals and fast load times
- **Semantic HTML** - Proper semantic structure for content understanding
- **Accessibility** - WCAG 2.1 AA compliant for better indexing
- **AI-Friendly** - Allows AI crawlers (GPTBot, Claude, CCBot, etc.)
- **Open Graph** - Optimized social media sharing
- **Twitter Card** - Enhanced Twitter preview cards

### Creator Information

- **Created by:** Biswajit Nandi (bjnandi)
- **Personal Website:** https://bjnandi.dev
- **GitHub:** [bjnandi on GitHub](https://github.com/bjnandi)

## Technology Stack

- **Frontend** - Vanilla JavaScript (no frameworks)
- **Styling** - Modern CSS with custom properties and responsive design
- **Storage** - Browser LocalStorage API
- **Browser Support** - All modern browsers (Chrome, Firefox, Safari, Edge)

### Browser Compatibility

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)

### Performance

- **Initial Load Time** - < 1 second
- **File Size** - ~12 KB (HTML + CSS + JS combined)
- **Memory Usage** - Minimal, optimized for low-resource devices

## Features for Power Users

### Local Storage

Your notes are stored in your browser's Local Storage using the `notepad-app-tabs` key. To export all your data:

1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Find `notepad-app-tabs` entry
4. Copy the data and save it somewhere safe

### Legacy Migration

If you used an older version, your data is automatically migrated to the new storage format.

## Accessibility

This application is built with accessibility in mind:

- **Semantic HTML** - Proper heading hierarchy and semantic elements
- **ARIA Labels** - Comprehensive ARIA labels for all interactive elements
- **Keyboard Navigation** - Full keyboard support for all features
- **Screen Reader Support** - Optimized for screen readers like NVDA, JAWS, and VoiceOver
- **Color Contrast** - WCAG AA compliant color contrasts
- **Focus Management** - Clear visual focus indicators

## SEO & AI-Friendly

This application is fully optimized for search engines and AI indexing:

- **Structured Data** - JSON-LD schema markup for rich snippets
- **Meta Tags** - Comprehensive SEO meta tags including Open Graph and Twitter Card
- **Semantic HTML** - Proper semantic structure for better understanding
- **Accessible Content** - Accessible to AI crawlers and screen readers
- **Mobile-Friendly** - Responsive design for all devices
- **Performance** - Optimized for fast load times and Core Web Vitals

## File Structure

```
online-notepad/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript application logic
├── favicon.svg         # Application icon
├── README.md           # This file
├── robots.txt          # Search engine crawler directives
├── sitemap.xml         # XML sitemap for indexing
└── CNAME               # Custom domain configuration
```

## Development

### Development

1. Clone the repository:
   ```bash
   git clone https://github.com/bjnandi/online-notepad.git
   cd online-notepad
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using Node.js (serve)
   npx serve
   ```

3. Visit `http://localhost:8000` in your browser

### Customization

All colors and styling can be customized by editing the CSS custom properties in `styles.css`:

```css
:root {
  --bg: #f4c84c;           /* Primary background */
  --paper: #fff3a6;        /* Editor background */
  --text: #272014;         /* Text color */
  --accent: #1685a5;       /* Accent color */
  /* ... more variables ... */
}
```

## Privacy & Data Security

- **100% Private** - Your notes never leave your device
- **No Tracking** - Zero analytics or user tracking
- **No Cloud Storage** - Not stored on any external server
- **No Data Collection** - We don't collect, store, or transmit any of your data
- **Browser-Based** - Works entirely in your browser
- **Offline Capable** - Full functionality without internet connection
- **Open Source** - Code is transparent and auditable

## SEO & Technical Details

## Contributing

Contributions, bug reports, and feature suggestions are welcome! Please:

- Report bugs via GitHub Issues
- Suggest improvements and features
- Submit pull requests for enhancements
- Share feedback and ideas

## License

This project is open source. Check the LICENSE file for details.

## Support & Contact

- **Website:** https://bjnandi.dev
- **GitHub:** https://github.com/bjnandi
- **Email:** Contact via bjnandi.dev

---

**Online Notepad** by Biswajit Nandi  
*Write freely, save locally, zero distractions.*  
Visit: [notepad.bjnandi.dev](https://notepad.bjnandi.dev)
