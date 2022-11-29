import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Image from "next/image";
import Link from "next/link";

export const siteTitle = "Next.js Blog";
const name = "Kojima";
const Layout = ({ children, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              src="/images/profile.png"
              alt=""
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
              width={144}
              height={144}
            />
          </>
        ) : (
          <>
            <Image
              className={utilStyles.borderCircle}
              src="/images/profile.png"
              alt=""
              width={108}
              height={108}
            />
          </>
        )}
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← ホームに戻る</Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
