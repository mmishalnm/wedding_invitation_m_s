# Validation — 19 October 2026

- Next.js 16.4.2 production build: PASS (webpack, Node 24.19.0).
- TypeScript strict check: PASS.
- Automated tests: 4/4 PASS (IST/UTC times, provider links, UTF-8 ICS folding, guest normalization).
- Production HTTP: homepage 200; calendar 200 text/calendar; Open Graph 200 image/png; Wallet status 200; missing-credential pass request 503 as designed.
- Browser: welcome screen and opened invitation visually inspected; opening, floating navigation, calendar disclosure and missing-credential Wallet fallback verified at a 689px-wide viewport. Map embed loaded and QR appeared.
- Not verified: physical iPhone/Android/tablet rendering; calendar import inside real calendar accounts; native OS sharing; production WhatsApp preview; valid Apple certificate signing and Wallet installation.
- No deployment performed: deliverable is runnable Next.js source for Vercel/Node hosting.
- Remaining dependency advisory: node-forge 1.4.0 RSA verification advisory, also reported transitively against passkit-generator. No patched node-forge version available at validation time. Joi was updated through an override to 17.13.8. See README for scope and release review.
