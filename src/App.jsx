import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./components/ThemeProvider";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Cursor />
      {loading ? <Loader /> : <Routes />}
    </ThemeProvider>
  );
}

export default App;
