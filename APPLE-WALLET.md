# Apple Wallet certificate configuration

The implementation generates a real signed `.pkpass` with `passkit-generator`, eventTicket fields, PNG artwork, invitation QR, manifest and PKCS#7 signature. Signing keys only exist on the server. No user-uploaded files or certificates are accepted.

## Obtain certificates

1. Join the Apple Developer Program. In Certificates, Identifiers & Profiles register a Pass Type ID, for example `pass.com.yourdomain.wedding`.
2. Create a certificate signing request using Keychain Access on your Mac. Keep its corresponding private key.
3. Create a **Pass Type ID Certificate** associated with that identifier and CSR. Download and import it into Keychain Access.
4. Export the certificate **with its private key** as a password-protected `.p12`. Store it outside the project.
5. Download the matching Apple Worldwide Developer Relations intermediate certificate from Apple's certificate authority page. Choose the intermediate that issued your signing certificate; do not blindly use an older WWDR generation.
6. Note your Team ID from Apple Developer membership. The Team ID and Pass Type ID must match the signing certificate.

Official references:
- https://developer.apple.com/help/account/capabilities/create-wallet-identifiers-and-certificates
- https://www.apple.com/certificateauthority/
- https://developer.apple.com/documentation/walletpasses
- https://github.com/alexandercerutti/passkit-generator/wiki/Generating-Certificates

## Convert to PEM

Run these in a private directory outside the source checkout. OpenSSL prompts for passwords; do not put passwords in shell arguments/history.

```sh
openssl pkcs12 -in pass-certificate.p12 -clcerts -nokeys -out signerCert.pem
openssl pkcs12 -in pass-certificate.p12 -nocerts -out signerKey.pem
openssl x509 -inform DER -in AppleWWDR.cer -out wwdr.pem
```

For old PKCS#12 exports OpenSSL 3 may require `-legacy`. The key remains encrypted; set `APPLE_SIGNER_KEY_PASSPHRASE` to the encryption passphrase. Do not commit PEM, P12, key files or `.env.local`.

Encode each **whole PEM file** as base64. For example `openssl base64 -A -in signerCert.pem` (output is sensitive configuration; place it directly in your secret manager). Base64 is encoding, not encryption.

| Variable | Value |
| --- | --- |
| APPLE_PASS_TYPE_ID | Registered pass identifier |
| APPLE_TEAM_ID | Apple Developer Team ID |
| APPLE_SIGNER_CERT_BASE64 | Base64 PEM signing certificate |
| APPLE_SIGNER_KEY_BASE64 | Base64 encrypted PEM private key |
| APPLE_SIGNER_KEY_PASSPHRASE | Private-key encryption password |
| APPLE_WWDR_CERT_BASE64 | Base64 PEM matching intermediate |
| NEXT_PUBLIC_SITE_URL | Public HTTPS invitation origin |

Restart/redeploy after setting these. Never add `NEXT_PUBLIC_` to signing credentials.

## Verify

- `/api/wallet?status` returns `{ "available": true }` when required values are present. This is a configuration-presence check, not certificate validation.
- Open `/api/wallet` on iPhone Safari; a successful result uses `application/vnd.apple.pkpass` and opens the Wallet installation sheet.
- If generation fails, the API returns a generic 500 message. Check certificate expiry, PEM encoding, matching private key, passphrase, Team ID, Pass Type ID and WWDR issuer. Do not log secrets while diagnosing.
- Inspect the pass fields and QR after installation. The QR is an invitation link, not an admission credential.
- The event expires at reception end. No guest-specific credentials, entry scanning, registration or automatic pass updates are claimed.

Credential-free tests only cover the unavailable branch. Actual Apple trust-chain and device installation validation must happen with your valid certificates.
