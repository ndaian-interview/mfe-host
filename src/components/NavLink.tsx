import React from "react";
import { Link } from "react-router-dom";

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

export default NavLink;
