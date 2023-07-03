import styles from '../styles/menu.module.css';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Menu() {
  const { data: session } = useSession()
  return (

    <div id={styles.innermenu}>
        <Link href="/">
            <img src="/logo.png" alt="logo" className={styles.logo} />
        </Link>
        

        {
          <Link href="./profil" className={styles.link}>
            <h2>Account</h2>          
          </Link>
        }

        {

          <Link href="./settings" className={styles.link}>
            <h2>Settings</h2>
          </Link>

        }

        <div className={styles.lower_menu_section}>
            { session ? 
              <Link href="/" onClick={() => signOut()} className={styles.link} id={styles.logout}>
                <h2>Logout</h2>
              </Link> :
              <Link href="/" onClick={() => signIn()} className={styles.link} id={styles.logout}>
                <h2>Login</h2>
              </Link> }
        </div>

      <style global jsx>{`
        html,
        body{
          height: 100vh;
          margin: 0;
          }
        `}</style>
    </div>
  )
}
