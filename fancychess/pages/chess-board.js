import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/chess-board.module.css'

import React from 'react';

export default function ChessBoard() {

    // Create 10 rows for our Chess-Board
    const create_rows = () => {
        return <>
            {
                // Loop ten times and create 10 unique rows
                Array.from({length:10},(v,y) => {

                    // Unique keys for all tablerows
                    const key_y = y;
                    return(
                        
                        <tr className={styles.row} key={`row${key_y}`} id={`row${key_y}`}>
                            {create_cells(y)}
                        </tr>
                    )
                })
            }
        </>
    }

    // Function to create all cells of the tabel with unique ids and keys dynamically
    const create_cells = (y) => {
        return <>
            {
                // Loop 10 times to create 10 cells in each row
                Array.from({length:10},(v,x) => {
    
                    // Const variables to create diffrent div-Container in each cell
                    const key_x = number_to_label(x);
                    const key_y = y;
                    const label = create_label(x,y);
                    const color = create_color(x,y);
    
                    return(
                        <th key={`cell(${key_y},${key_x})`} id={`cell(${key_y},${key_x})`}>
                            {create_div(key_x,key_y,create_cell_color(color),label)}
                        </th>
                    )
                })
            }
        </>
    }
    
    // Function for creating diffrent dif-Container in each cell
    const create_div = (x,y,color,label) => {

        const key_x = number_to_label(x);
        const key_y = y;

        return(
            <div key={`div(${key_y},${key_x})`} className={color} id={`div(${key_y},${key_x})`}>
                {label}
            </div>
        )
        
    }

    // Function to create the label (A,B,C, ... , 1,2,3, ...) via coordinates
    const create_label = (x,y) => {
        let label = "";

        if((x == 0 || x == 9) && !(y == 0 || y == 9)){
            label += invert_number(y);
        }

        if((y == 0 || y == 9) && !(x == 0 || x == 9)){
            label = number_to_label(x);
        }

        return label;
    }

    // Function to change coordinates into their respective color
    const create_color = (x,y) => {
        if ((x == 0 || x == 9) || (y == 0 || y == 9)){
            return("label");
        } else if (((y % 2 == 1) && (x % 2 == 1)) || (y % 2 == 0) && (x % 2 == 0)){
            return("white");
        } else {
            return("black");
        }
    }

    // Function to change colors into their css-classname
    const create_cell_color = (color) => {
        if (color == "label"){
            return(styles.cell_l);
        } else if (color == "white"){
            return(styles.cell_w);
        } else if (color == "black"){
            return(styles.cell_b);
        }
    }

    // Function for changing numbers into letters (labeling)
    const number_to_label = (num) => {
        switch (num){
            case 0:
                return(' ');
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
            case 9:
                return('I');
        }
    }
    
    // Function for inverting numbers (labeling)
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

    // Main return of chess-board.js (table will be created here)
    return (
        <div className={styles.board}>
            <table className={styles.table} key = {`1`}>
                <tbody>
                    {create_rows()}
                </tbody>
            </table>
        </div>
    );
  }
