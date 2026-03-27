import { test, expect } from "vitest";
import { waitFor } from "@testing-library/react";
import { renderWithProviders } from "./tests/renders";
import { App } from "./App";

test("Should show LessPass image on the index page", async () => {
  const { getByRole, getByLabelText } = renderWithProviders(<App />);
  await waitFor(() => expect(getByLabelText("Site")).toHaveFocus());
  expect(getByRole("img", { name: /LessPass/i })).toBeInTheDocument();
});

test("At startup the site field must be selected", async () => {
  const { getByLabelText } = renderWithProviders(<App />);
  await waitFor(() => expect(getByLabelText("Site")).toHaveFocus());
});

test("Should allow to navigate to the settings page", async () => {
  const { user, getByLabelText, getByRole } = renderWithProviders(<App />);
  await waitFor(() => expect(getByLabelText("Site")).toHaveFocus());
  await user.click(getByRole("link", { name: /Settings/i }));
  expect(getByRole("heading", { name: /Settings/i })).toBeInTheDocument();
  await user.click(getByRole("img", { name: /LessPass/i }));
  await waitFor(() => expect(getByLabelText("Site")).toHaveFocus());
});
