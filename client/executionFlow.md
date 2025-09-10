# 🚀 React Project Flow Notes

Route Flow (from navigation to rendered component)

1️⃣ User clicks a navigation link in **Header**

```jsx
<Link to="/upcoming">Upcoming</Link>
```

### 2️⃣ URL changes in the browser

`/upcoming`

### 3️⃣ React Router in `App.js` → `AppLayout.js` matches the route

```jsx
<Switch>
  <Route exact path="/" component={Launch} />
  <Route exact path="/launch" component={Launch} />
  <Route exact path="/upcoming" render={() => <Upcoming ... />} />
  <Route exact path="/history" render={() => <History ... />} />
</Switch>
```

---

### 4️⃣ Only the matching Route renders

👉 `/upcoming` → `Upcoming` component rendered inside `<Switch>`

---

### 5️⃣ Layout always shows **Header** and **Footer**

```jsx
<Header />         // always visible at top
<Switch> ... </Switch>  // middle content changes
<Footer />         // always visible at bottom
```

---

### 6️⃣ Props from custom hooks → passed to page components

- launches, planets, submitLaunch, abortLaunch, etc.

---

### 7️⃣ Frame animation (when `animateFrame()` is called from Header)

- hides Frame
- waits 600ms
- shows Frame again

---

### 8️⃣ Final screen result:

```
[Header]    <- always visible
[Upcoming]  <- changes based on route
[Footer]    <- always visible
```

✅ **Key idea:** Route only controls the **middle content**. Header & Footer are always part of the layout.

---

## 🌐 Flow of functions and data (requests.js → custom hooks → components)

### 📝 Corrected Explanation

- `requests.js` contains the actual functions that interact with the API:

  - **GET requests** → fetch data (e.g. `httpGetLaunches`, `httpGetPlanets`)
  - **POST requests** → update data (e.g. `httpSubmitLaunch`, `httpAbortLaunch`)

- Then come the custom hooks (`useLaunches` and `usePlanets`), which **use the functions from `requests.js` internally**:

  - `useLaunches`

    - uses `httpGetLaunches` to fetch all launches,
    - defines `submitLaunch` (internally uses `httpSubmitLaunch`),
    - defines `abortLaunch` (internally uses `httpAbortLaunch`).

  - `usePlanets`

    - uses `httpGetPlanets` to fetch planet data.

- Next, in the `AppLayout` component:

  - Both `useLaunches` and `usePlanets` are called.
  - They return data (state) and functions, which `AppLayout` passes down to child components.

- Example flows:

  - `submitLaunch` → defined in `useLaunches` (which internally calls `httpSubmitLaunch`) → passed to `Launch` component → attached to the `<form>`’s `onSubmit`.
  - `abortLaunch` → defined in `useLaunches` (which internally calls `httpAbortLaunch`) → passed to `Upcoming` component → used on the ❌ icon to cancel a launch.
  - Planet data → loaded inside `usePlanets` → returned to `AppLayout` → passed down to `Launch` component (probably for a dropdown of planets).

---

### 📊 Diagram (flow of functions & data)

```
requests.js
├── httpGetLaunches()
├── httpSubmitLaunch()
├── httpAbortLaunch()
└── httpGetPlanets()

custom hooks
├── useLaunches()
│     ├─ calls httpGetLaunches()
│     ├─ defines submitLaunch() → uses httpSubmitLaunch()
│     └─ defines abortLaunch()  → uses httpAbortLaunch()
│
└── usePlanets()
      └─ calls httpGetPlanets()

AppLayout
├─ calls useLaunches() → gets { launches, submitLaunch, abortLaunch }
├─ calls usePlanets()  → gets { planets }
│
├─ passes submitLaunch → Launch component → <form onSubmit>
├─ passes abortLaunch  → Upcoming component → ❌ button
└─ passes planets      → Launch component → <select options>
```

```

```
