# gd-playlist-viewer

A simple, user-friendly web app for viewing and downloading videos from Google Drive links.

## Features

- Paste Google Drive links (one per line) to build a playlist
- Playlist persists in `localStorage`
- Play videos in a modal video player
- One-click downloads with a progress bar
- Optional Google Drive API metadata (filename, size, thumbnail) via API key

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS + Shadcn/UI (Radix primitives)
- Axios
- HLS.js (used automatically for `.m3u8` sources)

## Getting started

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## Environment variables

Copy `.env.example` to `.env`.

- `VITE_GOOGLE_API_KEY` (optional): enables fetching file metadata (name/size/thumbnail) using Google Drive API.

Note: Without an API key, the app still works for many publicly shared files, but metadata may show as unknown.
