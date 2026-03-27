import { Outlet } from "react-router";
import Alerts from "./alerts/Alerts";
import Header from "./components/Header";

export default function Page() {
  return (
    <div>
      <Alerts />
      <Header />
      <div className="mx-auto max-w-lg p-4 lg:p-6">
        <Outlet />
      </div>
    </div>
  );
}
