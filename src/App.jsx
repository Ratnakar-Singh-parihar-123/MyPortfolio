import React, { useEffect, useState } from "react";
import Routes from "./Routes";
import { ThemeProvider } from "./components/ThemeProvider";
import Loader from "./components/Loader"; // apna custom loader

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return <ThemeProvider>{loading ? <Loader /> : <Routes />}</ThemeProvider>;
}

export default App;
