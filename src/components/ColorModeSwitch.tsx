import React, { useEffect, useState } from "react";

const ColorModeSwitch = () => {
  // Initialize from localStorage or system preference immediately
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("theme", mode);
  }, [mode]);

  const isDark = mode === "dark";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setMode(isDark ? "light" : "dark")}
        className="relative inline-flex h-6 w-11 items-center rounded-full border border-slate-400 bg-slate-200 transition dark:border-slate-600 dark:bg-slate-700"
      >
        <span
          className={
            "inline-block h-4 w-4 transform rounded-full bg-white shadow transition " +
            (isDark ? "translate-x-5" : "translate-x-1")
          }
        />
      </button>
      <span className="whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">
        {isDark ? "Light Mode" : "Dark Mode"}
      </span>
    </div>
  );
};

export default ColorModeSwitch;
