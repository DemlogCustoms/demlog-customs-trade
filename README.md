# Demlog Customs & Trade website

A bilingual, static-first Canadian customs brokerage website with English and French routes, responsive forms, service pages, resources, accessibility features and a truthful Descartes tracker scaffold.

## Windows local preview

1. Install the current Node.js LTS release from nodejs.org.
2. Extract or clone this project and open PowerShell in the project folder.
3. Run `npm install`.
4. Run `npm run dev`, then open the displayed local URL.
5. Stop the server with `Ctrl+C`.
6. Run `npm run build` for production output.
7. Run `npm run preview` if the final hosting adapter provides that command; in this Sites checkout use `npm start` after building.

## Netlify preview

The recommended reproducible method is to place the project in GitHub, create a Netlify site from that repository, set the build command to `npm run build`, and use the generated `dist` folder. For drag-and-drop, run the production build first and upload `dist`. Because this project uses a server-compatible Next/Vinext adapter, verify Netlify runtime compatibility before replacing Shopify; if Netlify requires its official Next.js adapter, connect the repository rather than drag-and-drop.

In Netlify, enable form detection and configure verified submission notifications to `berdan.demirel@demlogct.com`. Test every form and thank-you state. Environment-variable names are documented in `.env.example`; never commit real secrets.

## Migration

Back up Shopify theme, content, redirects and DNS. Crawl existing URLs, preserve useful article paths and add 301 redirects for every changed URL. Keep Shopify active until the new site, forms, redirects, canonical tags and both languages are verified. Website hosting changes must preserve every email-related DNS record.

See `docs/launch-checklist.md` and `docs/seo-content-map.md` for the launch, privacy, measurement, security and content requirements.
