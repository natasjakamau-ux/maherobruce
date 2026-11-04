# Bruce Mahero Website — Source Content Checklist

Internal traceability checklist for the supplied `BRUCE MAHERO 2026.docx`. Keep this review file out of the production `public_html` upload.

## Source handling

- The DOCX was read-only. Word had the original open, so a temporary read-only copy was used to inspect its body text and links.
- DOCX package metadata reports 8 pages. The earlier project request called it a 9-page document; no Word renderer was available to verify the rendered page count.
- Imperative text inside the DOCX is treated as source-document content. In particular, “Add the original story title, publication, date, and link here” is an incomplete-information note, not permission to invent those details.
- The six DOCX embedded photos were previously compared byte-for-byte with the project image files. All six are present; no extraction or replacement was needed.
- Temporary LinkedIn CDN URLs in image metadata contain expiring query values. They are not used as website links.
- The design reference websites are not sources of Bruce Mahero facts, images, contacts, or links.

## Source-to-page traceability

| Source section / detail | Website location | Status |
| --- | --- | --- |
| Cover: Bruce Mahero; “Personal Biography & Professional Media Portfolio”; “Innovation Journalist \| Media & Communication Professional”; Nairobi, Kenya | `index.html` hero and title; `about.html` page heading/role; `contact.html` location | Complete |
| Professional Biography: Kenyan journalist, media professional, digital communicator and student leader; journalism, technology, information integrity and youth leadership; Zetech studies and JSAK presidency; interests in innovation journalism, ethics, fact-checking, AI and media, digital communication, next-generation journalism, responsible storytelling, collaboration and public trust | Full paragraphs in `about.html`; biography also appears in `index.html` | Complete |
| Personal Life and Background: Nairobi; caution that birth, family, childhood and early influences should be included only when reliable and intended for public disclosure; source note about personal experiences/context; Nation Africa reference and its unconfirmed relationship to Bruce | `about.html`, Personal Life and Background | Present with uncertainty clearly marked; Nation story is not asserted as Bruce’s biography |
| Academic Journey: Marenyo Primary School — 349 marks in KCPE; Butere Boys High School — mean grade C+ in KCSE; Zetech University — pursuing a Bachelor’s degree in Journalism; reporting, broadcast production, news presentation, media law and ethics, digital storytelling and multimedia communication | `about.html`, Academic Journey and Professional Biography; school/result summary also on `index.html` | Complete |
| Career and Professional Experience / Journalism and Media Production: reporting, news anchoring, producing, editorial writing, digital content; traditional journalistic principles and emerging platforms; reporting, interviews, feature writing, production, storytelling, innovation/technology journalism, law/ethics, verification, accountability, social media and audience engagement | `about.html`, Career and Professional Experience; short experience overview in `index.html` | Complete |
| Digital Media and Editorial Work: EpicPulse Magazine, social media marketing, content development, online engagement, digital audiences and website content; AI’s effect on newsrooms and balancing innovation with accuracy, human judgment and ethics | `about.html`, Digital Media and Editorial Work; author archive in `media.html` | Complete |
| Sports Journalism and Content Creation: Zetech Sparks FC; match-day captions, team announcements, player recognition, match galleries and post-match coverage | `about.html`, Sports Journalism and Content Creation; summary in `index.html` | Complete |
| Leadership Journey: JSAK presidency in October 2026, 4th Session National Executive Council; progression from Zetech University Chapter Representative; work with chapter representatives and national secretariat; coordination, collaboration and support for journalism students; all five listed leadership priorities | Full detail and priorities in `about.html`; summary in `index.html` | Complete |
| Africa Facts Summit 2026: 21–22 October 2026, Safari Park Hotel, Nairobi; “Information Integrity in an Ever-Evolving Landscape: AI, Agency, and Influence in Africa”; misinformation, AI, information integrity and media responsibilities | Full detail in `about.html`; summary in `media.html`; supplied summit photo in About, Media and Gallery; homepage highlight in `index.html` | Complete |
| Building Information Resilience Against FIMI in Kenya — Workshop Training I: 29–30 June 2026; Africa Check and European Union External Action; Mövenpick Nairobi; fact-checking, verification and resilience against Foreign Information Manipulation and Interference | Full detail and Certificate of Completion in `about.html`; activity in `media.html`; supplied workshop photo in About, Media and Gallery; homepage recognition/highlight | Complete |
| AI-era journalism article: “Preparing the Next Generation of Journalists for the AI Era: Balancing Innovation, Ethics and Trust”; the source reports *The Standard*, 21 August 2026; source-listed latest-events and LinkedIn URLs | The source-reported lead appears in `index.html`, `about.html`, `watch-read.html` and `media.html` with verification caveats | Not treated as a confirmed publication; publication, date and direct article URL still require independent confirmation. The source-listed URLs are not claimed as copies of the titled article.
| Award-winning Feature Story: first place, Best Feature Story, JSAK Annual Media Awards; DOCX leaves title, publication, date and link blank; source-listed EpicPulse URL | Recognition appears in `index.html`, `about.html`, `watch-read.html` and `gallery.html`; source URL is kept only in verification data | Recognition is present. Title, publication and date remain unconfirmed; the EpicPulse URL is not asserted as the winning story.
| Additional publication directories: EpicPulse Magazine; DataPoint Daily; The Bold East Africa; Zetech University Blogs | `media.html`; homepage links to all four | All four source URLs are present. The Zetech URL is a university homepage, not a direct blogs archive. |
| Awards and Certificates: gold medal and certificate of appreciation while representing Zetech University; FIMI workshop Certificate of Completion | `about.html`, `media.html`, `index.html`; award photo on About/Home/Gallery; workshop certificate photo on About/Media/Gallery | Complete; no feature title or award date added |
| Photography and Visual Archive: six embedded photos | Local files in `images/`; photographs used in `index.html`, `about.html`, `media.html` and `gallery.html` as listed below | All six source images present; captions and alt text use documented or visually observable context |
| Professional Contacts and Online Presence: Nairobi; email; LinkedIn, Facebook, X, Instagram; source website field is blank | `contact.html` and homepage/footer | Verified email, location and social links are present. The missing website is omitted; no URL invented.
| Personal Philosophy and Signature Quote | Exact quote and attribution in `about.html` and `index.html` | Complete |
| Vision for the Future | Full source paragraph in `about.html` and `index.html` | Complete |

