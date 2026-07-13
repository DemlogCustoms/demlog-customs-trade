# Demlog launch checklist

## Owner confirmation required

- Confirm whether the first two shipments are free.
- Confirm official business hours and the exact after-hours response commitment.
- Confirm whether clients may attend the LaSalle mailing address.
- Confirm Berdan Demirel’s public title, biography and photograph permission.
- Supply only genuine testimonials and case studies, if available.
- Confirm excluded industries and direct experience with regulated categories.
- Confirm non-resident importer and post-entry service scope.
- Select an approved secure-document portal; public forms intentionally reject sensitive documents.
- Confirm the privacy officer, email provider, domain registrar and existing measurement accounts.
- Obtain an approved Descartes API or embedding agreement. Current status: external-link fallback only.
- Verify the public LinkedIn company URL before enabling the icon.

## DNS and domain safety

1. Export or screenshot every current DNS record before changing anything.
2. Preserve MX, SPF, DKIM, DMARC and all email-verification records exactly.
3. Change only the website A/AAAA/CNAME records required by the chosen host.
4. Connect both `demlogct.com` and `www.demlogct.com`, then enable HTTPS.
5. Test sending and receiving at `berdan.demirel@demlogct.com` before and after DNS changes.
6. Keep Shopify available until the replacement routes, forms and redirects are verified.
7. Roll back only the changed website records if the launch fails.

## Forms

On Netlify, enable form detection, deploy once, then open **Forms** and confirm each English and French form appears. Open **Project configuration → Notifications → Form submission notifications → Add notification → Email notification**, choose all forms or the relevant forms, and enter `berdan.demirel@demlogct.com`. Save, submit a realistic test from each form, and verify both the inbox and spam folder. Inspect verified and spam submissions in Netlify. Keep the honeypot enabled. Add Turnstile only after the site and secret keys are configured. Do not enable document uploads without an approved secure portal.

## Search and measurement

Verify Google Search Console, submit `https://demlogct.com/sitemap.xml`, inspect `/en`, `/fr`, `/en/pricing` and high-value services, validate structured data, and monitor indexing, 404s and Core Web Vitals. Add real GTM/GA4/Google Ads IDs only after consent behaviour is tested. Configure conversions for form submissions, quote requests, onboarding, phone clicks and outbound PARS-checker clicks.

## Google Business Profile

Do not present the home mailing address as a public storefront unless customers are genuinely served there during stated hours and every eligibility requirement is met. Do not create fake Toronto, Vancouver, Calgary or other office locations.

## Accessibility and security QA

- Keyboard-test navigation, menus, forms and tracker.
- Test 200% zoom and mobile widths without horizontal scrolling.
- Confirm form labels, errors, focus indicators and colour contrast.
- Run dependency audit and Lighthouse before production launch.
- Confirm security headers at the final host.
- Verify analytics stays off until required consent.

## Threat-model summary

Honeypots, validation and host-level rate limiting reduce form spam and email injection. File upload is disabled to avoid malicious files. React escaping and a restrictive CSP reduce XSS risk. Secrets belong only in server environment variables. Dependency auditing addresses vulnerable packages. PARS requests must be validated, rate-limited and never logged with complete identifiers. Analytics collection should remain minimal and consent-controlled.
