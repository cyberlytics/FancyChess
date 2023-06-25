import Head from 'next/head';
import React from 'react';
import styles from '../styles/gamehistory-pop-up.module.css'

export default function GameHistoryPopUp(props) {


    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <table id="tableID" className={styles.gamehistory_table}>
                    <thead>
                        <tr>
                            <th>Spiler1 Name</th>
                            <th>Spiler2 Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Spiler1 Bewegung1</td>
                            <td>Spiler2 Bewegung1</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung2</td>
                            <td>Spiler2 Bewegung2</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung3</td>
                            <td>Spiler2 Bewegung3</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung4</td>
                            <td>Spiler2 Bewegung4</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung5</td>
                            <td>Spiler2 Bewegung5</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung6</td>
                            <td>Spiler2 Bewegung6</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung7</td>
                            <td>Spiler2 Bewegung7</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung8</td>
                            <td>Spiler2 Bewegung8</td>
                        </tr>
                        <tr>
                            <td>Spiler1 Bewegung9</td>
                            <td>Spiler2 Bewegung9</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => props.setTrigger(false)} className={styles.accept_button} >Accept</button>
            </div>

        </div>
    ) : "";
}