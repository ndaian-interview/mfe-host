import React, { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

const ModuleOneApp = lazy(() => import("@modules/module-one/App"));
const ModuleTwoApp = lazy(() => import("@modules/module-two/App"));

type ModuleKey = "home" | "module-one" | "module-two";

const moduleActions: Record<ModuleKey, { label: string; action: string }[]> = {
  home: [],
  "module-one": [
    { label: "Sort Users", action: "module-one/sort-users" },
    { label: "Insert User", action: "module-one/insert-user" },
  ],
  "module-two": [
    { label: "View Cards", action: "module-two/view-cards" },
    { label: "Add Card", action: "module-two/add-card" },
  ],
};

const Home: React.FC = () => (
  <div className="space-y-3">
    <h1 className="text-2xl font-semibold text-slate-900">Micro-Frontend Host Application</h1>
    <p className="text-slate-600">Welcome! This is the host application that loads remote modules.</p>
    <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-600">
      Use the top navigation to open Module One or Module Two. Module-specific actions will appear in the left sidebar.
    </div>
  </div>
);

const NavLink: React.FC<{ to: string; label: string; active: boolean }> = ({ to, label, active }) => (
  <Link
    to={to}
    className={`rounded-md px-3 py-2 text-sm font-medium transition hover:text-slate-900 hover:bg-slate-100 ${
      active ? "bg-slate-900 text-white" : "text-slate-700"
    }`}
  >
    {label}
  </Link>
);

const Sidebar: React.FC<{ current: ModuleKey }> = ({ current }) => {
  const actions = moduleActions[current];

  if (!actions.length) {
    return (
      <div className="p-4 text-sm text-slate-500">
        Select a module to see available actions (e.g., sort users or insert user).
      </div>
    );
  }

  return (
    <nav className="p-4 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Module actions</p>
      <ul className="space-y-2">
        {actions.map((item) => (
          <li key={item.action}>
            <button
              type="button"
              onClick={() => console.info(`Action triggered: ${item.action}`)}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Shell: React.FC = () => {
  const location = useLocation();

  const currentModule: ModuleKey = useMemo(() => {
    if (location.pathname.startsWith("/module-one")) return "module-one";
    if (location.pathname.startsWith("/module-two")) return "module-two";
    return "home";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
          <div className="text-sm font-semibold text-slate-900">Micro-Frontend Host</div>
          <nav className="flex items-center gap-2">
            <NavLink to="/" label="Home" active={currentModule === "home"} />
            <NavLink to="/module-one" label="Module One" active={currentModule === "module-one"} />
            <NavLink to="/module-two" label="Module Two" active={currentModule === "module-two"} />
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="w-64 shrink-0 rounded-lg border border-slate-200 bg-white shadow-sm">
          <Sidebar current={currentModule} />
        </aside>

        <main className="flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Suspense fallback={<div className="text-slate-600">Loading module...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/module-one/*" element={<ModuleOneApp />} />
              <Route path="/module-two/*" element={<ModuleTwoApp />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <Shell />
  </Router>
);

export default App;
