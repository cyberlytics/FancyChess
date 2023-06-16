import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ChessBoard from './chess-board.js';
import Menu from './menu.js';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>FancyChess</title>
          <link rel="icon"  href="../public/logo.ico" />
      </Head>

          <div className="section" id={styles.menu}>
            <Menu />

          </div>

          <div className="section" id={styles.game}>
            <div classname="board" id={styles.board}>
                <ChessBoard />

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


      <style global jsx>{`
        html,
        body{
          background-image: url("../public/background.jpg");
          height: 100vh;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          }
        `}</style>
    

    </div>
  )
}
