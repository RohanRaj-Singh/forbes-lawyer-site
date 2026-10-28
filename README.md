# Forbes Stranger LLP — Website

A complete, responsive site design built as static HTML/CSS, extending the visual
language of `Homepage_Standalone.html` to every remaining page.

Open `index.html` in a browser to review locally. No build step, no dependencies.

---

## 1. Page map

| Page | File | URL |
| --- | --- | --- |
| Home | `index.html` | `/` |
| Our Team | `team/index.html` | `/team/` |
| Ryan Alexander Forbes | `team/ryan-forbes/index.html` | `/team/ryan-forbes/` |
| Helena Veronique Stranger | `team/helena-stranger/index.html` | `/team/helena-stranger/` |
| Practice Areas | `practice-areas/index.html` | `/practice-areas/` |
| New York Criminal Defense | `practice-areas/new-york-criminal-defense/` | `/practice-areas/new-york-criminal-defense/` |
| Federal Criminal Defense | `practice-areas/federal-criminal-defense/` | `/practice-areas/federal-criminal-defense/` |
| White-Collar Investigations | `practice-areas/white-collar-investigations/` | `/practice-areas/white-collar-investigations/` |
| Trial & Appellate Advocacy | `practice-areas/trial-and-appellate-advocacy/` | `/practice-areas/trial-and-appellate-advocacy/` |
| Case Results | `case-results/index.html` | `/case-results/` |
| Contact | `contact/index.html` | `/contact/` |
| About (The Firm) | `about/index.html` | `/about/` |
| Articles | `articles/index.html` | `/articles/` |
| Article ×3 | `articles/<slug>/index.html` | `/articles/<slug>/` |

All internal links are relative, so the package runs from any folder without a server.

## 2. Design system

Everything derives from the tokens already defined in the homepage.

| Token | Value | Use |
| --- | --- | --- |
| `--green` | `#102411` | dark panels, CTA band, footer accents |
| `--green-black` | `#081209` | page background |
| `--light` | `#f3f0e8` | primary text on dark |
| `--muted` | `#b6bcaf` | secondary text on dark |
| `--line` | `rgba(225,232,216,.36)` | borders |
| paper | `#f4f1ea` / `#eeeadf` | long-form reading sections |

- **Type:** Cormorant Garamond for editorial copy and display; Inter for labels,
  navigation, buttons, and metadata. Sizes are fluid (`clamp()`), mirroring the homepage.
- **Rhythm:** every page moves dark photographic hero → ivory editorial body → dark
  accent band → contact band. This is the homepage's own sequence.
- **Components:** `site-header` + mobile drawer, `phero` (page hero), `sec--*` section
  shells, `btn`, `pcard` (partner cards), `band` (full-bleed image), `manifesto`,
  `prow` (practice rows), `prose`, `details`/`factlist`, `inquiry` form, `cta-band`,
  `site-footer`. All live in `assets/site.css`.

Two deliberate deviations from the team-page reference are documented in §6.

## 3. WordPress / Elementor porting

The markup maps cleanly onto Elementor without new plugins or custom post types.

1. **Global styles** — register the six colour tokens as Elementor Global Colors and
   the two families as Global Fonts. `assets/site.css` can be enqueued as-is; it is
   namespaced (`.phero`, `.prow`, `.pcard`, `.sec--*`) and will not collide with
   Elementor's own classes.
2. **Header / footer** — build once in Elementor Theme Builder (Header, Footer
   templates). The mobile drawer already exists in `assets/site.js`; in Elementor use
   the Nav Menu widget with the same styling, or keep the custom markup in an HTML widget.
3. **Reusable templates**
   - *Attorney profile* → one Elementor Single template, driven by a loop or by hand;
     fields: portrait, name, standfirst, biography (rich text), "At a glance" list.
   - *Practice area* → one template; fields: hero title, standfirst, body, aside facts.
   - *Article* → Elementor Single Post template; body in the native editor.
