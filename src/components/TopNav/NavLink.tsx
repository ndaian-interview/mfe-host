import React from "react";
import { Link } from "react-router-dom";

const NavLink: React.FC<{ to: string; label: string; active: boolean }> = ({ to, label, active }) => (
  <Link
    to={to}
    className={`rounded-md px-3 py-2 text-sm font-medium text-nowrap transition hover:text-slate-900 hover:bg-slate-100 dark:hover:text-slate-100 dark:hover:bg-slate-800 ${
      active ? "text-slate-900 underline underline-offset-[20px] decoration-4 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"
    }`}
  >
    {label}
  </Link>
);

export default NavLink;
