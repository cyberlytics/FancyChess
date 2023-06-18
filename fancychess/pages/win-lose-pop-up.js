import Head from 'next/head';
import React from 'react';
import styles from '../styles/win-lose-pop-up.module.css';

export default function WinLosePopUp(props) {

    const win_pop_up = () => {
        
    }

    const lose_pop_up = () => {
    
    }


    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <h1>HELLO</h1>
                <button onClick={() => props.setTrigger(false)}>Back</button>
            </div>
        </div>
    ) : "";
}