describe("CT012 - Logout", () => {

  it("C033 - Realizar logout com sucesso", () => {
    cy.clearAllCookies();
    cy.visit("/");

    cy.get(".styles_signInButton__06aMU").click();

    cy.origin("https://github.com", () => {
      cy.get("input[name=login]").type("phgqm7@alu.ufc.br");
      cy.get("input[name=password]").type("Lia#12345");
      cy.get("input[type=submit]").click();
    });

    cy.get("button[type=submit]").click();
    cy.get('.styles_signInButton__06aMU').click();

    cy.get('.styles_signInButton__06aMU').should('contain.text', 'Sign in with GitHub');
  })
})