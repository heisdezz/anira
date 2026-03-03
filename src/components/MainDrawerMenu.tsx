import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function MainDrawerMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const drawer_input = document.getElementById(
      "my-drawer-1",
    ) as HTMLInputElement | null;
    if (!drawer_input) return;

    const onChange = (e: Event) => {
      setDrawerOpen((e.target as HTMLInputElement).checked);
    };

    setDrawerOpen(drawer_input.checked);
    drawer_input.addEventListener("change", onChange);

    return () => {
      drawer_input.removeEventListener("change", onChange);
    };
  }, []);

  const handleClick = () => {
    const drawer_input = document.getElementById(
      "my-drawer-1",
    ) as HTMLInputElement | null;
    if (drawer_input) drawer_input.click();
  };

  return (
    <div>
      <button className="btn btn-ghost btn-square" onClick={handleClick}>
        {drawerOpen ? <XIcon /> : <MenuIcon />}
      </button>
    </div>
  );
}
