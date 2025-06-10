# Ripply Waitlist Page

A beautiful, animated waitlist page for the Ripply voice notes app, featuring ripple-themed animations, multilingual support (Japanese/English), and email signup functionality.

## 🚀 Features

- **Stunning Animations**: Canvas-based wave background with ripple effects
- **Multilingual Support**: Japanese and English language switching
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Responsive Design**: Works perfectly on all devices
- **Framer Motion**: Smooth animations and transitions
- **Waitlist Form**: Email collection with validation
- **Optimized Performance**: Fast loading and smooth animations

## 🎨 Design Highlights

- **Ripple-themed animations** that reflect the app's voice notes concept
- **Purple gradient background** matching the Ripply brand
- **Animated floating elements** for visual appeal
- **Click ripple effects** on interactive elements
- **Smooth language transitions** with persistent storage

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **shadcn/ui** components

## 📦 Installation

1. Clone or download this standalone folder
2. Install dependencies:
   ```bash
   npm install
   ```

## 🔧 Development

Start the development server:
```bash
npm run dev
```

This will start the app on `http://localhost:3000`

## 🏗️ Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🚀 GitHub Pages Deployment

This project is configured for easy deployment to GitHub Pages:

### Setup Steps:

1. **Create a new GitHub repository** for this standalone page
2. **Update the configuration** in these files:
   - `vite.config.ts`: Change `base: '/ripply-waitlist/'` to your repo name
   - `package.json`: Update the `homepage` field to your GitHub Pages URL
   - `index.html`: Update meta tag URLs to match your domain

3. **Push your code** to the repository
4. **Install dependencies** and deploy:
   ```bash
   npm install
   npm run deploy
   ```

### Automatic Deployment:

The `npm run deploy` command will:
- Build the project
- Deploy to the `gh-pages` branch
- Make it available at `https://yourusername.github.io/repo-name`

### Manual Deployment:

Alternatively, you can:
1. Run `npm run build`
2. Upload the `dist` folder contents to GitHub Pages
3. Configure GitHub Pages to serve from the root or docs folder

## 🎨 Customization

### Changing Colors:
The main brand color is defined in multiple places:
- Tailwind CSS classes: `purple-600`, `purple-900`, etc.
- Inline styles: `#6B2FBC`, `#6366F1`, etc.

### Adding Languages:
1. Add language to `src/lib/i18n/types.ts`
2. Create translation file in `src/lib/i18n/locales/`
3. Update `src/lib/i18n/index.ts`
4. Add to language switcher options

### Modifying Animations:
- Canvas animations: `WaveBackground` component
- Ripple effects: `RippleEffect` component
- UI animations: Framer Motion props throughout

## 📁 Project Structure

```
ripply-waitlist/
├── public/
│   └── logo_transparent.png    # App logo
├── src/
│   ├── components/
│   │   └── ui/                 # Reusable UI components
│   │   └── LanguageContext.tsx # i18n context
│   ├── lib/
│   │   ├── i18n/              # Translation system
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                # Main application
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📱 Mobile Support

Fully responsive design that works beautifully on:
- Mobile phones
- Tablets
- Desktop computers

## 🎯 Performance

- **Fast loading** with Vite optimization
- **Smooth animations** with canvas rendering
- **Efficient re-renders** with React best practices
- **Optimized assets** with automatic compression

## 🛡️ Security

- **Input validation** on email forms
- **XSS protection** with React's built-in sanitization
- **HTTPS ready** for production deployment

## 📄 License

This project is part of the Ripply app ecosystem. Please respect intellectual property rights.

## 🤝 Contributing

This is a standalone promotional page. For the main Ripply app development, please refer to the main repository.

## 📞 Support

For questions about this coming soon page or the Ripply app, please contact the development team.

---

**Built with ❤️ for the Ripply community** 