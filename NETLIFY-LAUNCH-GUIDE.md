# Demlog Netlify launch guide

This package contains the complete Demlog Customs & Trade Inc. website configured for Netlify's native Next.js deployment.

## What you need before starting

No corporate, customs-broker or identity documents are normally required to publish the site. Have these access items ready:

- This source-code package.
- A Netlify account.
- A GitHub account and private repository.
- Shopify administrator access with permission to manage `demlogct.com` DNS.
- Access to the domain registrant/owner email address.
- A screenshot or export of every current DNS record, especially MX, SPF, DKIM and DMARC records used for email.
- A payment method only if the selected Netlify plan or registrar requires one.

An authorization/EPP code is required only if the domain registration itself will be transferred away from Shopify. It is not required when pointing the domain to Netlify.

## Recommended publishing method

Use a private GitHub repository rather than Netlify's manual drag-and-drop deployment. Git-based deployment preserves the full Next.js application and makes future updates safer.

1. Create a private GitHub repository named `demlog-customs-trade`.
2. Upload the contents of this package to the repository root. Do not upload the enclosing folder as an extra level.
3. In Netlify, select **Add new project → Import an existing project → GitHub**.
4. Select the private repository.
5. Confirm the build command is `npm run build`. Leave the publish directory blank so Netlify's Next.js adapter can configure it.
6. Deploy the project and test the temporary `netlify.app` address before changing the domain.

## Enable forms and email notifications

1. In Netlify, open **Forms** and select **Enable form detection**.
2. Trigger a fresh deployment.
3. Confirm that the English and French clearance, contact, onboarding and international-trade forms appear.
4. Go to **Project configuration → Notifications → Emails and webhooks → Form submission notifications**.
5. Add an email notification for `berdan.demirel@demlogct.com`, applying it to all verified submissions.
6. Submit one test through every English and French form. Confirm receipt in both the inbox and spam folder.

## Connect the domain while keeping Shopify as registrar

This is the recommended approach. The domain registration does not need to move away from Shopify.

1. In Netlify, open **Domain management → Add domain → Add a domain you already own** and enter `demlogct.com`.
2. Netlify will add both `demlogct.com` and `www.demlogct.com` and display the exact DNS records it expects.
3. In Shopify, open **Settings → Domains → demlogct.com → DNS settings → Manage**.
4. Before changing anything, screenshot or export every existing DNS record.
5. Preserve all MX, SPF, DKIM, DMARC and email-verification records.
6. Change only the website records requested by Netlify. Usually this means:
   - Apex/root host `@`: A record to `75.2.60.5`, unless Netlify shows a different customized value.
   - `www`: CNAME to the exact `your-site.netlify.app` hostname displayed by Netlify.
   - Remove a conflicting Shopify AAAA record only if Netlify identifies it as a conflict.
7. Wait for DNS verification and HTTPS provisioning. DNS changes can take up to 24–48 hours.
8. Test `https://demlogct.com`, `https://www.demlogct.com`, both languages, forms, PARS links and email delivery.

## Protect business email

Do not delete or replace MX, SPF, DKIM, DMARC or mail-provider verification records. Changing the A record and `www` CNAME does not normally require moving the email service.

## If you truly want to transfer the registrar away from Shopify

This is optional and should be done after the Netlify site is stable.

1. Confirm the domain is eligible for transfer and that its registrant email is accessible.
2. Unlock the domain in Shopify and request the authorization/EPP code.
3. Start the inbound transfer with a registrar such as Cloudflare Registrar, Porkbun or another provider that supports the domain extension.
4. Enter the authorization code and approve the confirmation email.
5. Recreate and verify every DNS record at the new DNS provider before changing nameservers.

Registrar transfers can be blocked for approximately 60 days after initial registration, a previous transfer or certain registrant-information changes. Netlify hosting does not require a registrar transfer.

## Launch order and rollback

Keep the Shopify storefront live until the Netlify temporary address passes testing. If the custom-domain launch fails, restore only the old Shopify website A/AAAA/CNAME records from the screenshots; leave email records untouched.
