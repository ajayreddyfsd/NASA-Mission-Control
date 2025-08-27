//$ ✅ Key idea: This component shows a centered footer message at the bottom of the page with a small note about the project.
//$ basically, we have this custom-P-tag, which we are centering using <Centered> comp and displaying it through custom-footer comp.

// import Footer and Paragraph components from arwes library
import { Footer as ArwesFooter, Paragraph } from "arwes";
// import the Centered component we made earlier
import Centered from "./Centered";

// this is our custom Footer component
const Footer = () => {
  return (
    // ArwesFooter is a pre-made footer component from arwes, animate makes it look nice
    <ArwesFooter animate>
      {/* use our Centered component to put content in the center */}
      <Centered>
        {/* Paragraph is like a <p>, we make font smaller and add some space */}
        <Paragraph style={{ fontSize: 14, margin: "10px 0" }}>
          This is not an official site and is not affiliated with NASA or SpaceX
          in any way. It is just a self study project to practice backend
          development.
        </Paragraph>
      </Centered>
    </ArwesFooter>
  );
};

// export so we can use Footer in other parts of our app
export default Footer;
