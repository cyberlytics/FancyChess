import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ChessBoard from './chess-board.js'
import Link from 'next/link';
import WinLosePopUp from './win-lose-pop-up.js';
import { useState } from 'react';

export default function Home() {
  const [buttonPopup, setButtonPopUp] = useState(false);
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

            <a className={styles.link}>
              <button onClick={() => setButtonPopUp(true)}>Pop Up Window</button>

            </a>

            <a href="#" className={styles.link} id="logout">
              <h2>Logout</h2>
            </a>

          </div>

        </div>

        <div className="section" id={styles.game}>
          <div className="board" id={styles.board}>
            <ChessBoard />
            <WinLosePopUp trigger={buttonPopup} setTrigger={setButtonPopUp}>
            </WinLosePopUp>
          </div>

        </div>

        <div className="section" id={styles.log}>

          <p id="time" className={styles.time}>00:00
          </p>
          <div className={styles.buttons}>
            <button id="inviteLink">
              inviteLink
            </button>

            <button id="startbutton">
              Start/End
            </button>
          </div>


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
