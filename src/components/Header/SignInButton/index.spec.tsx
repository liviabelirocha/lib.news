import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SignInButton } from "./";
import { Provider as NextAuthProvider } from "next-auth/client";

import { faker } from "@faker-js/faker";

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
