import Head from "next/head";
import { GetServerSideProps } from "next";

import { SubscribeButton } from "../components/SubscribeButton";

import styles from "../styles/home.module.scss";

import { stripe } from "../services/stripe";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | lib.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React </span> world.
          </h1>
          <p>
            Get access to all the publications <br />{" "}
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="girl coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve("price_1K1XwZC9627s8ysgNwlmKTsL");

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
  };
};
