import React from "react";
import { MODULE_KEYS, ModuleKey, MODULES } from "@/config/modules";
import NavLink from "./NavLink";
import Logo from "./Logo";

interface Props {
  currentModule: ModuleKey;
}

const TopNav: React.FC<Props> = ({ currentModule }: Props) => {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-6 border-b border-slate-200 bg-white/95 backdrop-blur px-4 sm:px-6 lg:px-8">
      <Logo />
      <nav className="flex items-center gap-2">
        <NavLink to="/" label="Home" active={currentModule === "home"} />
        {MODULE_KEYS.map((key) => (
          <NavLink key={key} to={MODULES[key].path} label={MODULES[key].label} active={currentModule === key} />
        ))}
      </nav>
    </header>
  );
};

export default TopNav;
