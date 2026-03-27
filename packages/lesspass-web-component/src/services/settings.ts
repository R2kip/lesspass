import { defaultPasswordProfile, PasswordProfile } from "lesspass";
import { SettingsState } from "../settings/settingsSlice";
import { LESSPASS_SETTINGS, LESSPASS_SITE_PROFILES } from "./constant";
import { cleanSite } from "./site";

export type SiteProfile = Omit<PasswordProfile, "site">;

function getAllSiteProfiles(): Record<string, SiteProfile> {
  try {
    const data = window.localStorage.getItem(LESSPASS_SITE_PROFILES);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveSiteProfile(site: string, profile: SiteProfile) {
  if (!site) return;
  try {
    const profiles = getAllSiteProfiles();
    window.localStorage.setItem(
      LESSPASS_SITE_PROFILES,
      JSON.stringify({ ...profiles, [site]: profile }),
    );
  } catch (error) {
    console.error(`Error saving site profile:`, error);
  }
}

export function getSiteProfile(site: string): SiteProfile | null {
  if (!site) return null;
  try {
    const profiles = getAllSiteProfiles();
    return profiles[site] ?? null;
  } catch {
    return null;
  }
}

export function saveSettings(settings: SettingsState) {
  try {
    window.localStorage.setItem(LESSPASS_SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error(`Error can't set settings:`, settings, error);
  }
}

export const defaultSettings: SettingsState = {
  ...defaultPasswordProfile,
  encryptMasterPasswordAtLogin: true,
  focus: "auto",
  isWebExtensionContext: false,
  removeSubDomain: false,
  removeTopLevelDomain: false,
};

export function getSettings(
  userSettings: Partial<SettingsState> = {},
): SettingsState {
  try {
    const settings = window.localStorage.getItem(LESSPASS_SETTINGS);
    if (settings) {
      const savedSettings = JSON.parse(settings);
      return cleanSite({
        ...defaultSettings,
        ...savedSettings,
        ...userSettings,
      });
    }
    return { ...defaultSettings, ...userSettings };
  } catch (error) {
    return { ...defaultSettings };
  }
}
