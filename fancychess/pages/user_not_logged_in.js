import { signIn } from "next-auth/react";
import styles from '../styles/notlogged.module.css';

export default function UserNotLoggedIn() {
    return (
        <div className={styles.notlogged}>
            <div className={styles.content}>
                <h1>!!! Welcome to Fancy Chess !!!</h1>
                <h3>Unfortunately you are not logged in.<br/> Please log in with the button below</h3>
                <div>
                    <button onClick={() => signIn()}>Sign in</button>
                </div>
            </div>
        </div>
    )
}
