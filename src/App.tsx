import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ModuleOneApp = lazy(() => import("@modules/module-one/App"));
const ModuleTwoApp = lazy(() => import("@modules/module-two/App"));

const Home: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Micro-Frontend Host Application</h1>
      <p>Welcome! This is the host application that loads remote modules.</p>
      <nav style={{ marginTop: "20px" }}>
        <ul style={{ listStyle: "none" }}>
          <li>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/module-one" style={linkStyle}>
              Module One
            </Link>
          </li>
          <li>
            <Link to="/module-two" style={linkStyle}>
              Module Two
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div style={containerStyle}>
        <header style={headerStyle}>
          <h1>Micro-Frontend Application</h1>
        </header>
        <main style={mainStyle}>
          <Suspense fallback={<div>Loading module...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/module-one/*" element={<ModuleOneApp />} />
              <Route path="/module-two/*" element={<ModuleTwoApp />} />
            </Routes>
          </Suspense>
        </main>
        <footer style={footerStyle}>
          <p>&copy; 2024 Micro-Frontend Application. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#282c34",
  color: "white",
  padding: "20px",
  textAlign: "center",
  borderBottom: "4px solid #61dafb",
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#282c34",
  color: "white",
  padding: "20px",
  textAlign: "center",
  borderTop: "1px solid #61dafb",
  marginTop: "20px",
};

const linkStyle: React.CSSProperties = {
  color: "#61dafb",
  textDecoration: "none",
  marginRight: "15px",
  fontSize: "16px",
};

export default App;
