import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../../styles/chess-board.module.css'

import React from 'react';



export default function ChessBoard() {

    const number_to_label = (num) => {
        switch (num){
            case 1:
                return('A');
            case 2:
                return('B');
            case 3:
                return('C');
            case 4:
                return('D');
            case 5:
                return('E');
            case 6:
                return('F');
            case 7:
                return('G');
            case 8:
                return('H');
        }
    }

    const invert_number = (num) => {
        switch (num){
            case 1:
                return('8');
            case 2:
                return('7');
            case 3:
                return('6');
            case 4:
                return('5');
            case 5:
                return('4');
            case 6:
                return('3');
            case 7:
                return('2');
            case 8:
                return('1');
        }
    }

    const tablecell_w = (x,y) => {
        return(
            <>
                <th>
                    <div className={styles.cell_w}>

                    </div>
                </th>
            </>
        )
    }

    const tablecell_b = (x,y) => {
        return(
            <>
                <th>
                    <div className={styles.cell_b}>

                    </div>
                </th>
            </>
        )
    }

    const tablecell_l = (x,y) => {
        let label = "";
        if((x == 0 || x == 9) && !(y == 0 || y == 9)){
            label += invert_number(y);
        }

        if((y == 0 || y == 9) && !(x == 0 || x == 9)){
            label = number_to_label(x);
        }
        return(
            <>
                <th>
                    <div className={styles.cell_l}>
                        {label}
                    </div>
                </th>
            </>
        )
    }

    const tablecell = (y) => {
        return <>
            {

                Array.from({length: 10},(v,x) => {

                    console.log(x,y)

                    if (y == x && ((y == 0)||(y==9)))
                    {
                        return(<>{tablecell_l(x,y)}</>)
                    } 

                    else if ((x == 0 && y == 9) || (x == 9 && y == 0))
                    {
                        return(<>{tablecell_l(x,y)}</>)
                    }  

                    else if ((x == 0)||(y == 0) || (x == 9) || (y == 9)){
                        return(<>{tablecell_l(x,y)}</>)
                    }

                    else if (y % 2 == 1){
                        if(x % 2 == 0)
                        {
                            return(<>{tablecell_b(x,y)}</>)
                        } else {
                            return(<>{tablecell_w(x,y)}</>)
                        }
                        
                    }  
                    
                    else if(x % 2 == 0){
                        return(<>{tablecell_w(x,y)}</>)
                    } else return(<>{tablecell_b(x,y)}</>)
                })
            }
        </>
    }

    const row = () => {
        return <>
            {
                Array.from({length: 10},(v,y) => {
                    return(
                        <>
                            <tr className={styles.row}> {tablecell(y)} </tr>
                        </>
                    )
                })
            }
        </>
    }

    const createTable = () => {
        let table = []

        for (let i = 0; i < 8; i++){
            let cell = []

            for (let j = 0; j < 8; j++){
                cell.push(<td>{'Col $(j+1)'}</td>)
            }

            table.push(<tr>{cell}</tr>)
        }

        return (table)
    }

    return (
        <div className={styles.board}>
            <table className={styles.table}>
                {row()}
            </table>
        </div>
      
    );
  }
  