//$ This component is the "Launch" page which we see as the first thing by default on the website
//$ Uses Arwes components for styling and animation

//! Launch component props:
//$ entered           -> boolean, true when page has been animated/entered
//$ planets           -> array of planet objects, each with at least keplerName
//$ submitLaunch      -> function to handle form submission for a new launch
//$ isPendingLaunch   -> boolean, true if a launch is currently being submitted

import { useMemo } from "react"; //! so we dont keep running the function for same inputs again and again
import { Appear, Button, Loading, Paragraph } from "arwes"; // fancy UI components
import Clickable from "../components/Clickable"; // clickable button with sound

const Launch = (props) => {
  // destructure all props at the top for clarity
  const { entered, planets, submitLaunch, isPendingLaunch } = props;

  // create the dropdown options for planets
  //! returns a bunch of option-tags for the select-tag, which we will use later to put up a dropdown menu on the screen
  const selectorBody = useMemo(() => {
    return planets?.map((planet) => (
      <option value={planet.keplerName} key={planet.keplerName}>
        {planet.keplerName}
      </option>
    ));
  }, [planets]); //! coming to the dependency array, we need to pass all those things into this array, whatever external things we used inside

  // get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  return (
    // Appear animates the content when page is entered
    <Appear id="launch" animate show={entered}>
      {/* some text explaining the page */}
      <Paragraph>
        Schedule a mission launch for interstellar travel to one of the Kepler
        Exoplanets.
      </Paragraph>
      <Paragraph>
        Only confirmed planets matching the following criteria are available for
        the earliest scheduled missions:
      </Paragraph>
      <ul>
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>
          Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
          times Earth's value
        </li>
      </ul>

      {/* form to schedule a launch */}
      <form
        onSubmit={submitLaunch}
        style={{
          display: "inline-grid",
          gridTemplateColumns: "auto auto",
          gridGap: "10px 20px",
        }}
      >
        {/* date input */}
        <label htmlFor="launch-day">Launch Date</label>
        <input
          type="date"
          id="launch-day"
          name="launch-day"
          min={today}
          max="2040-12-31"
          defaultValue={today}
        />

        {/* mission name input */}
        <label htmlFor="mission-name">Mission Name</label>
        <input type="text" id="mission-name" name="mission-name" />

        {/* rocket type input */}
        <label htmlFor="rocket-name">Rocket Type</label>
        <input
          type="text"
          id="rocket-name"
          name="rocket-name"
          defaultValue="Explorer IS1"
        />

        {/* planet selector dropdown */}
        <label htmlFor="planets-selector">Destination Exoplanet</label>
        <select id="planets-selector" name="planets-selector">
          {selectorBody} {/* all planet option tags */}
        </select>

        {/* submit button wrapped in Clickable for sound */}
        <Clickable>
          <Button
            animate
            show={entered}
            type="submit"
            layer="success" // for button coloring purpose
            disabled={isPendingLaunch} // disable while waiting
          >
            Launch Mission ✔
          </Button>
        </Clickable>

        {/* show loading animation while submitting */}
        {isPendingLaunch && <Loading animate small />}
      </form>
    </Appear>
  );
};

export default Launch;
