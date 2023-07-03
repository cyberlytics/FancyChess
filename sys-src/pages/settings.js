import Head from 'next/head';
import styles from '../styles/settings.module.css';
import { useState } from 'react';
import Menu from './menu.js';


export default function Settings() {
    const [showPossibleMoves, setShowPossibleMoves] = useState(false);

    const handleTogglePossibleMoves = () => {
        setShowPossibleMoves(!showPossibleMoves);
    };

    return (

        <div className={styles.container}>
            <Head>
                <title>Settings</title>
                <link rel="icon" href="../public/logo.ico"/>
            </Head>

            <div className={styles.sidebar}>
                <Menu/>
            </div>

            <main className={styles.content}>
                <h1 className={styles.title}>Settings</h1>
                <div className={styles.grid}>
                    <h2>Show possible moves</h2>
                </div>

                <div>
                    <button onClick={handleTogglePossibleMoves}>
                        {showPossibleMoves ? 'ON' : 'OFF'}
                    </button>
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
