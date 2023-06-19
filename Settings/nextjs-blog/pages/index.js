import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';


export default function Home() {
    const [showPossibleMoves, setShowPossibleMoves] = useState(false);

    const handleTogglePossibleMoves = () => {
        setShowPossibleMoves(!showPossibleMoves);
    };

  return (



    <div className={styles.container}>
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Settings
        </h1>




          <div className={styles.grid}>
              <a className={styles.card}>
                  <h3>Show possible moves</h3>
                  <button onClick={handleTogglePossibleMoves}>
                      {showPossibleMoves ? 'ON' : 'OFF'}
                  </button>
              </a>
          </div>
      </main>



      <footer>
          <img src="/logo.png" alt="logo" className={styles.logo} />
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
        "font-family: "Hiragino Mincho ProN;
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
