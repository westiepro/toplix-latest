# Hero Image Setup

To add your hero image:

1. **Place your villa image** in this folder (`public/`)
2. **Name it:** `hero-villa.jpg` (or update the filename in `app/page.tsx`)
3. **Supported formats:** .jpg, .jpeg, .png, .webp

## Quick Steps:

1. Get your villa image file
2. Copy it to: `/Users/christian/Desktop/toplix-new/public/hero-villa.jpg`
3. Restart your Next.js dev server (if running)
4. The image will appear automatically!

## If using a different filename:

Edit `app/page.tsx` line 12 and change:
```typescript
backgroundImage: 'url(/hero-villa.jpg)',
```
to:
```typescript
backgroundImage: 'url(/your-filename.jpg)',
```
