# 🚀 React Project Flow Notes

---

## 🔄 Route Flow (from navigation to rendered component)

```jsx
// 1️⃣ User clicks a navigation link in Header
<Link to="/upcoming">Upcoming</Link>

// 2️⃣ URL changes in the browser to "/upcoming"

// 3️⃣ which then triggers App.js, which then triggers AppLayout.js. React Router sees the new URL and looks at the Routes in AppLayout
<Switch>
  <Route exact path="/" component={Launch} />
  <Route exact path="/launch" component={Launch} />
  <Route exact path="/upcoming" render={() => <Upcoming ... />} />
  <Route exact path="/history" render={() => <History ... />} />
</Switch>

// 4️⃣ Only the matching Route (here /upcoming) renders the page component
//    => Upcoming component is rendered inside the <Switch> in AppLayout

// 5️⃣ Header and Footer are outside the <Switch> and always rendered
<Header />          // always visible at top
<Switch> ... </Switch>  // middle content changes
<Footer />          // always visible at bottom

// 6️⃣ Props are passed from custom-hooks to the page-component (all inside the Applayout-component)
//    - launches, planets, submitLaunch, abortLaunch, etc.

// 7️⃣ Frame animation runs if animateFrame() is called from Header
//    - hides Frame
//    - waits 600ms
//    - shows Frame again

// 8️⃣ Result on the screen:
//    [Header]       <- always visible
//    [Upcoming]     <- content changes based on route
//    [Footer]       <- always visible

// ✅ Key idea: Route only controls the middle content.
//    Header and Footer are part of the layout and never get replaced.


```

Do you want me to also **remove the inline `// comments`** inside the `jsx` code blocks too (like `// always visible at top`) or keep them as they are?
```


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
