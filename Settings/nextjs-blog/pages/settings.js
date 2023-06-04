import Head from 'next/head';
import styles from '../styles/Home.module.css';

<div className={styles.grid}>
    <a className={styles.card}>
        <h3>Documentation</h3>
    </a>

    <a href="https://nextjs.org/learn" className={styles.card}>
        <h3>Learn &rarr;</h3>
        <p>Learn about Next.js in an interactive course with quizzes!</p>
    </a>

    <a
        href="https://github.com/vercel/next.js/tree/master/examples"
        className={styles.card}
    >
        <h3>Examples &rarr;</h3>
        <p>Discover and deploy boilerplate example Next.js projects.</p>
    </a>

    <a
        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className={styles.card}
    >
        <h3>Deploy &rarr;</h3>
        <p>
            Instantly deploy your Next.js site to a public URL with Vercel.
        </p>
    </a>
</div>