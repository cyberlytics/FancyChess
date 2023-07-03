import { signIn } from "next-auth/react";
import { useRouter } from 'next/router'

import styles from '../styles/notlogged.module.css';

export default function UserNotLoggedIn() {
    const router = useRouter()
    return (
        <div className={styles.notlogged}>
            <div className={styles.content}>
                <h1>!!! Welcome to Fancy Chess !!!</h1>
                <h3>Unfortunately you are not logged in.<br/> Please log in with the button below</h3>
                <div className={styles.sign_in_button}>
                    <button onClick={() => signIn()}>Sign in</button>
                </div>
                <div className={styles.back_button}>
                    <button type="button" onClick={() => router.back()}>
                        Click here to go back
                    </button>
                </div>
            </div>
        </div>
    )
}
