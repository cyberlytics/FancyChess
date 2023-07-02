import Head from 'next/head';
import styles from '../styles/Home.module.css';
import ChessBoard from './chess-board.js';
import Menu from './menu.js';
import UserNotLoggedIn from './user_not_logged_in.js';
import React, {useEffect, useState} from 'react';
import {useSession} from "next-auth/react"
import WinLosePopUp from './win-lose-pop-up.js'
const axios = require('axios');


// get Static Props async function to negate the CORS-Error and to fetch the api
export const getStaticProps = async () => {

  const url = 'https://f798gy610d.execute-api.eu-central-1.amazonaws.com/startGamer/GameStart'

  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {chessboardData: data}
  }
}

export default function Home({chessboardData}) {
  const { data: session } = useSession()

  const [checkGame , setGameStart] = useState(false);
  const [GameID, setGameID] = useState(NaN);
  const [updateBoard, setupdateBoard] = useState(NaN);
  const [currentGameLive, setcurrentGameLive] = useState(NaN);

  const handleStartEnd = () => {
    setGameStart(!checkGame);
  };

// get Static Props async function to negate the CORS-Error and to fetch the api
  const getBoard = async (url,GameID) => {
    url += "?ID="+GameID
    //TODO: wirft einen Fehler wenn es einen NULL-Wert zurück bekommt
    const response = await fetch(url);
    const data = await response.json();
    return {
      props: {chessboardData: data}
    }

  }

// You have to click.
  let switchi = true;
  let temp;
  let firstclick = null;
  let gameID = NaN;

  let firstTurn = true;

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

      //Ist das ein bestehendes Spiel?
      //Ist der Einladungslink vorhanden?


      //Wurde das Board über einen Einladungslink angefordert?
      let surl = new URL(window.location.href);
      console.log(surl["search"])
      if(surl["search"] === ""){
        console.log("neu");
      }else {
        console.log("eingeladen!")
        setcurrentGameLive(true);
        firstTurn = false;
      }

      //Ist das der erste Zug?
      if(firstTurn){
        let xhr = new XMLHttpRequest();
        let url = "api/game/createDB";
        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify({"ID": gameID, "von": firstclick, "nach": temp});
        xhr.send(data);
        firstTurn = false;

      }else{
        let xhr = new XMLHttpRequest();
        let url = `api/game/update?seed=${genRandomString(5)}`;
        xhr.open("PUT", url, false);  // Make the request asynchronous
        xhr.setRequestHeader("Content-Type", "application/json");
        let data = JSON.stringify({ "ID": gameID, "von": firstclick, "nach": temp });
        xhr.send(data);

      }

      firstclick = null;
      temp = null;
      let xhr = new XMLHttpRequest();
      let url = `api/game/update?ID=${gameID}&seed=${genRandomString(5)}`;
      xhr.open("GET", url, false);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            await place_figures_again(response["board"]);
            //Speichere hier der lokale aktuelle Bord zwischen, um es später zu vergleichen

            setupdateBoard(response["board"]);

          } else {
            console.error('Error:', xhr.status);
          }
        }
      };

      xhr.send();

    }

  };

  const genRandomString = (length) => {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }

  const place_figures = async (spielfeld) => {

    let elementExists = document.getElementById("-");
    console.log(elementExists);
    if(elementExists != null){

      let table = document.getElementById('chess-board');
      let buttons = table.getElementsByTagName('button');

      let len_buttons = buttons.length;

      for(let i = len_buttons -1; i >= 0; i--){
        buttons[i].remove();
      }
    }

    for (let k in spielfeld){

      let Container = document.getElementById(k);
      let button = document.createElement('button');
      button.id = spielfeld[k];
      button.classList.add(styles.button_click);

      // Füge hier ein onMouseEnter hinzu
      try {
        Container.onmouseenter = handleMouseHover;

        //Und hier den Click irgendwo im Fenster als trigger
        window.addEventListener('click', handleClick);

      } catch (error) {
        console.error(error);
      }

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


  const place_figures_again = async (spielfeld) => {

    spielfeld = JSON.parse(spielfeld);

    let elementExists = document.getElementById("-");
    if(elementExists != null){

      let table = document.getElementById('chess-board');
      let buttons = table.getElementsByTagName('button');

      let len_buttons = buttons.length;

      for(let i = len_buttons -1; i >= 0; i--){
        buttons[i].remove();
      }
    }

    for (let k in spielfeld){

      let Container = document.getElementById(k);
      let button = document.createElement('button');
      button.id = spielfeld[k];
      button.classList.add(styles.button_click);


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

  const createInviteLink = async () => {
    console.log("Invite Link pressed!")
    if(isNaN(GameID)){
      console.log("Es wurde noch kein Spiel erstellt!")
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Es wurde noch kein Spiel erstellt!");
        }
      });
    } else {
      //Hier wird der Link erstellt...
      const currentURL = window.location.href;
      const url = new URL(currentURL);
      const params = new URLSearchParams(url.search);
      params.set("invitelink", GameID);
      const newURL = `${url.origin}${url.pathname}?${params.toString()}`;
      //wird nur zu testzwecken ausgegeben
      console.log("Invite Link:", newURL);

      //Hier ein wunderschönes nerviges PoP-Up..
      copyTextToClipboard(newURL);
      window.alert("Einladungslink: \n" + newURL);

      //Direkt umleiten
      window.location.href = newURL;
    }
  }

  const copyTextToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.value = text;
    document.body.appendChild(textField);
    textField.select();
    //Nur zur Anmerkung: Das ist eine Sicherheitslücke... Nur temporär..
    document.execCommand('copy');
    textField.remove();
  };

  //Wenn ich über einen Einladungslink auf die Webseite gehe, soll direkt das passende Spielangezeit werden
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invitelink = urlParams.get('invitelink');
    if (invitelink) {
      console.log('Invite Link:', invitelink);

      //Frage wie oben das Spiel an
      firstTurn = false;

      let xhr = new XMLHttpRequest();
      let url = `api/game/update?ID=${invitelink}&seed=${genRandomString(5)}`;
      xhr.open("GET", url, false);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            await place_figures_again(response["board"]);
          } else {
            console.error('Error:', xhr.status);
          }
        }
      };

      xhr.send();

      //Das sind all meine Keys:
      const myList = [
        'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
        'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
        'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
        'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
        'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
        'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
        'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
        'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'
      ];

      //Füge überall den MouseHOver hinzu
      for (let i = 0; i < myList.length; i++) {
        try {
          let container = document.getElementById(myList[i]);
          container.onmouseenter = handleMouseHover;
          //Und hier den Click irgendwo im Fenster als trigger
          window.addEventListener('click', handleClick);
        } catch(e) {
          console.log(e)
        }
      }
      //nun noch die GameID festlegen
      gameID = invitelink;

      startUpdateBoardInterval()
    }
  }, []);

  const startUpdateBoardInterval = () => {
    setInterval(() => {
      console.log("Check for update...")
      if (firstclick != null)
        return;

      if (firstTurn) {
        return;
      }

      let xhr = new XMLHttpRequest();
      let url = `api/game/update?ID=${gameID}&seed=${genRandomString(5)}`;
      xhr.open("GET", url, false);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onreadystatechange = async function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            if (firstclick != null)
              return;
            
            const response = JSON.parse(xhr.responseText);
            await place_figures_again(response["board"]);
          } else {
            console.error('Error:', xhr.status);
          }
        }
      };

      xhr.send();
    }, 250)
  }

  useEffect(() => {
    console.log("GameID:", GameID);
    setGameID(GameID);
  }, [GameID]);



  /*

 //Wurde das Board abgeändert?
 function boardChanged() {

   //Frage das aktuelle Spiel in der Datenbank ab
   let xhr = new XMLHttpRequest();
   let url = `api/game/update?ID=${GameID}`;
   xhr.open("GET", url, false);
   xhr.setRequestHeader("Content-Type", "application/json");

   xhr.onreadystatechange = async function () {
     if (xhr.readyState === XMLHttpRequest.DONE) {
       if (xhr.status === 200) {
         const response = JSON.parse(xhr.responseText);

         if(!isNaN(updateBoard) && !isNaN(response["board"])){
           console.log("Beide Board vorhanden!")
         }

         if(!isNaN(updateBoard)){
           console.log("UpdateBoard:")
           console.log(updateBoard)
         }

         //await place_figures_again(response["board"]);
         //Speichere hier der lokale aktuelle Bord zwischen, um es später zu vergleichen
         //setupdateBoard(response["board"]);
       } else {
         console.error('Error:', xhr.status);
       }
     }
   };

   xhr.send();

   // Lade die Seite neu
   //window.location.reload();


 }

 setInterval(boardChanged,4000);

 function bordo(){
   if (!isNaN(updateBoard)){
     console.log("ADKLASHODISAOIDh")
   }
 }
*/

  //setInterval(bordo,200);


/*
  async function updateGame() {

    const urlParams = new URLSearchParams(window.location.search);
    const GameIDLoc = urlParams.get('invitelink');

    try {
      const response = await axios.get(`api/game/update?ID=${GameIDLoc}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Process the response data

      console.log("alteBoard");
      console.log(updateBoard)

      console.log("test")
      if(!isNaN(updateBoard)){
        console.log("neuesBoard: ")
        console.log(response.data);

      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  }


  setInterval(updateGame,4000);
*/


  // End click
  // Async Function to fetch the API with getStaticProps and place the figures
  const callAPI = async () => {

    // Search trough data of the json we got from the api
    const body = JSON.parse(chessboardData["body"]);
    const spielfeld = body["spielfeld"];
    gameID = body["controller"]["id"];
    setGameID(body["controller"]["id"]);
    console.log(gameID);
    setGameID(gameID);

    // Place each chess-figure
    await place_figures(spielfeld);

    startUpdateBoardInterval();
  }

  //für Pop up window zum testen
  const [buttonPopup, setButtonPopUp] = useState(false);

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
            <button id="inviteLink" onClick={()=>{createInviteLink();}} >
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
