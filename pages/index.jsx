import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSG
export const getStaticProps = async () => {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyle.headingMd}>
        <p>私はフロントエンドエンジニアです/好きな言語はJavaScriptです</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h1 className="">🗒エンジニアのブログ</h1>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <Image
                  className={styles.thumbnailImage}
                  src={thumbnail}
                  alt=""
                  width={300}
                  height={200}
                />
              </Link>
              <Link href="/" className="time">
                {title}
              </Link>
              <br />
              <small>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
