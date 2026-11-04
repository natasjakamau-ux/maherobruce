# Bruce Mahero website deployment checklist

This project is a static HTML, CSS and JavaScript site with no build step or custom backend. The contact form uses an external FormSubmit service.

## Before upload

1. Confirm the exact `.co.ke` domain and whether the preferred address uses `www`.
2. Replace `REPLACE-WITH-CONFIRMED-DOMAIN.co.ke` in `sitemap.xml` and `robots.txt` with that exact host. Do not upload the placeholder values.
3. Add a canonical link to each HTML page using the chosen HTTPS host and that page's final path. Canonical links are intentionally absent until the host is known.
4. Review the source-confirmation items in `CONTENT-CHECKLIST.md`, especially the article's outlet/date/direct URL and the award-winning feature's title, publication, date and direct URL.

## Upload through DirectAdmin

The homepage file is `index.html`. Upload `index.html`, the `pages` folder containing the other five HTML pages, `style.css`, `script.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`, and the complete `data` and `images` folders to the domain's document root (usually `public_html`). Preserve the folder and filenames so relative paths continue to work.

### Git deployment

If Git Deployment is enabled for the hosting account, create a Git repository for this project, commit the reviewed site files, add the hosting-provided remote, push the configured branch, and set the deployment target to the domain's document root. Confirm the host's required branch and directory in DirectAdmin before deployment. No Git remote is configured in this project yet.

## Deploy to Cloudflare Pages

The site is static and needs no build step. Connect the GitHub repository in Cloudflare Pages, use the repository root as the root directory, leave the build command empty, and set the build output directory to `.`. Ensure the `data` and `images` folders are committed alongside the site's existing files.

The GitHub repository currently keeps all six HTML pages at its root, while this local project keeps the five secondary pages in `pages/`. To preserve existing public URLs and avoid overwriting the repository's root pages with a different layout, restore only the missing `data` and `images` folders from this local project unless a page-URL migration is explicitly intended.

Before using a custom domain, replace the domain placeholders in `robots.txt` and `sitemap.xml` as described above. Cloudflare Pages can serve the site before that SEO configuration is complete.

### SFTP or FTP

If using a transfer client, prefer SFTP if the hosting account offers it. Upload the project files, including the `pages`, `data` and `images` folders, to the same document root. Use FTPS if only FTP-based access is available and the provider supports it. Do not put passwords or private keys in this project.

## After DNS and SSL are ready

1. Confirm DNS points the domain to the hosting account and issue/enable its Let's Encrypt certificate in DirectAdmin.
2. Open the HTTPS homepage and each page directly (the other pages are under `/pages/`). Check the browser's certificate/security indicator, images, navigation, mobile menu, gallery viewer, email link and social links.
3. Confirm the non-preferred `www` or non-`www` host redirects to the chosen HTTPS host. Configure this with the hosting panel only after DNS and SSL are working.
4. Open `/robots.txt` and `/sitemap.xml` on the production host and confirm they contain the final domain.
5. Create or verify the domain property in Google Search Console, complete domain ownership verification with the DNS TXT record, submit `/sitemap.xml`, and use URL Inspection on the homepage and important pages. Indexing and search presentation are controlled by Google and are not guaranteed.

## Contact email and form

The contact page submits through the configured FormSubmit endpoint. Confirm the delivery address and provider activation, then test delivery and spam controls after deployment. The site does not include a custom server-side form handler.
