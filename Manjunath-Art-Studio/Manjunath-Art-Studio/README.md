# Manjunath Art Studio

Source code recovered and organized from the `chart.zip` archive downloaded from Lovable.

## Stack
- React 19
- TypeScript
- TanStack Start / TanStack Router
- Tailwind CSS
- Vite

## Run locally
Install Node.js, then open a terminal in this folder and run:

```bash
npm install
npm run dev
```

## Important: image assets were not included in the uploaded archive
The downloaded archive referenced nine Lovable asset manifests (`artist.jpg.asset.json` and `artwork-01` through `artwork-08`) but did not contain those files or the original image files. Empty asset manifests were added so the imports have corresponding files, but artwork images and the artist photo will need to be re-exported from Lovable and restored to `src/assets/` to display the original images. Until then, the site's image components may show their fallback placeholders.

## Folder layout
- `src/routes/` — TanStack Start routes
- `src/components/` — site components
- `src/components/ui/` — reusable UI components
- `src/lib/` — app utilities, localization, and site configuration
- `src/lib/artwork/` — artwork and category data
- `src/assets/` — asset manifests (original images missing from download)
- `public/` — public static files
- `docs/` — project planning notes included in the archive

This archive is organized from the files supplied in `chart.zip`; it has not been run through a dependency install or production build in this environment.
