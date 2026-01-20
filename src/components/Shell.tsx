import React, { Suspense, useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { MODULES, MODULE_KEYS, getModuleByPath, type ModuleKey, type RemoteModuleKey } from "../config/modules";
import TopNav from "./TopNav/TopNav";

const Empty: React.FC = () => null;

const Shell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentModule: ModuleKey = useMemo(() => {
    return getModuleByPath(location.pathname);
  }, [location.pathname]);

  const currentAction = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && MODULE_KEYS.includes(parts[0] as RemoteModuleKey)) {
      return parts[1];
    }
    return "";
  }, [location.pathname, currentModule]);

  return (
    <div data-testid="page" className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <TopNav currentModule={currentModule} />

      <div data-testid="page-under-header" className="mx-auto flex gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="w-64 shrink-0 rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Sidebar currentModule={currentModule} currentAction={currentAction} onNavigate={navigate} />
        </aside>

        <main className="flex-1 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <Suspense fallback={<div className="text-slate-600 dark:text-slate-400">Loading module...</div>}>
            <Routes>
              <Route path="/" element={<Empty />} />
              {MODULE_KEYS.map((key) => {
                const ModuleComponent = MODULES[key].component;
                return <Route key={key} path={`${MODULES[key].path}/*`} element={<ModuleComponent />} />;
              })}
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Shell;
