import "./App.css";
import { Routes, Route } from "react-router";
import PasswordGenerationPage from "./passwordGeneration/PasswordGenerationPage";
import Page404 from "./Page404";
import SettingsPage from "./settings/SettingsPage";
import Page from "./Page";

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Page />}>
          <Route index element={<PasswordGenerationPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>
  );
}
