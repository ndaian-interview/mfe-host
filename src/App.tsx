import React, { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

const ModuleOneApp = lazy(() => import("@modules/module-one/App"));
const ModuleTwoApp = lazy(() => import("@modules/module-two/App"));

type ModuleKey = "home" | "module-one" | "module-two";

const moduleActions: Record<ModuleKey, { label: string; slug: string }[]> = {
  home: [],
  "module-one": [
    { label: "Sort Users", slug: "sort-users" },
    { label: "Insert User", slug: "insert-user" },
  ],
  "module-two": [
    { label: "View Cards", slug: "view-cards" },
    { label: "Add Card", slug: "add-card" },
  ],
};

// Host main area intentionally renders no standalone content.

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

const Sidebar: React.FC<{
  current: ModuleKey;
  currentAction: string;
  onNavigate: (to: string) => void;
}> = ({ current, currentAction, onNavigate }) => {
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
        {actions.map((item) => {
          const active = currentAction === item.slug;
          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => onNavigate(`/${current}/${item.slug}`)}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm font-medium shadow-sm transition hover:border-slate-300 hover:bg-slate-50 ${
                  active ? "border-slate-300 bg-slate-100 text-slate-900" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const Empty: React.FC = () => null;

const ModuleOnePage: React.FC = () => {
  return <ModuleOneApp />;
};

const ModuleTwoPage: React.FC = () => {
  return <ModuleTwoApp />;
};

const Shell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentModule: ModuleKey = useMemo(() => {
    if (location.pathname.startsWith("/module-one")) return "module-one";
    if (location.pathname.startsWith("/module-two")) return "module-two";
    return "home";
  }, [location.pathname]);

  // derive action segment from the path: /module-one/<action>
  const currentAction = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && (parts[0] === "module-one" || parts[0] === "module-two")) {
      return parts[1];
    }
    return "";
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
          <Sidebar current={currentModule} currentAction={currentAction} onNavigate={navigate} />
        </aside>

        <main className="flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <Suspense fallback={<div className="text-slate-600">Loading module...</div>}>
            <Routes>
              <Route path="/" element={<Empty />} />
              <Route path="/module-one/*" element={<ModuleOnePage />} />
              <Route path="/module-two/*" element={<ModuleTwoPage />} />
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
