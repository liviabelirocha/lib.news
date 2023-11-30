import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ActiveLink } from "./";

describe("Active Link", () => {
  vi.mock("next/router", () => ({
    useRouter: vi.fn(() => ({
      asPath: "/",
    })),
  }));

  const styles = {
    active: "active",
  };

  afterEach(() => {
    cleanup();
  });

  it("Should be active when user is in said route", async () => {
    render(
      <ActiveLink href="/" activeClassName={styles.active}>
        <a>Home</a>
      </ActiveLink>
    );

    expect((await screen.findByText("Home")).className).toBe(styles.active);
  });

  it("Should be inactive when user is not in said route", async () => {
    render(
      <ActiveLink href="/not-home" activeClassName={styles.active}>
        <a>Home</a>
      </ActiveLink>
    );

    expect((await screen.findByText("Home")).className).not.toBe(styles.active);
  });
});
