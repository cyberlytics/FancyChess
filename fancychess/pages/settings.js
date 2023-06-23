import Head from 'next/head';
import styles from '../styles/settings.module.css';
import { useState } from 'react';
import Link from "next/link";
import Menu from './menu.js';
import { useSession, signIn, signOut } from "next-auth/react"






export default function Settings() {
    const { data: session } = useSession()
    const [showPossibleMoves, setShowPossibleMoves] = useState(false);

    const handleTogglePossibleMoves = () => {
        setShowPossibleMoves(!showPossibleMoves);
    };

    if (!session) {
        return (

            <div className={styles.container}>
                <Head>
                    <title>Settings</title>
                    <link rel="icon" href="../public/logo.ico" />
                </Head>

                <div className={styles.sidebar}>
                    <Menu />
                    {/* <div className={styles.menu}>
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
            <Link href={"http://localhost:3000"}>
                <img src="/logo.png" alt="logo" className={styles.logo} />
            </Link>*/}

                </div>

                <main className={styles.content}>
                    <h1 className={styles.title}>Settings</h1>

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
                </footer>

                <style jsx>{`
        main {
          padding: 3rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
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
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )



}
