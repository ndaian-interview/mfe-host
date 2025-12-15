import { lazy } from "react";
import type React from "react";
import type { Action } from "@shared/types";

// Host ModuleKey includes "home" for the landing page
export type ModuleKey = "home" | "module-one" | "module-two";

// Remote modules exclude "home"
export type RemoteModuleKey = Exclude<ModuleKey, "home">;

export interface ModuleConfig {
  key: RemoteModuleKey;
  label: string;
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  actionsLoader: () => Promise<Action[]>;
}

export const MODULES: Record<RemoteModuleKey, ModuleConfig> = {
  "module-one": {
    key: "module-one",
    label: "Module One",
    path: "/module-one",
    component: lazy(() => import("@modules/module-one/App")),
    actionsLoader: async () => {
      const { MODULE_ONE_ACTIONS } = await import("@modules/module-one/actions");
      return MODULE_ONE_ACTIONS;
    },
  },
  "module-two": {
    key: "module-two",
    label: "Module Two",
    path: "/module-two",
    component: lazy(() => import("@modules/module-two/App")),
    actionsLoader: async () => {
      const { MODULE_TWO_ACTIONS } = await import("@modules/module-two/actions");
      return MODULE_TWO_ACTIONS;
    },
  },
};

export const MODULE_KEYS = Object.keys(MODULES) as RemoteModuleKey[];

export const getModuleByPath = (pathname: string): ModuleKey => {
  for (const key of MODULE_KEYS) {
    if (pathname.startsWith(MODULES[key].path)) {
      return key;
    }
  }
  return "home";
};

export const loadModuleActions = async (module: RemoteModuleKey): Promise<Action[]> => {
  const config = MODULES[module];
  return config.actionsLoader();
};
