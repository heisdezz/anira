import type { PropsWithChildren } from "react";
import AppDrawer from "./drawers/AppDrawer";

export default function AppLayout(props: PropsWithChildren) {
  return (
    <div className="drawer">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}

        {/*<label htmlFor="my-drawer-1" className="btn drawer-button">
          Open drawer
        </label>*/}
        {props.children}
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <AppDrawer />
      </div>
    </div>
  );
}
