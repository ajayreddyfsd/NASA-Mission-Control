//$ ✅ Key idea: This component makes a box centered on the page and adjusts its margin for smaller screens.
//$ You just put anything inside < Centered >…</ > and it will stay centered.

// importing a helper from arwes library to add styles to our component
import { withStyles } from "arwes";

// defining our CSS styles in a JavaScript object
const styles = () => ({
  root: {
    // main style for the container
    margin: "0 auto", // center horizontally on the page
    maxWidth: 800, // maximum width is 800 pixels
  },
  "@media (max-width: 800px)": {
    // if screen width is 800px or less (like phone or small tablet)
    root: {
      margin: "0 12px", // give some space on left and right
    },
  },
});

// this is a React component that will put its children in a centered box
const Centered = (props) => {
  const {
    classes, // classes coming from withStyles
    className, // any extra class name we pass
    children, // the stuff we put inside this component
    ...rest // any other props we pass along
  } = props;

  return (
    // div that combines our styles + any extra class
    <div className={`${classes.root} ${className}`} {...rest}>
      {children} {/* show whatever is inside this component */}
    </div>
  );
};

// wrapping our component with withStyles so it gets the styles we defined
export default withStyles(styles)(Centered);
