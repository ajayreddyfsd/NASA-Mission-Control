//$ this component basically creates a fancy header strip by importing so many custom-react-components from arwes library
//$ the header strp basically has an image, a logo and a navigation strip.
//$ all these are centered using the <Centered> component and all these are inside the customer-header-comp: <ArwesHeader>

//$ first one is basic image, next one is logo displayed using custom-logo-comp, next one is displaying title using custom-comp
//$ inside navigation, we have just a group of Link-tags wrapped in custom-comps

// import components from arwes and react-router-dom
import {
  Logo, // small logo graphic
  Words, // styled text
  Header as ArwesHeader, // pre-made header component
  Highlight, // fancy highlight effect for buttons
  withStyles, // helper to add CSS styles
} from "arwes";
import { Link } from "react-router-dom"; // for navigation links
import Clickable from "./Clickable"; // to make any component clickable-with-sound
import Centered from "./Centered"; // to make any component centered

// define styles for the header
const styles = (theme) => ({
  root: {
    // main container
    display: "flex", // horizontal layout
    flexDirection: "row", // keep items in a row
    lineHeight: "80px", // height of each line
  },
  logo: {
    // style for the Logo component
    display: "inherit",
    marginTop: "15px",
  },
  nav: {
    // style for navigation area
    display: "inherit",
  },
  banner: {
    // big text "NASA Mission Control"
    display: "inherit",
    fontWeight: "bold",
    marginLeft: "10px",
    marginRight: "15px",
    fontSize: 28,
  },
  clickable: {
    // clickable buttons
    fontSize: 21,
    "& i": {
      // icons inside buttons
      marginRight: theme.padding / 2,
      fontSize: 24,
    },
  },
  link: {
    // style for <Link> components
    color: theme.color.content,
    textDecoration: "none",
  },
  button: {
    // highlight buttons
    padding: [0, theme.padding / 2],
  },
  "@media (max-width: 800px)": {
    // small screen adjustments
    logo: { display: "none" },
    img: { display: "none" },
    banner: { display: "none" },
    button: { padding: [0, 8] },
    clickable: { fontSize: 16 },
  },
});

// Header component
const Header = (props) => {
  const { classes, onNav, ...rest } = props;

  return (
    // ArwesHeader provides fancy header animation
    <ArwesHeader animate>
      {/* center all header content */}
      <Centered className={classes.root} {...rest}>
        {/* favicon image */}
        <img
          src="/favicon.png"
          alt=""
          className={classes.img}
          style={{
            margin: "15px 10px 15px 0",
            height: "50px",
            width: "auto",
          }}
        />

        {/* Arwes logo */}
        <Logo animate size={50} className={classes.logo} layer="header" />

        {/* big header text */}
        <Words animate className={classes.banner}>
          NASA Mission Control
        </Words>

        {/* navigation buttons */}
        <nav className={`${classes.nav}`}>
          {/* each button is clickable + highlighted + a link */}
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/launch">
                <i className="material-icons">check_circle_outline</i>Launch
              </Link>
            </Highlight>
          </Clickable>

          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/upcoming">
                <i className="material-icons">update</i>Upcoming
              </Link>
            </Highlight>
          </Clickable>

          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/history">
                <i className="material-icons">history</i>History
              </Link>
            </Highlight>
          </Clickable>
        </nav>
      </Centered>
    </ArwesHeader>
  );
};

// wrap Header with withStyles to give it the styles defined above
export default withStyles(styles)(Header);
