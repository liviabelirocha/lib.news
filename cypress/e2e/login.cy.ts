describe("CT003 - Login", () => {
  it.skip("C009 - Fazer login com sucesso", () => {
    cy.clearAllCookies();
    cy.visit("/");

    cy.get(".styles_signInButton__06aMU").click();

    cy.origin("https://github.com", () => {
      cy.get("input[name=login]").type("phgqm7@alu.ufc.br");
      cy.get("input[name=password]").type("Lia#12345");
      cy.get("input[type=submit]").click();
    });

    cy.get("button[type=submit]").click();

    cy.get('.styles_signInButton__06aMU').should("contain.text", "phtest1");
  });

  it("C010 - Fazer login com email incorreto", () => {
    cy.clearAllCookies();
    cy.visit("/");

    cy.get(".styles_signInButton__06aMU").click();

    cy.origin("https://github.com", () => {
      cy.get("input[name=login]").type("phgq7@alu.ufc.br");
      cy.get("input[name=password]").type("Lia#12345");
      cy.get("input[type=submit]").click();

      cy.get('.js-flash-alert').should('contain.text', 'Incorrect username or password.')
    });
  });

  it("C011 - Fazer login com senha incorreta", () => {
    cy.clearAllCookies();
    cy.visit("/");

    cy.get(".styles_signInButton__06aMU").click();

    cy.origin("https://github.com", () => {
      cy.get("input[name=login]").type("phgqm7@alu.ufc.br");
      cy.get("input[name=password]").type("Lia#1234");
      cy.get("input[type=submit]").click();

      cy.get('.js-flash-alert').should('contain.text', 'Incorrect username or password.')
    });
  })
})