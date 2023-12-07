import PostsPage from "../../src/pages/posts";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

const postsC023: Post[] = [
  {
    slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
    title: "Como renomear vários arquivos de uma vez usando o terminal",
    excerpt:
      "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
    updatedAt: "01 de dezembro de 2021",
  },
];

const postsC024: Post[] = Array(2)
  .fill(0)
  .map((_, idx) => idx + 1)
  .map((v) => ({
    slug: `post-${v}`,
    title: `Post ${v}`,
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "01 de dezembro de 2021",
  }));

const postsC025: Post[] = [
  {
    slug: "post-1",
    title: "Post 1",
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "07 de novembro de 2023",
  },
  {
    slug: "post-2",
    title: "Post 2",
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "04 de março de 2023",
  },
  {
    slug: "post-3",
    title: "Post 3",
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "01 de dezembro de 2021",
  },
];

const postsC026: Post[] = [
  {
    slug: "post-1",
    title: "Post 1",
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "04 de março de 2023",
  },
  {
    slug: "post-2",
    title: "Post 2",
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "01 de dezembro de 2021",
  },
  {
    slug: "post-3",
    title: "Post 3",
    excerpt: "Lorem ipsum dolor sit amet.",
    updatedAt: "07 de novembro de 2023",
  },
];

describe("CT007: Ordenação", () => {
  it("C023: Validar ordenação de apenas uma postagem", async () => {
    cy.mount(<PostsPage posts={postsC023} />);

    cy.get("time").should("have.text", "01 de dezembro de 2021");
  });

  it("C024: Validar ordenação de duas postagens com a mesma data", async () => {
    cy.mount(<PostsPage posts={postsC024} />);

    cy.get("time").each((item) => {
      expect(Cypress.$(item).text()).to.eq("01 de dezembro de 2021");
    });
  });
});

it("C025: Validar ordenação de postagens já ordenadas", async () => {
  cy.mount(<PostsPage posts={postsC025} />);

  const titles = postsC025.map((p) => p.title);

  cy.get("strong").each((item, index) => {
    expect(Cypress.$(item).text()).to.eq(titles[index]);
  });
});

it("C026: Validar ordenação de postagens não ordenadas", async () => {
  cy.mount(<PostsPage posts={postsC026} />);

  const titles = ["Post 3", "Post 1", "Post 2"];

  cy.get("strong").each((item, index) => {
    expect(Cypress.$(item).text()).to.eq(titles[index]);
  });
});
