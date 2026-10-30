# Pads Worship web

Static, bilingual website for [padsworship.com](https://padsworship.com), built with Next.js and exported for GitHub Pages.

## Local development

```bash
npm install
npm run catalog:refresh
npm run dev
```

The catalog refresh reads the public Supabase configuration from the Android project at `~/AndroidStudioProjects/PadsWorshipNew` by default. It can also use `PADSWORSHIP_SUPABASE_URL` and `PADSWORSHIP_SUPABASE_ANON_KEY`.

## Production build

```bash
npm run build:production
```

The static export is written to `out/`.
