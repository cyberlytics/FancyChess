import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (

    <div>
      <Head>
        <title>FancyChess</title>
      </Head>
      <main>
        <div className='page'>
          <div className="section" id={styles.menu}>
            <div is="innermenu">
              <h1>Fancy Chess</h1>

              <a href="#" className={styles.link}>
                <h2>Account</h2>
              </a>

              <a href="#" className={styles.link}>
                <h2>Settings</h2>
              </a>

              <a href="#" className={styles.link}>
                <h2>History</h2>
              </a>

              <a href="#" className={styles.link} id="logout">
                <h2>Logout</h2>
              </a>

            </div>

          </div>

          <div className="section" id={styles.game}>
            <div classname="board" id={styles.board}>


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
              <p>........</p>
              <p>........</p>
              <p>........</p>
              <p>........</p>
              <p>........</p>
              <p>........</p>
              <p>........</p>
            </div>

          </div>
        </div>


      </main>
    

    </div>
  )
}
