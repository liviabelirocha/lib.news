import { GetStaticProps } from "next";
import Head from "next/head";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import { getPrismicClient } from "../../services/prismic";

import styles from "../../styles/posts.module.scss";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

const SIZE = 10;

export default function Posts({ posts }: PostsProps) {
  const hasNextPage = posts.length >= SIZE;
  const slicedPosts = posts.slice(0, SIZE);

  return (
    <>
      <Head>
        <title>Posts | lib.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <div className={styles.postList}>
            {slicedPosts.map((post) => (
              <Link href={`/posts/preview/${post.slug}`} key={post.slug}>
                <a>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title} </strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))}
          </div>

          <div className={styles.page}>
            {hasNextPage && <Link href="/posts/page/2">Próximo</Link>}
          </div>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    { fetch: ["post.title", "post.content"], page: 1, pageSize: SIZE }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
