import React, { useEffect, useState } from "react";
import type { Action } from "@shared/types";
import { loadModuleActions, type ModuleKey, type RemoteModuleKey } from "../config/modules";

interface SidebarProps {
  currentModule: ModuleKey;
  currentAction: string;
  onNavigate: (to: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, currentAction, onNavigate }: SidebarProps) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentModule === "home") {
      setActions([]);
      return;
    }

    setLoading(true);
    loadModuleActions(currentModule as RemoteModuleKey)
      .then(setActions)
      .catch(() => setActions([]))
      .finally(() => setLoading(false));
  }, [currentModule]);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500 dark:text-slate-400">Loading actions...</div>;
  }

  if (!actions.length) {
    return (
      <div className="p-4 text-sm text-slate-500 dark:text-slate-400">
        Select a module to see available actions (e.g., dashboard or view).
      </div>
    );
  }

  return (
    <nav className="p-4 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Module actions</p>
      <ul className="space-y-2">
        {actions.map((item) => {
          const active = currentAction === item.slug;
          return (
            <li key={item.slug}>
              <button
                type="button"
                onClick={() => onNavigate(`/${currentModule}/${item.slug}`)}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm font-medium shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:hover:border-slate-600 dark:hover:bg-slate-700 ${
                  active ? "border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100" : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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

export default Sidebar;
