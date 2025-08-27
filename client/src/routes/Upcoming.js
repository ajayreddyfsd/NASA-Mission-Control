//$ This component is same as History-component but shows the list of upcoming missions
//$ Users can see all upcoming launches and abort a mission if needed

/*
Props of Upcoming component:

1. entered (boolean)
   - Indicates whether the page animation has entered.
   - Used to control Arwes <Appear> animation and table animation.

2. launches (array)
   - Array of launch objects.
   - Each launch object typically has:
     {
       flightNumber: number,   // unique ID of the launch
       launchDate: string,     // ISO date of the launch
       mission: string,        // mission name
       rocket: string,         // rocket type
       target: string,         // destination planet
       upcoming: boolean       // true if the launch is upcoming
     }
   - Only launches with upcoming=true are displayed in the table.

3. classes (object)
   - Object containing CSS class names injected by withStyles.
   - For example: classes.link is applied to the abort ✖ link.

4. abortLaunch (function)
   - Function to abort a launch.
   - Called with a flightNumber when the user clicks the ✖ link.
   - Example usage: abortLaunch(42)
*/

import { useMemo } from "react"; //! so we don't keep running the same function again and again for the same inputs
import { withStyles, Appear, Link, Paragraph, Table, Words } from "arwes"; // Arwes UI components
import Clickable from "../components/Clickable"; // clickable link with sound

// styles for the component
const styles = () => ({
  link: {
    color: "red", // red color for abort link
    textDecoration: "none", // remove underline
  },
});

//! helper component
//! helper component
//! helper component
//! helper component
const Helper = ({ launches, abortLaunch, classes }) => {
  // useMemo to only recalc only when launches or abortLaunch changes
  return useMemo(() => {
    //! so for each upcoming-launch-object, we return a tr-tag
    //! so at the end we will have a bunch of tr-tags
    return launches
      ?.filter((launch) => launch.upcoming)
      .map((launch) => (
        <tr key={String(launch.flightNumber)}>
          <td>
            <Clickable style={{ color: "red" }}>
              <Link
                className={classes.link}
                onClick={() => abortLaunch(launch.flightNumber)}
              >
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.flightNumber}</td>
          <td>{new Date(launch.launchDate).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>
      ));
  }, [launches, abortLaunch, classes.link]); //! whatever external things we have used inside, we need to pass them into this dep-array
};

//! main component
//! main component
//! main component
//! main component
const Upcoming = (props) => {
  const { entered, launches, classes, abortLaunch } = props;

  return (
    // Appear: to animate appearance of the content
    <Appear id="upcoming" animate show={entered}>
      <Paragraph>
        Upcoming missions including both SpaceX launches and newly scheduled
        Zero to Mastery rockets.
      </Paragraph>
      <Words animate>Warning! Clicking on the ✖ aborts the mission.</Words>

      {/* Table showing all upcoming missions */}
      {/* Table is the custom-table-react-component and table is the html-tag */}
      <Table animate show={entered}>
        <table style={{ tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th style={{ width: "3rem" }}></th> {/* abort button */}
              <th style={{ width: "3rem" }}>No.</th> {/* flight number */}
              <th style={{ width: "10rem" }}>Date</th>
              <th style={{ width: "11rem" }}>Mission</th>
              <th style={{ width: "11rem" }}>Rocket</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            <Helper
              launches={launches}
              abortLaunch={abortLaunch}
              classes={classes}
            />
          </tbody>
        </table>
      </Table>
    </Appear>
  );
};

// export with styles applied
export default withStyles(styles)(Upcoming);
