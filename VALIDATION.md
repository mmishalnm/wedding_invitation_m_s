# Validation

## Automated

- Production build: PASS with Next.js 16.4.2 and Webpack.
- TypeScript strict check: PASS.
- Automated tests: 4/4 PASS.
- Calendar tests cover the 11:30 AM–2:30 PM IST event as 06:00–09:00 UTC, provider links, UTF-8 `.ics` folding and guest sanitization.

## Visual and functional scope

- Warm-white stationery, antique-gold typography, sage-and-coral watercolor florals and save-the-date calendar based on the newly supplied invitation references.
- Watercolor wreath opening and hero, family details in the invitation letter, Nikah announcement, reception card and animated countdown.
- Google, Outlook and Apple/standard `.ics` calendar actions.
- Google Maps directions, location QR and copy-location action without a paid Maps API.
- WhatsApp, copied link, native share, invitation QR download and high-resolution invitation-card download.
- `?guest=GuestName` personalization remains sanitized and optional.
- Apple Wallet and its credential/dependency path were removed.

Physical iPhone/Android testing, production WhatsApp preview caching and imports into real calendar accounts remain launch checks.

Dependency audit after removing the Apple Wallet stack: 0 known vulnerabilities reported by npm on 19 October 2026.
