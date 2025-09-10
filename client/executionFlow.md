# 🚀 React Project Flow Notes

## 🔄 Route Flow (from navigation to rendered component)

1️⃣ **User clicks a navigation link in Header**

```jsx
<Link to="/upcoming">Upcoming</Link>
```

2️⃣ The URL changes in the browser to `/upcoming`.

3️⃣ This triggers `App.js`, which then triggers `AppLayout.js`. React Router sees the new URL and looks at the `Routes` in `AppLayout`.

```jsx
<Switch>
  <Route exact path="/" component={Launch} />
  <Route exact path="/launch" component={Launch} />
  <Route exact path="/upcoming" render={() => <Upcoming ... />} />
  <Route exact path="/history" render={() => <History ... />} />
</Switch>
```

4️⃣ Only the matching **Route** (here, `/upcoming`) renders the page component, so the `Upcoming` component is rendered inside the `<Switch>` in `AppLayout`.

5️⃣ The **Header** and **Footer** are outside the `<Switch>` and are always rendered.

```jsx
<Header />               // always visible at top
<Switch> ... </Switch>   // middle content changes
<Footer />               // always visible at bottom
```

6️⃣ **Props** are passed from **custom hooks** to the page component (all inside the `AppLayout` component)—`launches`, `planets`, `submitLaunch`, `abortLaunch`, etc.

8️⃣ **Result on the screen:**

  - **[Header]** \<- always visible
  - **[Upcoming]** \<- content changes based on route
  - **[Footer]** \<- always visible

✅ **Key idea**: The **Route** only controls the middle content. The **Header** and **Footer** are part of the layout and never get replaced.

-----

## 🌐 Flow of functions and data (requests.js → custom hooks → components)

### 📝 Corrected Explanation

  - `requests.js` contains the actual functions that interact with the API:

      - **GET requests** fetch data (e.g., `httpGetLaunches`, `httpGetPlanets`).
      - **POST requests** update data (e.g., `httpSubmitLaunch`, `httpAbortLaunch`).

  - Then come the **custom hooks** (`useLaunches` and `usePlanets`), which **use the functions from `requests.js` internally**:

      - `useLaunches`
          - uses `httpGetLaunches` to fetch all launches.
          - defines `submitLaunch` (internally uses `httpSubmitLaunch`).
          - defines `abortLaunch` (internally uses `httpAbortLaunch`).
      - `usePlanets`
          - uses `httpGetPlanets` to fetch planet data.

  - Next, in the `AppLayout` component:

      - Both `useLaunches` and `usePlanets` are called.
      - They return data (state) and functions, which `AppLayout` passes down to child components.

  - **Example flows:**

      - `submitLaunch` is defined in `useLaunches` (which internally calls `httpSubmitLaunch`), passed to the `Launch` component, and attached to the `<form>`'s `onSubmit`.
      - `abortLaunch` is defined in `useLaunches` (which internally calls `httpAbortLaunch`), passed to the `Upcoming` component, and used on the ❌ icon to cancel a launch.
      - Planet data is loaded inside `usePlanets`, returned to `AppLayout`, and passed down to the `Launch` component (probably for a dropdown of planets).

-----

### 📊 Diagram (flow of functions & data)

```
requests.js
├── httpGetLaunches()
├── httpSubmitLaunch()
├── httpAbortLaunch()
└── httpGetPlanets()

custom hooks
├── useLaunches()
│   ├── calls httpGetLaunches()
│   ├── defines submitLaunch() → uses httpSubmitLaunch()
│   └── defines abortLaunch() → uses httpAbortLaunch()
│
└── usePlanets()
    └── calls httpGetPlanets()

AppLayout
├── calls useLaunches() → gets { launches, submitLaunch, abortLaunch }
├── calls usePlanets() → gets { planets }
│
├── passes submitLaunch → Launch component → <form onSubmit>
├── passes abortLaunch → Upcoming component → ❌ button
└── passes planets → Launch component → <select options>
```