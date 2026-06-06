import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";

describe("Dropdown", () => {
  it("otevře menu a vybere položku", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Dropdown
        label="Sol 1042"
        items={[{ key: "1041", label: "Sol 1041", onSelect }]}
      />,
    );

    // Menu je zavřené
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Otevři kliknutím na trigger
    await user.click(screen.getByRole("button", { name: /Sol 1042/ }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Vyber položku → zavolá onSelect a zavře menu
    await user.click(screen.getByRole("button", { name: "Sol 1041" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("nelze otevřít, když je disabled", async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Sol —" items={[]} disabled />);

    await user.click(screen.getByRole("button", { name: /Sol/ }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
