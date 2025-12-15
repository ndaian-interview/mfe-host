// Module declarations generated from config/modules.ts
declare module "@modules/module-one/App" {
  import { FC } from "react";
  const App: FC;
  export default App;
}

declare module "@modules/module-one/actions" {
  import type { Action } from "@shared/types";
  export const MODULE_ONE_ACTIONS: Action[];
}

declare module "@modules/module-two/App" {
  import { FC } from "react";
  const App: FC;
  export default App;
}

declare module "@modules/module-two/actions" {
  import type { Action } from "@shared/types";
  export const MODULE_TWO_ACTIONS: Action[];
}
