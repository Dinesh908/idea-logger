# Idea Logger

A clean, Notion-inspired app for logging and organizing ideas. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✨ **Add & Edit Ideas** - Create and manage your ideas with rich content
- 🏷️ **Categories & Tags** - Organize ideas with custom categories and tags
- 📦 **Archive** - Archive old ideas to keep your workspace clean
- 🔍 **Search** - Quickly find ideas by title, content, or tags
- 📱 **Responsive Design** - Works beautifully on all devices
- 💾 **Local Storage** - All data is stored locally in your browser

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Netlify

This app is optimized for easy deployment on Netlify:

### Method 1: Netlify UI (Easiest - Recommended)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in (or create a free account)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub account and select your repository
5. Netlify will automatically detect Next.js and fill in the settings from `netlify.toml`:
   - **Build command**: `npm run build` (auto-filled)
   - **Publish directory**: `.next` (auto-filled)
   - **Node version**: 18 (auto-filled)
6. Click "Deploy site" - that's it! 

**The app will be live in about 2-3 minutes!** No additional configuration needed - the `netlify.toml` file handles everything automatically.

### Method 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

The app is pre-configured with `netlify.toml`, so deployment is automatic!

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **LocalStorage** - Data persistence

## License

MIT

# idea-logger
