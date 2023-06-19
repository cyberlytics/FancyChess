import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ChessBoard from './chess-board.js'
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>FancyChess</title>
          <link rel="icon" href="../public/logo.ico" />
      </Head>
      <body>
          <div className="section" id={styles.menu}>
            <div is="innermenu">
              <h1>Fancy Chess</h1>

              <Link href="./profil" className={styles.link}>
                <h2>Account</h2>
              </Link>

              <a href="./settings" className={styles.link}>
                <h2>Settings</h2>
              </a>

              <a href="#" className={styles.link} id="logout">
                <h2>Logout</h2>
              </a>

            </div>

          </div>

          <div className="section" id={styles.game}>
            <div className="board" id={styles.board}>
                <ChessBoard />

            </div>

          </div>

          <div className="section" id={styles.log}>

            <p id="time">00:00
            </p>
            
            <button id="inviteLink">
              Invite Link
            </button>
            
            <button>
              Start/End
            </button>

            <div id={styles.playerMoveHistory}>
              <p>ertser Zug</p>
              <p>zweiter Zug</p>
            </div>

          </div>
      </body>

      <style global jsx>{`
        html,
        body{
          background-image: url("../public/background.jpg");
          height: 100vh;
          margin: 0;
          }
        `}</style>
    

    </div>
  )
}
