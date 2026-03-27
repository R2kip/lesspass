import { describe, test, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { render } from "./tests/renders";
import { LessPassWebComponentInMemory } from "./LessPassWebComponent";
import { defaultSettings, saveSettings, saveSiteProfile } from "./services/settings";

describe("LessPassWebComponentInMemory web extension context", () => {
  function renderWebExtension() {
    return render(
      <LessPassWebComponentInMemory
        settings={{
          site: "www.example.org",
          focus: "login",
          isWebExtensionContext: true,
        }}
      />,
    );
  }

  test("Display site provided by the web extension", async () => {
    const { findByLabelText, getByLabelText } = renderWebExtension();
    await findByLabelText("Site");
    expect(getByLabelText("Site")).toHaveValue("www.example.org");
    expect(getByLabelText("Login")).toHaveFocus();
    expect(getByLabelText("0-9")).toBeChecked();
  });

  test("Clear site if user click on the clear button", async () => {
    const { user, findByLabelText, getByRole, getByLabelText } =
      renderWebExtension();
    await findByLabelText("Site");
    expect(getByLabelText("Site")).toHaveValue("www.example.org");
    await user.click(getByRole("button", { name: /clear/i }));
    expect(getByLabelText("Site")).toHaveValue("");
  });

  test("Display site without subdomain if removeSubDomain is true", async () => {
    saveSettings({
      ...defaultSettings,
      removeSubDomain: true,
      removeTopLevelDomain: false,
    });
    const { findByLabelText, getByLabelText } = renderWebExtension();
    await findByLabelText("Site");
    expect(getByLabelText("Site")).toHaveValue("example.org");
  });

  test("Display site without tld if removeTopLevelDomain is true", async () => {
    saveSettings({
      ...defaultSettings,
      removeSubDomain: false,
      removeTopLevelDomain: true,
    });
    const { findByLabelText, getByLabelText } = renderWebExtension();
    await findByLabelText("Site");
    expect(getByLabelText("Site")).toHaveValue("www.example");
  });

  test("Display site without subdomain and tld if removeSubDomain and removeTopLevelDomain are true", async () => {
    saveSettings({
      ...defaultSettings,
      removeSubDomain: true,
      removeTopLevelDomain: true,
    });
    const { findByLabelText, getByLabelText } = renderWebExtension();
    await findByLabelText("Site");
    expect(getByLabelText("Site")).toHaveValue("example");
  });

  test("Load per-site settings from localStorage in web extension context", async () => {
    saveSiteProfile("www.example.org", {
      login: "contact@example.org",
      lowercase: true,
      uppercase: true,
      symbols: true,
      digits: false,
      counter: 1,
      length: 16,
    });
    const { findByLabelText, getByLabelText } = renderWebExtension();
    await findByLabelText("Site");
    await waitFor(() =>
      expect(getByLabelText("Login")).toHaveValue("contact@example.org"),
    );
    expect(getByLabelText("a-z")).toBeChecked();
    expect(getByLabelText("A-Z")).toBeChecked();
    expect(getByLabelText("%!@")).toBeChecked();
    expect(getByLabelText("0-9")).not.toBeChecked();
  });

  test("Load per-site settings matching removeSubDomain and removeTopLevelDomain", async () => {
    saveSettings({
      ...defaultSettings,
      removeSubDomain: true,
      removeTopLevelDomain: true,
    });
    saveSiteProfile("example", {
      login: "contact@example.org",
      lowercase: false,
      uppercase: false,
      symbols: false,
      digits: true,
      counter: 1,
      length: 8,
    });
    const { findByLabelText, getByLabelText } = renderWebExtension();
    await findByLabelText("Site");
    await waitFor(() =>
      expect(getByLabelText("Site")).toHaveValue("example"),
    );
    await waitFor(() =>
      expect(getByLabelText("Login")).toHaveValue("contact@example.org"),
    );
    expect(getByLabelText("a-z")).not.toBeChecked();
    expect(getByLabelText("A-Z")).not.toBeChecked();
    expect(getByLabelText("%!@")).not.toBeChecked();
    expect(getByLabelText("0-9")).toBeChecked();
  });

  test("if user click on LessPass logo, site is cleared and user is redirected to the main page", async () => {
    const { user, findByLabelText, getByRole, getByLabelText } =
      renderWebExtension();
    await findByLabelText("Site");
    expect(getByLabelText("Site")).toHaveValue("www.example.org");
    await user.click(getByRole("img", { name: /LessPass/i }));
    expect(getByLabelText("Site")).toHaveValue("");
  });
});
