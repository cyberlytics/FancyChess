import Head from 'next/head';
import styles from '../styles/profil.module.css';
import { Dropdown } from "@nextui-org/react";
import Menu from './menu.js';
import React from "react";

export default function Profil() {
  const [selected, setSelected] = React.useState(new Set(["S_Bauer"]));
  const dropdownmenu = () => {
    return (
      <Dropdown>
        <Dropdown.Button edit></Dropdown.Button>
        <Dropdown.Menu disabledKeys={selected} onAction={dropdownchoice(selected.anchorKey)} selectionMode="single" selectedKeys={selected} aria-label="Static Actions" onSelectionChange={setSelected}>
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
      </Dropdown>
    )
  }

  const dropdownchoice = (key) => {
    if (key == "W_Bauer") {
      document.getElementById("profilPicture_img").src = "/Pawn-W.svg"
    } else if (key == "S_Bauer") {
      document.getElementById("profilPicture_img").src = "/Pawn-B.svg"
    } else if (key == "W_Turm") {
      document.getElementById("profilPicture_img").src = "/Rook-W.svg"
    } else if (key == "S_Turm") {
      document.getElementById("profilPicture_img").src = "/Rook-B.svg"
    } else if (key == "W_Springer") {
      document.getElementById("profilPicture_img").src = "/Knight-W.svg"
    } else if (key == "S_Springer") {
      document.getElementById("profilPicture_img").src = "/Knight-B.svg"
    } else if (key == "W_Laufer") {
      document.getElementById("profilPicture_img").src = "/Bishop-W.svg"
    } else if (key == "S_Laufer") {
      document.getElementById("profilPicture_img").src = "/Bishop-B.svg"
    } else if (key == "W_Koenig") {
      document.getElementById("profilPicture_img").src = "/King-W.svg"
    } else if (key == "S_Koenig") {
      document.getElementById("profilPicture_img").src = "/King-B.svg"
    } else if (key == "W_Dame") {
      document.getElementById("profilPicture_img").src = "/Queen-W.svg"
    } else if (key == "S_Dame") {
      document.getElementById("profilPicture_img").src = "/Queen-B.svg"
    }
  }

  const elo_icon = () => {
    let B_or_W = selected.anchorKey;
    if (typeof window !== "undefined" && typeof B_or_W !== "undefined") {
      let elo_html = document.getElementById('elo_number').innerHTML;
      let elo = elo_html.substring(0, elo_html.indexOf('<'));
      console.log(elo);
      console.log(B_or_W[0])
      if (B_or_W[0] == "W") {
        if (elo >= 0 && elo <= 400) {
          document.getElementById("elo_img").src = "/Pawn-W.svg"
        } else if (elo > 400 && elo <= 800) {
          document.getElementById("elo_img").src = "/Rook-W.svg"
        } else if (elo > 800 && elo <= 1200) {
          document.getElementById("elo_img").src = "/Knight-W.svg"
        } else if (elo > 1200 && elo <= 1600) {
          document.getElementById("elo_img").src = "/Bishop-W.svg"
        } else if (elo > 1600 && elo <= 2000) {
          document.getElementById("elo_img").src = "/Queen-W.svg"
        } else if (elo > 2000) {
          document.getElementById("elo_img").src = "/King-W.svg"
        }
      } else if (B_or_W[0] == "S") {
        console.log(elo > 400)
        if (elo >= 0 && elo <= 400) {
          document.getElementById("elo_img").src = "/Pawn-B.svg"
        } else if (elo > 400 && elo <= 800) {
          console.log(".");
          document.getElementById("elo_img").src = "/Rook-B.svg"
        } else if (elo > 800 && elo <= 1200) {
          document.getElementById("elo_img").src = "/Knight-B.svg"
        } else if (elo > 1200 && elo <= 1600) {
          document.getElementById("elo_img").src = "/Bishop-B.svg"
        } else if (elo > 1600 && elo <= 2000) {
          document.getElementById("elo_img").src = "/Queen-B.svg"
        } else if (elo > 2000) {
          document.getElementById("elo_img").src = "/King-B.svg"
        }
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
            <img src="/Pawn-B.svg" height={"100%"} width={"100%"} className={styles.profilPicture_user} id='profilPicture_img'></img>

          </div>

          <div className={styles.profilpannel}>
            <h1>GAMERTAG</h1>
            <h1 id='elo_number'>
              532
              <img src="/Pawn-B.svg" height={"5%"} width={"5%"} className={styles.elo_icon} id='elo_img'></img>
              {elo_icon()}
            </h1>


          </div>
          <div className={styles.gamehistory}>
            <table id="tableID" className={styles.gamehistory_table}>
              <thead>
                <tr>
                  <th>Enemy Name</th>
                  <th>Game Moves</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <th>Enemy Name2</th>
                  <th>Game Moves2</th>
                  <th>Date2</th>
                </tr>
                <tr>
                  <th>Enemy Name3</th>
                  <th>Game Moves3</th>
                  <th>Date3</th>
                </tr>
                <tr>
                  <th>Enemy Name4</th>
                  <th>Game Moves4</th>
                  <th>Date4</th>
                </tr>
                <tr>
                  <th>Enemy Name5</th>
                  <th>Game Moves5</th>
                  <th>Date5</th>
                </tr>
                <tr>
                  <th>Enemy Name6</th>
                  <th>Game Moves6</th>
                  <th>Date6</th>
                </tr>
                <tr>
                  <th>Enemy Name7</th>
                  <th>Game Moves7</th>
                  <th>Date7</th>
                </tr>
                <tr>
                  <th>Enemy Name8</th>
                  <th>Game Moves8</th>
                  <th>Date8</th>
                </tr>
                <tr>
                  <th>Enemy Name9</th>
                  <th>Game Moves9</th>
                  <th>Date9</th>
                </tr>
                <tr>
                  <th>Enemy Name10</th>
                  <th>Game Moves10</th>
                  <th>Date10</th>
                </tr>
              </tbody>
            </table>
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
