# MYPC — Website + Member Portal · Wireframe Spec

**Phase:** Wireframing (UX only). No production code. No Wix/Astro implementation.
**Fidelity:** Low. Grayscale, boxes, placeholder text/imagery. Structure over style.
**Status of this project:** DEMO / CONCEPT — every page carries a visible "not a real organization" notice.

Client: Mayor's Young Professional Council (MYPC) — a city‑sponsored young‑professionals
organization, related to the City of Montgomery. Working title; final brand TBD.

---

## 1. Requirements (consolidated)

### Public site
Home · About · Leadership / Council · Events · Membership · Apply to Join · Contact · Member Login

### Member area (authenticated)
Dashboard · Events · Documents · Profile · Pay Dues (external link) · Logout

### Business requirements
- Member logins
- Document retention / access
- Events
- Social media integration
- Membership applications
- External dues payment link (off‑site)
- Mobile‑first usability

### Explicitly OUT of scope (do not invent)
CRM, committees, messaging/DMs, voting/elections, job board, mentorship matching,
forums, newsletters management, donor management. Keep the architecture small.

---

## 2. Information Architecture

```
PUBLIC
Home
├── About
├── Leadership              (directory · filter · member profile view)
├── Events                  (list / calendar toggle)
│   └── Event Detail        (date, time, location, category, external RSVP/action)
├── Membership
│   └── Apply               (multi‑section application)
│       └── Application Submitted   (confirmation)
├── Contact
└── Member Login            → (auth) → Member Dashboard

Global footer: quick links · social media row · city sponsorship line · DEMO notice

MEMBER  (after login)
Dashboard
├── Events                  (member view → Event Detail)
├── Documents               (name · category · date · view/download)
├── Profile                 (view / edit)
├── Pay Dues                (external link — leaves the site)
└── Logout                  → Home
```

Two navigation contexts: **public header** (marketing nav + Member Login) and
**member header** (Dashboard / Events / Documents / Profile / Pay Dues ↗ / Logout).

---

## 3. User Flows

**A — Visitor / explore the organization**
Home → About → Leadership → Events → Event Detail → Membership

**B — Prospective member / apply**
Home → Membership → eligibility & benefits → Apply
→ Personal → Professional → City & Community → Interests → Consent & Submit
→ Application Submitted (confirmation + what happens next)

**C — Existing member**
Member Login → Dashboard → { Events | Documents | Profile }
→ Pay Dues (external) · Logout → Home

**D — Event visitor**
Home or Events → Event Card → Event Detail → external RSVP / action (placeholder)

---

## 4. Screen inventory

### 03 — Desktop wireframes
| # | Screen | Key blocks |
|---|--------|-----------|
| 1 | Home | header · hero + org statement · Apply CTA · Upcoming Events CTA · focus/initiative areas · leadership preview · events preview · how‑to‑join steps · social/community · city sponsorship · footer |
| 2 | About | mission · relationship to City of Montgomery · history/purpose · impact · leadership CTA |
| 3 | Leadership | header · search/filter concept · member cards (role/title) · responsive directory concept |
| 4 | Leadership — Member Profile | modal/overlay: photo · name · role · bio · professional info · close |
| 5 | Events | upcoming events · event cards (date/time/location/category) · list ↔ calendar toggle |
| 6 | Event Detail | title · date/time · location · category · description · external RSVP/action · back |
| 7 | Membership | why join · eligibility · benefits · application steps · dues info · Apply CTA · Pay Dues CTA |
| 8 | Apply — Application | stepper: Personal · Professional · City & Community · Interests · Consent & Submit |
| 9 | Application Submitted | confirmation · what happens next · return to Home |
| 10 | Contact | contact form · org contact placeholder · social links · map placeholder |
| 11 | Member Login | email · password · forgot password · login · (link back to Apply) |
| 12 | Member Dashboard | welcome · next event · recent documents · shortcuts: dues / events / documents / profile |
| 13 | Member — Events | member event list · RSVP state concept · Event Detail link |
| 14 | Member — Documents | document rows: name · category · date · view/download · filter by category |
| 15 | Member — Profile | name · contact details · professional info · editable concept (view/edit toggle) |
| 16 | Pay Dues (external) | interstitial: "you are leaving the site" · external link placeholder · back to Dashboard |

### 04 — Mobile wireframes
Home · Events · Membership · Application (stepped) · Login · Dashboard · Documents · Leadership directory
Plus **Mobile Nav** (full‑screen sheet / drawer) — deliberately designed, not a shrunk navbar:
thumb‑reachable, large tap targets, primary CTA pinned, stacked cards, minimal horizontal scroll.

### 05 — Components (reusable, auto‑layout)
Header — Public · Header — Member · Footer · Button / CTA (primary + secondary) ·
Section Header (eyebrow + title + link) · Event Card · Member Card · Document Row ·
Form Field (label + input + helper/error) · Image Placeholder · Mobile Nav Drawer

---

## 5. Wireframe style rules

- Grayscale only: `#000 #333 #666 #999 #ccc #eee #fff`.
- Solid 1px borders or whitespace for separation. No dashed borders.
- Placeholder imagery = box with an X and a caption.
- Realistic placeholder copy, not lorem ipsum. Real third‑party facts stay `TODO: client to supply`.
- No final colors, gradients, photography, custom icons, animation, elaborate shadows, final type.
- Every frame footer carries: **"DEMO / CONCEPT — not a real organization."**

---

## 6. Prototype connections (minimum)

- Home → Events  (nav + "Upcoming Events" CTA)
- Home → Membership → Apply → Application Submitted → Home
- Home → Leadership → Member Profile (overlay) → close
- Home → Member Login → Dashboard
- Dashboard → Events / Documents / Profile / Pay Dues (placeholder) / Logout → Home
- Events → Event Detail → back
- Header logo → Home (global).  Mobile: hamburger → Mobile Nav sheet → destinations.
- No dead primary navigation.

---

## 7. Deliverables

1. Figma design file — `MYPC — Website + Member Portal (Wireframes)` with pages
   `00 Cover / Notes · 01 Information Architecture · 02 User Flows · 03 Desktop Wireframes ·
   04 Mobile Wireframes · 05 Components · 06 Prototype`.
2. Clickable Figma prototype covering the flows in §6.
3. This spec + a delivery summary + key screenshots in `artifacts/wireframe/`.

**STOP after the prototype. No Astro, no Wix release, no databases — review first.**
