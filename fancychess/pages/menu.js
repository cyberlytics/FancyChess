import Head from 'next/head';
import styles from '../styles/menu.module.css';
import ChessBoard from './chess-board.js'
import Link from 'next/link';

export default function Menu() {
  return (

    <div id={styles.innermenu}>
        <Link href={"http://localhost:3000"} className={styles.link}>
            <h1>Fancy Chess</h1>
        </Link>
        

        <Link href="./profil" className={styles.link}>
            <h2>Account</h2>          
        </Link>

        <Link href="./settings" className={styles.link}>
            <h2>Settings</h2>
        </Link>

        <Link href="#" className={styles.link} id={styles.logout}>
            <h2>Logout</h2>
        </Link>

        <Link href={"http://localhost:3000"}>
            <img src="/logo.png" alt="logo" className={styles.logo} />
        </Link>




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
