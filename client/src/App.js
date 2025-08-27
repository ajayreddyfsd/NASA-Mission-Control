import { BrowserRouter } from "react-router-dom"; // wrapper for routing pages
import {
  Arwes, //? need to use this wrapper-tag for app.js
  SoundsProvider, //? need to use this wrapper-tag for app.js
  ThemeProvider, //? need to use this wrapper-tag for app.js
  createSounds,
  createTheme,
} from "arwes"; // Arwes UI library

//! helper component for app.js
//! this has eveything that we expect inside App.js
import AppLayout from "./routes/AppLayout";
import { theme, resources, sounds } from "./settings"; // custom settings

const App = () => {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Arwes
          animate
          background={resources.background.large}
          pattern={resources.pattern}
        >
          {(anim) => (
            // Router wrapper
            <BrowserRouter>
              {/* AppLayout - the helper component of the App.js which has everything that we expect inside App.js */}
              <AppLayout show={anim.entered} />
            </BrowserRouter>
          )}
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
};

// export App so index.js can render it
export default App;
