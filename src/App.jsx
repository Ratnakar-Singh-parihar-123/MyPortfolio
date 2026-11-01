import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./components/ThemeProvider";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";

function App() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // triggers split open
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      <Routes />
      {showLoader && (
        <Loader
          text="Loading"
          isOpen={!loading}
          onOpened={() => setShowLoader(false)}
        />
      )}
    </ThemeProvider>
  );
}

export default App;
