//$ ✅ Key idea: This component plays a sound and runs a function when you click anything inside it.
//$ basically, we pass anything to this comp, it wraps it in span, and does such that when we click it, it makes sounds

// import a helper from arwes to play sounds
import { withSounds } from "arwes";

// this is a React component that makes something clickable with a sound
const Clickable = (props) => {
  const {
    children, // the stuff we put inside this component
    sounds, // the sounds passed from withSounds
    onClick, // the function to run when we click
    ...rest // any other props we pass
  } = props;

  // this function will run when we click
  const clickWithSound = (e) => {
    sounds.click && sounds.click.play(); // if there is a click sound, play it
    onClick && onClick(e); // if there is a click handler, run it
  };

  return (
    // a span that runs clickWithSound when clicked
    <span {...rest} onClick={clickWithSound}>
      {children} {/* show whatever is inside this component */}
    </span>
  );
};

// wrap the component so it can use sounds
export default withSounds()(Clickable);
