import Head from 'next/head';
import React from 'react';
import styles from '../styles/win-lose-pop-up.module.css';

export default function WinLosePopUp(props) {

    const win_pop_up = () => {
        return (
            <div>
                <h3>WIN</h3>
            </div>
        )
    }

    const lose_pop_up = () => {
        return (
            <h3>LOSE</h3>
        )
    }

    const color_of_pop_up = (state) => {
        switch(state){
            case "winner":
                return(
                    <style>{`
                        h3{
                            text-align: center;
                            font-size: 30px;
                        }
                        .popup_inner{
                            background-color: rgb(130, 255, 130);
                        }
                    `}</style>
                );
            case "loser":
                return(
                    <style>{`
                        h3{
                            text-align: center;
                        }
                        .popup_inner{
                            background-color: rgb(255, 130, 130);
                        }
                    `}
                    </style>
                )
    
        }
    }


    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                {win_pop_up()}
                <div className= {styles.profilpic_winner}></div>
                <div className={styles.player1details}>
                    <p className={styles.player1name}>Name1</p>
                    <p className={styles.player1elo}>Elo1</p>
                    <p className={styles.player1plus}>+24</p>
                </div>
                <div className={styles.player2details}>
                    <p className={styles.player2name}>Name2</p>
                    <p className={styles.player2elo}>Elo2</p>
                    <p className={styles.player2minus}>-24</p>
                </div>
                <div className= {styles.profilpic_loser}></div>
                <button onClick={() => props.setTrigger(false)} className={styles.accept_button} >Accept</button>
            </div>
                {color_of_pop_up("winner")}
                
            </div>
    ) : "";
}