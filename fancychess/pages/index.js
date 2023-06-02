import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Profil() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      </main>

      <footer>
      </footer>

      <style jsx>{`
        main {
          background-color: black;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
