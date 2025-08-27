# NASA Mission Control (Self-Study Project)

A React app for scheduling and viewing space missions using Arwes UI library.  
**Not an official NASA or SpaceX site.** For self-study purposes only.

---

## Features

- Schedule new missions to exoplanets.
- View upcoming and past launches.
- Abort upcoming missions.
- Sounds for success, abort, and errors.
- Fancy UI with Arwes animations and theme.

---

## Routes

### `/` or `/launch` → Launch

- Form to schedule a new mission.
- Select launch date, mission name, rocket type, and destination planet.
- Submit button triggers launch submission with sound and loading state.

### `/upcoming` → Upcoming

- Table showing all upcoming launches.
- Red ✖ allows aborting a launch (plays abort sound).

### `/history` → History

- Table showing all past launches.

---

## Components

### Layout

- **App.js** – Root component; sets up theme, sounds, background, and routing.
- **AppLayout.js** – helper component for app.js, has everything that we expect inside app.js like default-components and routes

### Components

- **Header.js** – Navigation bar with links to routes, logo, and sounds.
- **Footer.js** – Simple footer with disclaimer text.

### Remaining-Components

- **Centered.js** – Centers content horizontally with max width.
- **Clickable.js** – Wraps elements to make them clickable with sound feedback.

### Routes

- **Launch.js** – Mission scheduling form.
- **Upcoming.js** – Table of upcoming launches with abort option.
- **History.js** – Table of past launches.

---

## Custom Hooks

- **usePlanets.js** – Fetches planets from API.
- **useLaunches.js** – Manages launches: fetch, submit, abort, loading state, and plays sounds.

---

## API Requests (`requests.js`)

- `httpGetPlanets()` – Get all planets.
- `httpGetLaunches()` – Get all launches (sorted by flight number).
- `httpSubmitLaunch(launch)` – Add a new launch.
- `httpAbortLaunch(id)` – Abort a launch by ID.

---

## How It Works (Summary)

1. **App.js** sets up theme, sounds, background, and routing.
2. **AppLayout** renders header, footer, routes, and page content inside an animated Frame.
3. Routes use **custom hooks** to fetch and manage data.
4. **Clickable** + **SoundsProvider** give feedback for actions.

---

## Execution Flow

1️⃣ User clicks a navigation link in Header

<Link to="/upcoming">Upcoming</Link>

2️⃣ URL changes in the browser to "/upcoming"

3️⃣ which then triggers App.js, which then triggers AppLayout.js. React Router sees the new URL and looks at the Routes in AppLayout
<Switch>
<Route exact path="/" component={Launch} />
<Route exact path="/launch" component={Launch} />
<Route exact path="/upcoming" render={() => <Upcoming ... />} />
<Route exact path="/history" render={() => <History ... />} />
</Switch>

---