4. **Homepage hero slider** — `Forbes-Stranger-Partner-Slider-v1.1.0.zip` is already
   provided and renders the two-portrait carousel used in the hero. Insert with
   `[forbes_partner_slider]` in a Shortcode widget.
5. **Contact form** — the form is marked `data-preview` and intentionally does not
   submit. Replace with Elementor Forms (or WPForms/Gravity Forms), keeping the field
   styling in `assets/site.css` (`.field`). Add the disclaimer beneath the submit button;
   it is required client-facing copy, not decoration.
6. **Images** — `assets/img/` ships WebP derivatives. Upload the full-size originals to
   the Media Library and let the optimiser regenerate sizes.

## 4. Content status

**Verified — sourced from `Final Bios.pdf`, the sitemap, and the approved homepage copy:**

- Both attorney biographies, education, recognition, memberships, languages.
- The "A Firm Behind Your Defense" paragraph (sitemap §2.4).
- All practice-area descriptions (derived from the biographies and the homepage practice list).

**Placeholder — must be confirmed before publication:**

| Item | Currently | Action |
| --- | --- | --- |
| Telephone | `212.555.0100` | Replace with the firm's published 24/7 number; update `tel:` links sitewide |
| Address | 40 Wall Street, Floor 28, New York, NY 10005 | Confirm |
| Email | counsel@forbesstranger.com | Confirm or remove |
| Portraits | AI-generated concept images supplied with the homepage | Replace with authentic photography before publication |
| Article byline | "Forbes Stranger LLP" | Add attorney bylines if the firm prefers |

The homepage still carries its own publication note; it now reads
"Authentic partner photography and the firm's confirmed contact details must be added
before publication."

No case outcomes, testimonials, awards, or statistics have been invented. `/case-results/`
deliberately explains why the firm does not publish a results catalogue rather than
fabricating one.

## 5. Accessibility & performance

- Skip link, visible focus rings, landmarks (`header`/`nav`/`main`/`footer`), one `h1`
  per page, no skipped heading levels.
- Mobile menu exposes `aria-expanded` / `aria-hidden`, closes on Escape and on link
  navigation, and returns focus to the toggle.
- `prefers-reduced-motion` disables all transitions, animations, and reveal effects.
- Decorative imagery uses empty `alt`; portraits and named images are described.
- Body copy meets WCAG AA contrast on both ivory and dark-green surfaces.
- Images are WebP; the homepage was reduced from **3.2 MB to 23 KB** of HTML by
  externalising seven base64 images into `assets/img/` (byte-identical sources).
- Fonts load from Google Fonts with `preconnect`; swap only the two families used.

## 6. Deviations from the team-page reference — and why

1. **No joint photograph of the partners.** The reference shows two photographs of
   Forbes and Stranger together. No such photography exists in the project, and composing
   one would mean presenting fabricated images of named attorneys. Those slots use
   approved Lower Manhattan photography instead, and the "A Firm Behind Your Defense"
   statement is set as a centred manifesto. When authentic joint photography is supplied,
   the section can switch to the side-by-side layout the reference uses.
2. **Portrait cards are 4:5 rather than landscape.** The supplied portraits are tight
   head-and-shoulder crops; a landscape crop cuts at the chin. 4:5 matches the ratio the
   homepage already uses for attorney portraits, so the cards stay consistent with the
   established design language while showing each sitter properly.

Everything else follows the reference: centred nav with the thistle wordmark and phone
chip, uppercase editorial hero with rule, bordered partner cards with centred name /
"Attorney at Law" / biography / outlined CTA, full-bleed photographic band, and the
"Speak With Our Team" contact band with divider.

## 7. Files

```
site/
  index.html                  homepage (hero and sections unchanged; nav + footer harmonised)
  team/ …                     team + two profiles
  practice-areas/ …           overview + four detail pages
  contact/ about/ articles/ case-results/
  assets/
    site.css                  design system (single stylesheet)
    site.js                   header state, mobile drawer, reveals, form preview
    forbes-stranger-thistle-white.svg
    img/                      WebP derivatives of the supplied master photography
```
