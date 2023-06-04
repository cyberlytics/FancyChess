import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Profil() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Profil</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
          <div className={styles.leftpannel}>
              <div className={styles.navpannel}>

              </div>
          </div>

          <div className={styles.midpannel}>
              <div className={styles.profilpicture}></div>
              <div className={styles.profilpannel}>

              </div>
          </div>

          <div className={styles.rightpannel}></div>

      </body>

      <footer>
      </footer>
        <style global jsx>{`
        html,
        body{
          height: 100%;
          width: 100%;
          margin: 0;
          }
        `}</style>
    </div>
  )
}
