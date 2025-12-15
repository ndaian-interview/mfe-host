import React, { useEffect, useState } from "react";
import type { Action } from "@shared/types";
import type { ModuleKey } from "../types";

const loadModuleActions = async (module: "module-one" | "module-two"): Promise<Action[]> => {
  if (module === "module-one") {
    const { MODULE_ONE_ACTIONS } = await import("@modules/module-one/actions");
    return MODULE_ONE_ACTIONS;
  } else {
    const { MODULE_TWO_ACTIONS } = await import("@modules/module-two/actions");
    return MODULE_TWO_ACTIONS;
  }
};

interface SidebarProps {
  current: ModuleKey;
  currentAction: string;
  onNavigate: (to: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ current, currentAction, onNavigate }: SidebarProps) => {
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (current === "home") {
      setActions([]);
      return;
    }

    setLoading(true);
    loadModuleActions(current)
      .then(setActions)
      .catch(() => setActions([]))
      .finally(() => setLoading(false));
  }, [current]);

  if (loading) {
    return <div className="p-4 text-sm text-slate-500">Loading actions...</div>;
  }

  if (!actions.length) {
    return (
      <div className="p-4 text-sm text-slate-500">
        Select a module to see available actions (e.g., dashboard or view).
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

export default Sidebar;
