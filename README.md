# Spunky's Hairflair Booking System

A booking platform for **Spunky's Hairflair**, a hair salon based in Mandalay, Mitchell's Plain. The system replaces manual WhatsApp bookings with a website and companion mobile app that let customers register, browse services and stylists, select an available date and time, pay a 50% deposit, and manage their own appointments.

**Goal:** reduce no-shows by 80% within three months of launch.

## Team — Coding & Curls (XISD5319)

| Name | Student Number | Focus Area |
|---|---|---|
| Asenathi Valashiya | ST10403979 | Website wireframes (Home, Login/Register, Booking flow); repo setup, folder structure & README |
| Siphokazi Nofemele | ST10438181 | Project plan narrative; DevOps lifecycle diagram & tooling |
| Rethabile Minnaar | ST10441779 | Website wireframes (My Bookings, Services, Contact); site maps & mobile wireframes |
| Given Luna Summerton | ST10434685 | Submission checklist, GitHub compliance review, proofreading & formatting |

Lecturer: Mr Smanga Ngcamu

## Features

- Registration / login (name, email, phone)
- Service catalogue: Wash & Blow, Trim & Style, Box Braids, Sew-in Weave, Relaxer, Full Style Blowout
- Booking flow: Select Service → Select Stylist → Select Date & Time → Booking Summary
- Automatic 50% deposit calculation
- My Bookings: view upcoming/past appointments, cancel a booking
- Contact page with salon details

## Tech Stack

| Layer | Website | Mobile App |
|---|---|---|
| Structure & UI | HTML5, CSS3, Font Awesome, Google Fonts (Inter) | Flutter (Dart) |
| Logic | JavaScript (ES6) | Dart |
| Data Persistence | Browser LocalStorage | On-device storage (shared_preferences / sqflite) |
| Hosting | GitHub Pages | Build artefact (APK) for testing |
| Design Tools | Figma / draw.io | Figma / draw.io |

## Folder Structure

```
spunkys-hairflair/
├── website/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── booking.js
│   │   └── storage.js
│   └── assets/
│       └── images/
├── mobile/
│   └── (Flutter/Dart project files)
├── docs/
│   ├── project-plan.pdf
│   ├── site-maps/
│   └── wireframes/
└── README.md
```

## Development Workflow (DevOps Lifecycle)

1. **Plan** — user stories from the requirement analysis broken into GitHub Issues
2. **Code** — HTML5/CSS3/JS (or Dart) written on individual feature branches
3. **Build** — feature branch merged into `develop` via Pull Request after peer review
4. **Test** — manual functional testing of booking flow, validation and responsiveness
5. **Release** — approved PR merged into `main`, tagged with a version number (e.g. v1.1)
6. **Deploy** — website auto-published via GitHub Pages; mobile build artefact generated
7. **Operate** — live site used by test customers; bookings persist locally
8. **Monitor** — commit history, issues and feedback reviewed to plan the next sprint

## Getting Started (Website)

1. Clone the repository:
   ```
   https://github.com/ST10438181/Spunky-s-Hairflair.git
   ```
2. Open `website/index.html` in a browser, or serve the `website/` folder with a local dev server.
3. No build step is required — the site runs on plain HTML/CSS/JS with LocalStorage.

## Project Timeline

| Week | Sprint Focus |
|---|---|
| 1 | Plan & Design — project plan, site maps, wireframes |
| 2 | Core Build — HTML/CSS/JS booking flow structure, repo setup |
| 3 | Feature Complete — booking logic, LocalStorage, validation, responsive styling |
| 4 | Test & Refine — cross-browser/device testing, peer review, bug fixes |
| 5 | Documentation & Submission — final docs, Task 2 submission, release tag |


