import Head from 'next/head';
import styles from '../styles/menu.module.css';
import ChessBoard from './chess-board.js'
import Link from 'next/link';

export default function Menu() {
  return (

    <div id={styles.innermenu}>
        <Link href={"http://localhost:3000"}>
            <img src="/logo.png" alt="logo" className={styles.logo} />
        </Link>
        

        <Link href="./profil" className={styles.link}>
            <h2>Account</h2>          
        </Link>

        <Link href="./settings" className={styles.link}>
            <h2>Settings</h2>
        </Link>

        <div className={styles.lower_menu_section}>
            <Link href="#" className={styles.link} id={styles.logout}>
                <h2>Logout</h2>
            </Link>


        </div>







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
