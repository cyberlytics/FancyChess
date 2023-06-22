import Head from 'next/head';
import styles from '../styles/profil.module.css';
import Link from "next/link";
import {Dropdown} from "@nextui-org/react";
import Menu from './menu.js';

export default function Profil() {
  const dropdownmenu = () => {
      return(
        <Dropdown>
          <Dropdown.Button edit>edit</Dropdown.Button>
          <Dropdown.Menu aria-label="Static Actions">
            <Dropdown.Item key="W_Bauer">W_Bauer</Dropdown.Item>
            <Dropdown.Item key="W_Turm">W_Turm</Dropdown.Item>
            <Dropdown.Item key="W_Springer">W_Springer</Dropdown.Item>
            <Dropdown.Item key="W_Laufer">W_Läufer</Dropdown.Item>
            <Dropdown.Item key="W_Koenig">W_König</Dropdown.Item>
            <Dropdown.Item key="W_Dame">W_Dame</Dropdown.Item>
            <Dropdown.Item key="S_Bauer">S_Bauer</Dropdown.Item>
            <Dropdown.Item key="S_Turm">S_Turm</Dropdown.Item>
            <Dropdown.Item key="S_Springer">S_Springer</Dropdown.Item>
            <Dropdown.Item key="S_Laufer">S_Läufer</Dropdown.Item>
            <Dropdown.Item key="S_Koenig">S_König</Dropdown.Item>
            <Dropdown.Item key="S_Dame">S_Dame</Dropdown.Item>
          </Dropdown.Menu>
          {dropdownchoice(Dropdown.key)}
        </Dropdown>
      )
  }

  const dropdownchoice = (key) => {
    switch(key){
      case "W_Bauer":{
        return(
          <image src="../public/Pawn-W.svg"/>
        )
      }
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Profil</title>
        <link rel="icon" href="../public/logo.ico" />
      </Head>
      <body>
          <div className={styles.leftpannel}>
            <Menu />
          </div>

          <div className={styles.midpannel}>
              <div role='profilpicture' className={styles.profilpicture}>
                {dropdownmenu()}
                <img src="/Pawn-B.svg" className={styles.profilPicture_user} />
              </div>
              
              <div className={styles.profilpannel}>

              </div>
              <div className={styles.gamehistory}>

              </div>
          </div>

          <div className={styles.rightpannel}></div>

      </body>

      <footer>
      </footer>
        <style global jsx>{`
        html,
        body{
          height: 100vh;
          width: 100%;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          }
        `}
        </style>
    </div>
  )

}
