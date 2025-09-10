//@ This is a helper-component for App.js
//@ has everything that we expect inside App.js
//$ It has the Header-component, Footer-component, the main part of the page, and the routes defined as well
//$ Also handles switching between pages (Launch, Upcoming, History), sounds, and animations
//! but just one difference is, app-comp usually only has routes
//! here, we have routes besides header and footer
//! so header and footer are always displayed regardless of route and route will be displayed based on the route/url

//@ Props to this component:
//$ - sounds: object containing sound effects
//$    - success: plays when a launch succeeds
//$    - abort: plays when a launch is aborted
//$    - warning: plays when a launch fails
//$ - classes: object containing CSS class names from withStyles
//$    - content: main container style
//$    - centered: style for centering main content

//@ also! we could have also defined simple routes like the usual way,
//@ but we had to pass props to those comps, thats why we did it this way.
// <Route exact path="/" component={Launch} />
// <Route exact path="/launch" component={Launch} />
// <Route exact path="/upcoming" component={Upcoming} />
// <Route exact path="/history" component={History} />

//@ why custom hooks?
//$ A custom hook is just a normal function that uses React hooks inside it
//$ It lets us reuse logic (like fetching, saving, updating data) in different components
//$ A custom hook lets us return state and functions, so other components can easily reuse them.
//$ If combined with Context, hooks can also provide data in a centralized, global way.

import { useState } from "react";
import { Switch, Route } from "react-router-dom"; // to switch between pages
import { Frame, withSounds, withStyles } from "arwes"; // fancy UI + sound

//@ importing all the custom hooks,
//@ remember! inside those custom hooks, we returned their state-vars and some functions
//@ we gonna use those here, what were returned inside those custom hooks, we gonna use them here
import usePlanets from "../hooks/usePlanets"; // custom hook to get planets list
import useLaunches from "../hooks/useLaunches"; // custom hook to manage launches

//@ importing all the components
import Centered from "../components/Centered"; // centers things in middle
import Header from "../components/Header"; // top bar
import Footer from "../components/Footer"; // bottom bar

//@ importing all the route-components
import Launch from "./Launch"; // page to schedule a launch
import History from "./History"; // page to see history
import Upcoming from "./Upcoming"; // page to see upcoming launches

// styles for the page
const styles = () => ({
  content: {
    // main container
    display: "flex",
    flexDirection: "column",
    height: "100vh", // full screen height
    margin: "auto",
  },
  centered: {
    // center the main part
    flex: 1,
    paddingTop: "20px",
    paddingBottom: "10px",
  },
});

// main layout component
const AppLayout = (props) => {
  const { sounds, classes } = props;

  // state to hide/show the Frame animation
  const [frameVisible, setFrameVisible] = useState(true);

  // we need this function to enhance the exisiting animation effect,
  // that is to hide and display after some time, the existing animation.
  const animateFrame = () => {
    setFrameVisible(false); // hide frame
    setTimeout(() => {
      setFrameVisible(true); // show frame after 600ms
    }, 600);
  };

  // we need these functions to play sounds.
  // if the respective sound exists in the first place
  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  //@ using those custom hooks
  //@ using those custom hooks
  //@ using those custom hooks
  // get the 2 state variables and 2 functions that we coded inside useLaunches hook
  const { launches, isPendingLaunch, submitLaunch, abortLaunch } = useLaunches(
    onSuccessSound,
    onAbortSound,
    onFailureSound
  );

  // get the planets-state-variable that we coded inside usePlanets hook
  const planets = usePlanets();

  return (
    <div className={classes.content}>
      {/* show header bar */}
      <Header onNav={animateFrame} />

      {/* center the main content */}
      <Centered className={classes.centered}>
        {/* frame for animation */}
        <Frame
          animate
          show={frameVisible}
          corners={4}
          style={{ visibility: frameVisible ? "visible" : "hidden" }}
        >
          {(anim) => (
            <div style={{ padding: "20px" }}>
              {/* switch between pages */}
              <Switch>
                <Route exact path="/">
                  {/* show Launch page */}
                  {/* passing the data, from the custom hook to the component */}
                  <Launch
                    entered={anim.entered} // animation info
                    planets={planets} // list of planets
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>

                <Route exact path="/launch">
                  {/* show Launch page */}
                  {/* passing the data, from the custom hook to the component */}
                  <Launch
                    entered={anim.entered}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>

                <Route exact path="/upcoming">
                  {/* show Upcoming page */}
                  {/* passing the data, from the custom hook to the component */}
                  <Upcoming
                    entered={anim.entered}
                    launches={launches} // list of upcoming launches
                    abortLaunch={abortLaunch} // function to cancel launch
                  />
                </Route>

                <Route exact path="/history">
                  {/* show History page */}
                  {/* passing the data, from the custom hook to the component */}
                  <History
                    entered={anim.entered}
                    launches={launches} // list of all launches
                  />
                </Route>
              </Switch>
            </div>
          )}
        </Frame>
      </Centered>

      {/* show footer at the bottom */}
      <Footer />
    </div>
  );
};

// add sounds and styles to the component
export default withSounds()(withStyles(styles)(AppLayout));
