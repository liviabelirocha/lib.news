import { faker } from "@faker-js/faker";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Provider as NextAuthProvider } from "next-auth/client";

import { SignInButton } from "./";

describe("SignIn Button", () => {
  afterEach(() => {
    cleanup();
  });

  it("Should have user name when user is logged in", async () => {
    const name = faker.person.fullName();

    render(
      <NextAuthProvider
        session={{
          user: { name },
        }}
      >
        <SignInButton />
      </NextAuthProvider>
    );

    expect(screen.getByRole("button").innerHTML).toContain(name);
  });

  it("should ask for user to sign in", async () => {
    render(
      <NextAuthProvider session={undefined}>
        <SignInButton />
      </NextAuthProvider>
    );

    expect(screen.getByRole("button").innerHTML).toContain(
      "Sign in with GitHub"
    );
  });
});
