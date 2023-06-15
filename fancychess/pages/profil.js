import Head from 'next/head';
import styles from '../styles/profil.module.css';
import Link from "next/link";

export default function Profil() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profil</title>
        <link rel="icon" href="../public/logo.ico" />
      </Head>
      <body>
          <div className={styles.leftpannel}>
              <div className={styles.navpannel}>
                  <h1>Fancy Chess</h1>
              </div>
          </div>

          <div className={styles.midpannel}>
              <div role='profilpicture' className={styles.profilpicture}></div>
              <div className={styles.profilpannel}>

              </div>
              <div className={styles.gamehistory}>

              </div>
          </div>

          <div className={styles.rightpannel}></div>

      </body>

      <footer>
      </footer>
        <style global jsx>{`
        html,
        body{
          height: 100vh;
          width: 100%;
          margin: 0;
          }
        `}
        </style>
    </div>
  )
}
