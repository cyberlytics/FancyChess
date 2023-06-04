import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from "next/image";


export default function Home() {
  return (



    <div className={styles.container}>
      <Head>
        <title>Settings</title>
      </Head>

      <main>
        <h1 className={styles.title}>
          Settings
        </h1>
    <div className={styles.grid}>
        <a className={styles.card}>
            <h3>Username: Neznaika</h3>
        </a>

        <a className={styles.card}>
            <h3>Password: pw123xy</h3>
        </a>
    </div>
          <div className={styles.grid}>
              <a className={styles.card}>
                  <h3>E-Mail: test@123.com</h3>
              </a>
          </div>


      </main>

      <footer>
          Fancy Chess{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
      </footer>

      <style jsx>{`
        main {
          padding: 3rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
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
