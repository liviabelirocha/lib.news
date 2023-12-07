describe("CT004 - Assinatura", () => {
  it("C027 - Validar única assinatura", () => {
    cy.visit("/");

    cy.get(".styles_subscribeButton__52c6u").should("not.exist");
    cy.get("p").should(
      "not.contain.text",
      "Get access to all the publications"
    );
  });

  it("C030 - Solicitar assinatura não autenticado", () => {
    cy.visit("/");

    cy.get(".styles_subscribeButton__52c6u").click();
    cy.origin("https://github.com", () => {
      cy.url().should("contain", "https://github.com/");
    });
  });

  it("C031 - Solicitar assinatura autenticado", () => {
    cy.visit("/");

    cy.get(".styles_signInButton__06aMU").click();

    cy.origin("https://github.com", () => {
      cy.get("input[name=login]").type("phgq7@alu.ufc.br");
      cy.get("input[name=password]").type("Lia#12345");
      cy.get("input[type=submit]").click();
    });

    cy.get("button[type=submit]").click();

    cy.get(".styles_subscribeButton__52c6u").click();
    cy.origin("https://checkout.stripe.com", () => {
      cy.url().should("contain", "https://checkout.stripe.com/");
    });
  });
});
