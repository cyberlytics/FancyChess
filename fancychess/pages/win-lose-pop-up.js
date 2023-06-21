import Head from 'next/head';
import React from 'react';
import styles from '../styles/win-lose-pop-up.module.css';

export default function WinLosePopUp(props) {

    const win_pop_up = () => {
        return (
            <h1>WINNER</h1>
        );
    }

    const lose_pop_up = () => {
        return (
            <div>
                <h1>LOSE</h1>
                <style>{`
                .popup{
                    background-color: rgb(255, 130, 130);
                }
                `}</style>
            </div>
        )
    }


    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                {lose_pop_up()}
                <div className= {styles.profilpic_winner}></div>
                <div className= {styles.profilpic_loser}></div>
                <button onClick={() => props.setTrigger(false)} className={styles.accept_button} >Accept</button>
            </div>
        </div>
    ) : "";
}