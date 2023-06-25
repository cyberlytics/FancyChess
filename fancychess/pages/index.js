import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ChessBoard from './chess-board.js';
import Menu from './menu.js';
import UserNotLoggedIn from './user_not_logged_in.js';
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import WinLosePopUp from './win-lose-pop-up.js'




// get Static Props async function to negate the CORS-Error and to fetch the api
export const getStaticProps = async () => {

  const url = 'https://f798gy610d.execute-api.eu-central-1.amazonaws.com/startGamer/GameStart';

  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {chessboardData: data}
  }
}

export default function Home({chessboardData}) {
  const { data: session } = useSession()

  const [checkGame , setGameStart] = useState(false);

  const handleStartEnd = () => {
    setGameStart(!checkGame);
  };


// You have to click.
  var switchi = true;
  var temp;
  var firstclick = null;

  var SpieleID;

  let handleMouseHover;
  handleMouseHover = (event) => {
    //update
    temp = event.target.id;
  };

  let handleClick;
  handleClick = () => {
    switchi = false;
    if(firstclick == null){
      firstclick = temp;
    } else {
      console.log("Von: ", firstclick)
      console.log("Nach: ",temp)

      //TODO:senden des Zuges - nicht ueberprueft

      // Sending and receiving data in JSON format using POST method
//
      var xhr = new XMLHttpRequest();
      var url = "api/game/update";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      var data = JSON.stringify({"ID": SpieleID, "von": firstclick,"nach":temp});
      xhr.send(data);


      firstclick = null;
      temp = null;

      //TODO: Fordere hier das neue Board an!
    }

  };


  // End click

  // Async Function to fetch the API with getStaticProps and place the figures
  const callAPI = async () => {
    console.log("Call API");

    // Search trough data of the json we got from the api
    const data = chessboardData;
    const body = JSON.parse(data["body"]);
    const spielfeld = body["spielfeld"];
    SpieleID = body["controller"]["id"];
    console.log(spielfeld);

    // Place each chess-figure
    for (let k in spielfeld){
 
      let Container = document.getElementById(k);
      let button = document.createElement('button');
      button.id = spielfeld[k];
      button.classList.add(styles.button_click);

      // Füge hier ein onMouseEnter hinzu
      Container.onmouseenter = handleMouseHover;
      //Und hier den Click irgendwo im Fenster als trigger
      window.addEventListener('click', handleClick);

      if (spielfeld[k] !== "-"){

        let image = document.createElement('img');
        let src = "../";
      
        switch (spielfeld[k]){
          case "t":
            src += "Rook-W.svg";
            break;
          case "T":
            src += "Rook-B.svg";
            break;
          case "s":
            src += "Knight-W.svg";
            break;
          case "S":
            src += "Knight-B.svg";
            break;
          case "l":
            src += "Bishop-W.svg";
            break;
          case "L":
            src += "Bishop-B.svg";
            break;
          case "d":
            src += "Queen-W.svg";
            break;
          case "D":
            src += "Queen-B.svg";
            break;
          case "k":
            src += "King-W.svg";
            break;
          case "K":
            src += "King-B.svg";
            break;
          case "b":
            src += "Pawn-W.svg";
            break;
          case "B":
            src += "Pawn-B.svg";
            break;
        }

        image.src = src;
        image.id = spielfeld[k];

        button.appendChild(image);
      } 

      Container.appendChild(button);
    }
  }

  //für Pop up window zum testen
  const [buttonPopup, setButtonPopUp] = useState(false);

    if (!session) {
      return (
          <div className={styles.container}>
            <Head>
              <title>FancyChess</title>
              <link rel="icon"  href="../public/logo.ico" />
            </Head>
            <div className="section" id={styles.menu}>
              <Menu/>

            </div>

            <div className="section" id={styles.game}>
              <div className="board" id={styles.board}>
                <ChessBoard />
                <WinLosePopUp trigger={buttonPopup} setTrigger={setButtonPopUp}>
                </WinLosePopUp>

              </div>

            </div>

            <div>

          <div className="section" id={styles.log}>

            <p id="time">00:00
            </p>

              <div className={styles.buttons}>
                <button id="inviteLink">
                  inviteLink
                </button>

                <button id="startbutton" onClick={() => { callAPI(); handleStartEnd(); }}>
                  {checkGame ? 'END' : 'START'}
                </button>
              </div>

              <div id={styles.playerMoveHistory}>
                <p>erster Zug</p>
                <p>zweiter Zug</p>
                <a className={styles.link}>
                  <button onClick={() => setButtonPopUp(true)}>Pop Up Window</button>

                </a>
              </div>

            </div>


            <style global jsx>{`
        html,
        body{
          background-image: url("../public/background.jpg");
          height: 100vh;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          }
         `}</style>


          </div>

          </div>
      )
    }
    return (
        <div>
          <UserNotLoggedIn></UserNotLoggedIn>
        </div>
    )
}

