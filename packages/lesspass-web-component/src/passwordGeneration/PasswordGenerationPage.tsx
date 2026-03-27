import PasswordProfile from "./PasswordProfile";
import { useAppDispatch, useAppSelector } from "../store";
import { useLocation } from "react-router";
import { getPasswordProfileFromLocation } from "./url";
import { setSettings } from "../settings/settingsSlice";

export default function PasswordGenerationPage() {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const passwordProfileFromUrl = getPasswordProfileFromLocation(useLocation());

  if (passwordProfileFromUrl) {
    return (
      <div>
        <PasswordProfile
          passwordProfile={{ ...passwordProfileFromUrl }}
          focus={settings.focus}
        />
      </div>
    );
  }

  return (
    <div>
      <PasswordProfile
        passwordProfile={settings}
        focus={settings.focus}
        onClear={
          settings.isWebExtensionContext
            ? () => dispatch(setSettings({ site: "" }))
            : undefined
        }
      />
    </div>
  );
}
