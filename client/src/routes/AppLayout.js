//@ This is a helper-component for App.js
//@ has everything that we expect inside App.js
//$ It has the Header-component, Footer-component, the main part of the page, and the routes defined as well
//$ Also handles switching between pages (Launch, Upcoming, History), sounds, and animations

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
//$ using custom-hooks instead of contexts but achieveing the same thing
//$ which is to pass data across components

import { useState } from "react";
import { Switch, Route } from "react-router-dom"; // to switch between pages
import { Frame, withSounds, withStyles } from "arwes"; // fancy UI + sound

import usePlanets from "../hooks/usePlanets"; // custom hook to get planets list
import useLaunches from "../hooks/useLaunches"; // custom hook to manage launches

import Centered from "../components/Centered"; // centers things in middle
import Header from "../components/Header"; // top bar
import Footer from "../components/Footer"; // bottom bar

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

  //@ why custom hooks?
  //$ using custom-hooks instead of contexts but achieveing the same thing
  //$ which is to pass data across components
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
                  <Launch
                    entered={anim.entered} // animation info
                    planets={planets} // list of planets
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>

                <Route exact path="/launch">
                  {/* show Launch page */}
                  <Launch
                    entered={anim.entered}
                    planets={planets}
                    submitLaunch={submitLaunch}
                    isPendingLaunch={isPendingLaunch}
                  />
                </Route>

                <Route exact path="/upcoming">
                  {/* show Upcoming page */}
                  <Upcoming
                    entered={anim.entered}
                    launches={launches} // list of upcoming launches
                    abortLaunch={abortLaunch} // function to cancel launch
                  />
                </Route>

                <Route exact path="/history">
                  {/* show History page */}
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
