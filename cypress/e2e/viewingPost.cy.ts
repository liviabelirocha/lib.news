describe("CT002 - Visualização do conteúdo de uma postagem", () => {
  it.skip("C005 - Visualizar parcialmente conteúdo de uma postagem existente (não autenticado)", () => {
    cy.visit(
      "posts/preview/como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal"
    );

    cy.get(".post_continueReading__SxJTr").should(
      "contain.html",
      'Wanna continue reading?<a href="/">Subscribe now 🤗</a>'
    );
  });

  it.skip("C006 - Visualização do conteúdo de uma postagem", () => {
    cy.visit("/posts/preview/not-exist");

    cy.get(".notFoundPost_container__0L2u8").should(
      "have.text",
      "Postagem com id 'not-exist' não existe"
    );
  });

  it("C008 - Visualizar parcialmente conteúdo de uma postagem existente", () => {
    cy.clearAllCookies();

    cy.visit("/");

    cy.get(".styles_signInButton__06aMU").click();

    cy.origin("https://github.com", () => {
      cy.get("input[name=login]").type("phgqm7@alu.ufc.br");
      cy.get("input[name=password]").type("Lia#12345");
      cy.get("input[type=submit]").click();
    });

    cy.get("button[type=submit]").click();
    cy.get('[href="/posts"]').click();
    cy.get(
      '[href="/posts/preview/como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal"] > strong'
    ).click();

    cy.get(".post_continueReading__SxJTr").should(
      "contain.html",
      'Wanna continue reading?<a href="/">Subscribe now 🤗</a>'
    );
  });
});
