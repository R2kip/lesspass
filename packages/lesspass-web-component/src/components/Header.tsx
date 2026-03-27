import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../images/logo-white.png";
import { useAppDispatch } from "../store";
import { ReactNode } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import DarkLightToggleButton from "./DarkLightToggleButton";
import { setSettings } from "../settings/settingsSlice";

const LessPassNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "text-xs border px-2 py-1.5 rounded-md whitespace-nowrap text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white",
    isActive
      ? "text-gray-100 bg-gray-700 border-gray-600"
      : "border-transparent bg-transparent",
  ].join(" ");

const LessPassNavLink = ({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) => {
  return (
    <NavLink to={to} className={LessPassNavLinkClass}>
      {children}
    </NavLink>
  );
};

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Disclosure as="nav" className="bg-gray-900">
      <div className="mx-auto max-w-lg px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-block rounded-md p-1 focus:ring focus:ring-gray-500 focus:outline-hidden"
              onClick={() => {
                dispatch(setSettings({ site: "" }));
                navigate("/");
              }}
            >
              <img alt="LessPass" src={Logo} className="h-[25px] w-[110px]" />
            </button>
            <div className="xs:ml-3 xs:block hidden">
              <div className="flex items-center space-x-1">
                <LessPassNavLink to="/settings">
                  {t("Header.settings")}
                </LessPassNavLink>
              </div>
            </div>
          </div>
          <div className="xs:ml-3 xs:block hidden">
            <DarkLightToggleButton />
          </div>
          <div className="xs:hidden -mr-2 flex items-center gap-2">
            <DarkLightToggleButton />
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-full p-2 text-gray-100 focus:ring focus:ring-gray-500 focus:outline-hidden">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="xs:hidden">
        <div className="flex flex-col space-y-5 p-5">
          <LessPassNavLink to="/settings">
            {t("Header.settings")}
          </LessPassNavLink>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
