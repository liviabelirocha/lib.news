import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import Posts from "../../src/pages/posts/index";

describe("CT001: Posts Page", () => {
  afterEach(() => {
    cleanup();
  });

  it("C001: Validar página com um post", async () => {
    render(
      Posts({
        posts: [
          {
            slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
            title: "Como renomear vários arquivos de uma vez usando o terminal",
            excerpt:
              "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
            updatedAt: "01 de dezembro de 2021",
          },
        ],
      })
    );

    expect((await screen.findAllByRole("link")).length).toBe(1);
  });

  it("C001: Validar a chave do post", async () => {
    render(
      Posts({
        posts: [
          {
            slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
            title: "Como renomear vários arquivos de uma vez usando o terminal",
            excerpt:
              "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
            updatedAt: "01 de dezembro de 2021",
          },
        ],
      })
    );

    expect(
      (await screen.findAllByRole("link"))[0].getAttribute("href")
    ).toContain("como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal");
  });

  it("C002: Validar que existe uma mensagem de 'sem posts'", async () => {
    render(
      Posts({
        posts: [],
      })
    );

    let hasNoPostsMessage = false;

    try {
      hasNoPostsMessage = !!(await screen.findByText(
        "Ainda não foram publicadas postagens"
      ));
    } catch {}

    expect(hasNoPostsMessage).toBeTruthy();
  });

  it("C003: Validar listagem com 10 posts", async () => {
    render(
      Posts({
        posts: [
          {
            slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
            title: "Como renomear vários arquivos de uma vez usando o terminal",
            excerpt:
              "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
            updatedAt: "01 de dezembro de 2021",
          },
          {
            slug: "exemplo-2",
            title: "Título do Exemplo 2",
            excerpt: "Este é o segundo exemplo de um artigo fictício.",
            updatedAt: "02 de dezembro de 2021",
          },
          {
            slug: "exemplo-3",
            title: "Título do Exemplo 3",
            excerpt: "Este é o terceiro exemplo de um artigo fictício.",
            updatedAt: "03 de dezembro de 2021",
          },
          {
            slug: "exemplo-4",
            title: "Título do Exemplo 4",
            excerpt: "Este é o quarto exemplo de um artigo fictício.",
            updatedAt: "04 de dezembro de 2021",
          },
          {
            slug: "exemplo-5",
            title: "Título do Exemplo 5",
            excerpt: "Este é o quinto exemplo de um artigo fictício.",
            updatedAt: "05 de dezembro de 2021",
          },
          {
            slug: "exemplo-6",
            title: "Título do Exemplo 6",
            excerpt: "Este é o sexto exemplo de um artigo fictício.",
            updatedAt: "06 de dezembro de 2021",
          },
          {
            slug: "exemplo-7",
            title: "Título do Exemplo 7",
            excerpt: "Este é o sétimo exemplo de um artigo fictício.",
            updatedAt: "07 de dezembro de 2021",
          },
          {
            slug: "exemplo-8",
            title: "Título do Exemplo 8",
            excerpt: "Este é o oitavo exemplo de um artigo fictício.",
            updatedAt: "08 de dezembro de 2021",
          },
          {
            slug: "exemplo-9",
            title: "Título do Exemplo 9",
            excerpt: "Este é o nono exemplo de um artigo fictício.",
            updatedAt: "09 de dezembro de 2021",
          },
          {
            slug: "exemplo-10",
            title: "Título do Exemplo 10",
            excerpt: "Este é o décimo exemplo de um artigo fictício.",
            updatedAt: "10 de dezembro de 2021",
          },
        ],
      })
    );

    expect((await screen.findAllByRole("link")).length).toBe(10);
  });

  it("C004: Validar que, tendo 11 posts, apenas 10 são renderizados", async () => {
    render(
      Posts({
        posts: [
          {
            slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
            title: "Como renomear vários arquivos de uma vez usando o terminal",
            excerpt:
              "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
            updatedAt: "01 de dezembro de 2021",
          },
          {
            slug: "exemplo-2",
            title: "Título do Exemplo 2",
            excerpt: "Este é o segundo exemplo de um artigo fictício.",
            updatedAt: "02 de dezembro de 2021",
          },
          {
            slug: "exemplo-3",
            title: "Título do Exemplo 3",
            excerpt: "Este é o terceiro exemplo de um artigo fictício.",
            updatedAt: "03 de dezembro de 2021",
          },
          {
            slug: "exemplo-4",
            title: "Título do Exemplo 4",
            excerpt: "Este é o quarto exemplo de um artigo fictício.",
            updatedAt: "04 de dezembro de 2021",
          },
          {
            slug: "exemplo-5",
            title: "Título do Exemplo 5",
            excerpt: "Este é o quinto exemplo de um artigo fictício.",
            updatedAt: "05 de dezembro de 2021",
          },
          {
            slug: "exemplo-6",
            title: "Título do Exemplo 6",
            excerpt: "Este é o sexto exemplo de um artigo fictício.",
            updatedAt: "06 de dezembro de 2021",
          },
          {
            slug: "exemplo-7",
            title: "Título do Exemplo 7",
            excerpt: "Este é o sétimo exemplo de um artigo fictício.",
            updatedAt: "07 de dezembro de 2021",
          },
          {
            slug: "exemplo-8",
            title: "Título do Exemplo 8",
            excerpt: "Este é o oitavo exemplo de um artigo fictício.",
            updatedAt: "08 de dezembro de 2021",
          },
          {
            slug: "exemplo-9",
            title: "Título do Exemplo 9",
            excerpt: "Este é o nono exemplo de um artigo fictício.",
            updatedAt: "09 de dezembro de 2021",
          },
          {
            slug: "exemplo-10",
            title: "Título do Exemplo 10",
            excerpt: "Este é o décimo exemplo de um artigo fictício.",
            updatedAt: "10 de dezembro de 2021",
          },
          {
            slug: "exemplo-11",
            title: "Título do Exemplo 11",
            excerpt: "Este é o décimo primeiro exemplo de um artigo fictício.",
            updatedAt: "11 de dezembro de 2021",
          },
        ],
      })
    );

    expect((await screen.findAllByRole("link")).length).toBe(10);
  });

  it("C004: Validar que, tendo 11 posts, aparecem dois botões com '1' e '2' indicando as paginas", async () => {
    render(
      Posts({
        posts: [
          {
            slug: "como-renomear-varios-arquivos-de-uma-vez-usando-o-terminal",
            title: "Como renomear vários arquivos de uma vez usando o terminal",
            excerpt:
              "Suponha que seu projeto tenha uma base de código com 150 arquivos JavaScript e você precisar migrar para TypeScript alterando as extensões dos arquivos. 🤔",
            updatedAt: "01 de dezembro de 2021",
          },
          {
            slug: "exemplo-2",
            title: "Título do Exemplo 2",
            excerpt: "Este é o segundo exemplo de um artigo fictício.",
            updatedAt: "02 de dezembro de 2021",
          },
          {
            slug: "exemplo-3",
            title: "Título do Exemplo 3",
            excerpt: "Este é o terceiro exemplo de um artigo fictício.",
            updatedAt: "03 de dezembro de 2021",
          },
          {
            slug: "exemplo-4",
            title: "Título do Exemplo 4",
            excerpt: "Este é o quarto exemplo de um artigo fictício.",
            updatedAt: "04 de dezembro de 2021",
          },
          {
            slug: "exemplo-5",
            title: "Título do Exemplo 5",
            excerpt: "Este é o quinto exemplo de um artigo fictício.",
            updatedAt: "05 de dezembro de 2021",
          },
          {
            slug: "exemplo-6",
            title: "Título do Exemplo 6",
            excerpt: "Este é o sexto exemplo de um artigo fictício.",
            updatedAt: "06 de dezembro de 2021",
          },
          {
            slug: "exemplo-7",
            title: "Título do Exemplo 7",
            excerpt: "Este é o sétimo exemplo de um artigo fictício.",
            updatedAt: "07 de dezembro de 2021",
          },
          {
            slug: "exemplo-8",
            title: "Título do Exemplo 8",
            excerpt: "Este é o oitavo exemplo de um artigo fictício.",
            updatedAt: "08 de dezembro de 2021",
          },
          {
            slug: "exemplo-9",
            title: "Título do Exemplo 9",
            excerpt: "Este é o nono exemplo de um artigo fictício.",
            updatedAt: "09 de dezembro de 2021",
          },
          {
            slug: "exemplo-10",
            title: "Título do Exemplo 10",
            excerpt: "Este é o décimo exemplo de um artigo fictício.",
            updatedAt: "10 de dezembro de 2021",
          },
          {
            slug: "exemplo-11",
            title: "Título do Exemplo 11",
            excerpt: "Este é o décimo primeiro exemplo de um artigo fictício.",
            updatedAt: "11 de dezembro de 2021",
          },
        ],
      })
    );

    let buttonsText: string[] = [];

    try {
      buttonsText = (await screen.findAllByRole("button")).map(
        (b) => b.innerHTML
      );
    } catch {}

    expect(buttonsText).toEqual(expect.arrayContaining([1, 2]));
  });
});
