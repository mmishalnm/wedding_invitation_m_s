# Mohammed Mishal & Sidhra — Wedding Invitation

A production-ready Next.js invitation inspired by the family's physical maroon-and-gold wedding card. It includes a cinematic Islamic arch opening, a consistent bride-and-groom illustration, family and Nikah details, timezone-safe countdown, calendar exports, venue directions, QR codes, personalized guest names, sharing controls and a downloadable high-resolution invitation image.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For a production check:

```sh
npm test
npm run typecheck
npm run build
npm start
```

If the local file watcher reaches the macOS open-file limit, use:

```sh
WATCHPACK_POLLING=true npm run dev -- --webpack --hostname 0.0.0.0
```

## Customize

Wedding details live in `src/lib/wedding-config.ts`. The reception timestamps include the `+05:30` offset, so the countdown and calendar exports remain correct internationally. The event is 29 December 2026, 11:30 AM–2:30 PM IST, which converts to 06:00–09:00 UTC.

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before deployment. It controls canonical metadata, invitation QR codes and shared links. Optional guest personalization uses `/?guest=Ayesha%20and%20Family`. Guest input is trimmed, stripped of control and bidi characters, limited to 80 characters and rendered as escaped React text. Shared links intentionally omit personalized guest parameters.

The supplied Hijri date `18 Rajab 1448 AH` remains marked `locallyConfirmed: false`. Confirm it with the family's intended Kerala/local religious calendar before launch.

Optional music can be enabled with `NEXT_PUBLIC_AUDIO_URL`. Music never autoplays and requires a guest action. No recording is bundled.

## Key files

- `src/components/Invitation.tsx`: welcome, illustrated couple, family details, countdown, QR, calendar, directions, sharing and closing sections.
- `src/lib/wedding-config.ts`: centralized wedding content and theme values.
- `src/lib/calendar.ts`: provider links and standards-compliant `.ics` generation.
- `src/app/api/calendar/route.ts`: downloadable calendar event.
- `src/app/opengraph-image.tsx`: generated maroon-and-gold social preview.
- `public/images/wedding-couple.png`: reusable transparent couple illustration generated for this project.
- `public/images/wedding-invitation-card.png`: downloadable high-resolution invitation card supplied by the family.
- `tests/calendar.test.ts`: timezone, provider-link, UTF-8 folding and guest sanitization checks.

The project intentionally contains no Apple Wallet implementation, paid API, or commercial credential requirement. Apple Calendar is supported through the standard `.ics` download.

## Deploy to Vercel

1. Push this source to a Git repository and import it as a Next.js project in Vercel.
2. Select Node.js 24 or another supported Node version at least 20.9.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. Add `NEXT_PUBLIC_AUDIO_URL` only if you have a licensed audio file.
4. Deploy and verify `/`, `/opengraph-image` and `/api/calendar`.
5. Test the final public URL on iPhone Safari and Android Chrome, import the calendar event, open Google Maps, download the invitation image and send one WhatsApp preview before distribution.

Other Node hosts can run `npm ci && npm run build`, followed by `npm start` behind HTTPS. No paid Google Maps API key is used; the map preview uses a standard embed query, while directions and the location QR use the supplied Maps link.

## Launch checks

Build and automated results are recorded in `VALIDATION.md`. Before public distribution, confirm the venue, local Hijri date, public origin, downloadable card details, physical mobile layouts and social previews.
