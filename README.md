# Mohammed Mishal & Sidhra — Wedding Invitation

A complete Next.js App Router invitation with React, TypeScript, Tailwind CSS 4, Motion, Lucide, QR codes, calendar exports, and a server-side Apple Wallet signing endpoint.

## Run locally

Use Node.js 20.9+ (Node 24 LTS recommended).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. For a production server:

```sh
npm test
npm run typecheck
npm run build
npm start
```

## Customize

Edit `src/lib/wedding-config.ts`: couple, hosts, families, Nikah, reception timestamps, venue, contacts, greetings/sign-off data and theme palette. Colors are styled through matching variables in `src/app/globals.css`. Reception timestamps include the +05:30 offset, so countdowns and exports remain correct internationally. Start/end convert to **2026-12-29 06:00 / 09:00 UTC**. Calendar UID stays stable across downloads; whether an import replaces or duplicates an existing entry depends on the calendar application.

Set `NEXT_PUBLIC_SITE_URL` to your deployed HTTPS origin before building. It controls canonical metadata, Open Graph, invitation QR codes, sharing and Wallet QR. Guest names (`/?guest=Ayesha%20and%20Family`) are trimmed, control-character filtered and length limited, then rendered as escaped React text. Shared links intentionally omit the guest parameter. No guest names are stored or logged by this application.

The requested Hijri date **18 Rajab 1448 AH** is retained and marked `locallyConfirmed: false`. Published conversion tables vary by calendar and moon sighting. Confirm with the family's intended Kerala/local religious calendar before launch, then set the flag true. The flag documents review; it does not silently alter the displayed date.

Optional music: add your own licensed instrumental file at `public/audio/reception.mp3` and set `NEXT_PUBLIC_AUDIO_URL=/audio/reception.mp3`. The audio control only appears when configured, and never autoplays. No third-party recording is bundled.

Google Fonts load with `display=swap` and local fallback fonts. The venue preview is a Google Maps text search; the Directions button and QR always use the exact supplied Maps short link. If the embed is blocked, its visible Google Maps link remains usable.

## Project map

- `src/components/Invitation.tsx`: reusable section, ornament, countdown, QR, calendar, Wallet and invitation components.
- `src/lib/wedding-config.ts`: wedding content and event formatting.
- `src/lib/calendar.ts`: provider links and RFC 5545-style CRLF/UTF-8-folded ICS.
- `src/lib/wallet.ts`: server-only event-ticket generation/signing.
- `src/app/api/calendar/route.ts`: downloadable calendar event.
- `src/app/api/wallet/route.ts`: signing route and safe availability endpoint.
- `src/app/opengraph-image.tsx`: generated 1200×630 preview.
- `public/wallet`: real PNG assets at Wallet-supported sizes.
- `tests/calendar.test.ts`: timezone, provider, folding and input tests.

## Apple Wallet setup

See **APPLE-WALLET.md** for certificate instructions. Without credentials the endpoint returns 503 with a calendar fallback; it never delivers a fake pass. An Apple device and valid Apple-issued certificates are required for the final installation check. The visual Wallet control is a styled text/icon button; replace it with Apple's official downloadable localized badge if brand approval requires the official badge artwork.

## Deploy to Vercel

1. Upload this source to your Git repository and import it in Vercel as a Next.js project.
2. Select Node.js 24 (or supported Node >=20.9), install with `npm ci`, build with `npm run build`.
3. Configure `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin. Add server-only Wallet values from APPLE-WALLET.md to the deployment environment secrets.
4. Deploy and verify `/`, `/opengraph-image`, `/api/calendar`, and `/api/wallet?status`.
5. Test the Wallet pass in iPhone Safari, and calendar imports in Apple/Google/Outlook. Test a real WhatsApp share after the public domain is reachable; preview crawlers cache results.

For other Node hosting, run `npm ci && npm run build`, then `npm start` behind an HTTPS reverse proxy. Include `public/wallet` in the deployment. Do not use static export or an edge-only host: pass signing needs the Node runtime. Add rate limiting to `/api/wallet` at the hosting edge before large public distribution. Identical general-invitation passes are cached in each process, with a stable serial number to avoid repeated installations. Redeploy after rotating certificates or editing pass data. No push-update service is configured or claimed.

## Verification and remaining launch checks

Build and automated tests are recorded in VALIDATION.md. Calendar logic and missing-credential behavior can be checked without an Apple account. Real Wallet installation cannot be validated without your certificate. Confirm the supplied venue and local Hijri date, add your public origin, and verify on physical iOS/Android devices before distributing.

Dependency review: Joi is overridden to patched 17.13.8. The current `node-forge` 1.4.0 used by `passkit-generator` has an upstream RSA signature-verification advisory (GHSA-86w9-cpqp-85rv); npm audit reports it directly and transitively through passkit-generator. No patched node-forge release was available during this build. This application signs fixed server-owned content and does not accept or verify user-supplied certificates/signatures, but the dependency warning remains unresolved. Review/update this dependency before production rollout.