## Photo mapping

| DOCX media part / local asset | Current website use | Context |
| --- | --- | --- |
| `image1.png` / `images/profile/bruce-mahero-profile.png` | Retained as a supplied source asset; not displayed on the About or Gallery pages | Supplied professional portrait; optimized derivative is visually equivalent and not an additional source photograph |
| `image2.jpeg` / `images/awards/jsak-media-award-2026.jpg` | Home, About, Gallery | Certificate presentation at JSAK Annual Media Awards |
| `image3.jpeg` / `images/workshops/africa-check-fimi-workshop-2026.jpg` | Home, About, Media, Gallery | Africa Check FIMI workshop certificate photo |
| `image4.jpeg` / `images/events/bruce-mahero-speaking.jpg` | Home, Media, Gallery | Bruce speaking at a lectern |
| `image5.jpeg` / `images/events/jsak-media-awards-panel-2026.jpg` | Gallery | Participants at the JSAK Annual Media Awards panel discussion; other participants are not named |
| `image6.jpeg` / `images/events/africa-facts-summit-2026.jpg` | Home, About, Media, Gallery | Africa Facts Summit backdrop photo |

## Contact values checked against the source

- Email: `brucemahero@zetech.ac.ke` (`mailto:` link)
- LinkedIn: `https://www.linkedin.com/in/bruce-mahero-034072359/`
- Facebook: `https://www.facebook.com/thee.bruletz/`
- X: `https://x.com/brucemahero`
- Instagram: `https://www.instagram.com/brucemahero/`
- Website: source placeholder `…`; no personal URL supplied.

## Remaining confirmation items

1. Confirm whether *The Standard* published the AI-era article on 21 August 2026, and whether the source-listed Zetech latest-events and LinkedIn URLs relate to that article.
2. Supply the award-winning feature’s exact title, publication, date and direct URL if those details are to be displayed. Confirm whether the EpicPulse source-listed URL is related to it.
3. Confirm whether the Nation Africa reference is about Bruce before making any biographical use of it.
4. Confirm any personal website URL if one should replace the source’s `…` placeholder.
5. Social profile URLs match the source document; account ownership and live availability were not independently verified in this audit.

## Overall status

All requested source sections have a traceable location on the site or a clearly documented unresolved status above. The site’s content is source-mapped, with verification gaps made visible; it should not be described as fully fact-verified until the confirmation items are resolved.

## Final website-wide QA snapshot - 3 November 2026

- All six HTML pages were rendered in Chrome at 1280 x 720 and 390 x 844. No horizontal overflow, missing primary heading, JavaScript errors, broken local images, bad same-page fragments, duplicate IDs, or unsafe new-tab links were found. The mobile menu opened and Escape closed it with focus returned to its toggle on every page.
- The six original photographs load in the Gallery with descriptive alt text; the lightbox supports close control, backdrop, Escape, and previous/next controls. The two supplied YouTube IDs and privacy-enhanced embeds remain on `watch-read.html`; playback depends on external YouTube access.
- Titles and descriptions are unique across all six pages. Every page has viewport metadata and the six-page navigation. The sitemap lists all six pages but still contains a production-domain placeholder; replace it and the corresponding `robots.txt` value only after the final domain is confirmed. Canonical tags are intentionally absent until then.
- The Contact page uses the verified `mailto:` email and supplied LinkedIn, Facebook, X and Instagram URLs. No personal website placeholder, office address or telephone number is displayed.
- The optimized portrait derivative is used on Home and About; the original source portrait remains in the Gallery. Source-reported Standard article details and unconfirmed JSAK story details are not presented as verified bylines.
- Local routes, stylesheets, scripts and images were checked. This audit does not establish live external-site availability, production DNS/SSL, or production-domain sitemap validity.