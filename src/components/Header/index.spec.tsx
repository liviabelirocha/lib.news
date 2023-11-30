import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./";
import { Provider as NextAuthProvider } from "next-auth/client";

describe("Header", () => {
  vi.mock("next/router", () => ({
    useRouter: vi.fn(() => ({
      asPath: "/",
    })),
  }));

  it("Should have exactly one active link", async () => {
    render(
      <NextAuthProvider options={{}} session={undefined}>
        <Header />
      </NextAuthProvider>
    );

    expect(
      (await screen.findAllByRole("link")).filter((a) =>
        a.className.includes("active")
      ).length
    ).toBe(1);
  });
});
