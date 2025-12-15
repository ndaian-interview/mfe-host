import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Shell from "./components/Shell";

const App: React.FC = () => (
  <Router>
    <Shell />
  </Router>
);

export default App;
