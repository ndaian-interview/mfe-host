import React, { Suspense, lazy, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import NavLink from "./NavLink";
import Sidebar from "./Sidebar";
import type { ModuleKey } from "../types";

const ModuleOneApp = lazy(() => import("@modules/module-one/App"));
const ModuleTwoApp = lazy(() => import("@modules/module-two/App"));

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

export default Shell;
