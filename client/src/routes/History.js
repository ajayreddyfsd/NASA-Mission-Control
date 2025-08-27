//$ This component shows the history of past launches as a table
//$ this has 2 helper components and one main component
//$ helper: HistoryTableRow-component returns the table row
//$ helper: HistoryTable-component returns the table
//$ main  : History-component also returns the table but with some basic page-layout-tags

/*
  Props explanation for History component:

  1️⃣ launches
    - Type: Array of objects
    - What it is: All the launch data we want to show in the table
    - Each launch object usually contains:
        {
          flightNumber: 1,           // number of the flight
          mission: "FalconSat",      // mission name
          rocket: "Falcon 1",        // rocket used
          launchDate: "2006-03-24T22:30:00.000Z", // date of launch
          customers: ["NASA"],       // list of customers
          upcoming: false,           // true if launch is in future
          success: false             // true if launch was successful
        }
    - Usage: HistoryTable filters past launches (upcoming: false) and creates rows in the table.

  2️⃣ entered
    - Type: Boolean (true/false)
    - What it is: Controls whether the component content should appear with animation
    - Comes from: Arwes Appear animation component
    - Usage: 
        <Appear animate show={entered}>
          ...content...
        </Appear>
      - If entered === true → content appears with animation
      - If entered === false → content stays hidden until animation triggers
*/

import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

//! ---------- single table row for one launch object ----------
//! ---------- single table row for one launch object ----------
//! ---------- single table row for one launch object ----------
//! ---------- single table row for one launch object ----------
//$ we are passing a single launch object to this component,
//$ which just extract the data and makes a table-row out of it and returns the table-row
const HistoryTableRow = ({ launch }) => {
  // get values from launch object
  const { flightNumber, launchDate, mission, rocket, customers, success } =
    launch;

  return (
    <tr key={String(flightNumber)}>
      {/* colored block: green = success, red = failure */}
      <td>
        <span style={{ color: success ? "greenyellow" : "red" }}>█</span>
      </td>
      <td>{flightNumber}</td> {/* flight number */}
      <td>{new Date(launchDate).toDateString()}</td> {/* formatted date */}
      <td>{mission}</td> {/* mission name */}
      <td>{rocket}</td> {/* rocket name */}
      <td>{customers?.join(", ")}</td> {/* list of customers */}
    </tr>
  );
};

//! ---------- table showing all past launches ----------
//! ---------- table showing all past launches ----------
//! ---------- table showing all past launches ----------
//! ---------- table showing all past launches ----------
//$ we pass all the launch objects to this comp, it returns a proper table
//$ but before that it filters out the launches-object to include only the past ones and not upcoming ones
const HistoryTable = ({ launches }) => {
  // filter launches to get only past launches (not upcoming)
  const pastLaunches = useMemo(() => {
    return launches?.filter((launch) => !launch.upcoming);
  }, [launches]);

  return (
    //! Table is the custom-react-component and table is the html-tag
    <Table animate>
      <table style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "2rem" }}></th> {/* colored block */}
            <th style={{ width: "3rem" }}>No.</th> {/* flight number */}
            <th style={{ width: "9rem" }}>Date</th> {/* launch date */}
            <th>Mission</th>
            <th style={{ width: "7rem" }}>Rocket</th>
            <th>Customers</th>
          </tr>
        </thead>
        <tbody>
          {/* make a row for each past launch */}
          {pastLaunches?.map((launch) => (
            <HistoryTableRow key={launch.flightNumber} launch={launch} />
          ))}
        </tbody>
      </table>
    </Table>
  );
};

//! ---------- main History component ----------
//! ---------- main History component ----------
//! ---------- main History component ----------
//! ---------- main History component ----------
const History = ({ launches, entered }) => {
  return (
    <article id="history">
      {/* Appear component animates content */}
      <Appear animate show={entered}>
        {/* small description */}
        <Paragraph>
          History of mission launches including SpaceX launches starting from
          the year 2006.
        </Paragraph>
        {/* table with all past launches */}
        <HistoryTable launches={launches} />
      </Appear>
    </article>
  );
};

export default History;
