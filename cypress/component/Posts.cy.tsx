import PostsPage from "../../src/pages/posts";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

const postsC001: Post[] = [
  {
    slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
    title: "Como renomear vários arquivos de uma vez usando o terminal",
    excerpt:
      "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
    updatedAt: "01 de dezembro de 2021",
  },
];

const postsC003: Post[] = Array(10)
  .fill(0)
  .map((_, idx) => idx + 1)
  .map((v) => ({
    slug: `post-${v}`,
    title: `Post ${v}`,
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "01 de dezembro de 2021",
  }));

const postsC004: Post[] = [
  ...postsC003,
  {
    slug: `post-11`,
    title: `Post 11`,
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "01 de dezembro de 2021",
  }
];

describe("CT001 - Visualização de postagens", () => {
  it("C001 - Validar lista de postagens com apenas uma postagem", () => {
    cy.mount(<PostsPage posts={postsC001} />);

    cy.get("strong").should("have.length", 1);
  });

  it("C002 - Validar lista de postagens vazia", () => {
    cy.mount(<PostsPage posts={[]} />);

    cy.get("strong").should("not.exist");
  });

  it("C003 - Validar lista de postagens com dez postagens", () => {
    cy.mount(<PostsPage posts={postsC003} />);

    cy.get("strong").should("have.length", 10);
  });

  it("C004 - Validar onze postagens", () => {
    cy.mount(<PostsPage posts={postsC004} />)

    cy.get('.posts_page__X4UrG > a').should('exist');
  })
});
