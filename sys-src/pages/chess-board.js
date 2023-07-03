import styles from '../styles/chess-board.module.css'
import React from 'react';

export default function ChessBoard() {

    // Erstelle 10 Reihen für unser Spielbrett
    const create_rows = () => {
        return <>
            {
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

    // Erstelle jedes Feld mit einer einzigartigen ID
    const create_cells = (y) => {
        return <>
            {
                Array.from({length:10},(v,x) => {
    
                    // Const's variables to create diffrent div-Container in each cell
                    const key_x = number_to_label(x);
                    const key_y = invert_number(y);
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
    
    // Erstelle unterschiedliche Div-Container in jeder Zelle
    const create_div = (x,y,color,label) => {

        const key_x = x.toLowerCase();
        const key_y = y;

        return(
            <div key={`div(${key_y},${key_x})`} className={color} id={`${key_x}${key_y}`}>
                {label}
            </div>
        )
        
    }

    // Erstelle die Label (A,B,C, ... , 1,2,3, ...) mithilfe den Koordinaten
    const create_label = (x,y) => {
        let label = "";

        if((x === 0 || x === 9) && !(y === 0 || y === 9)){
            label += invert_number(y);
        }

        if((y === 0 || y === 9) && !(x === 0 || x === 9)){
            label = number_to_label(x);
        }

        return label;
    }

    // Aendere die Koordinaten zu ihrer jeweiligen Farbe -> Schwarz / Weiß
    const create_color = (x,y) => {
        if ((x === 0 || x === 9) || (y === 0 || y === 9)){
            return("label");
        } else if (((y % 2 === 1) && (x % 2 === 1)) || (y % 2 === 0) && (x % 2 === 0)){
            return("white");
        } else {
            return("black");
        }
    }

    // Nun wir das noch in den Styles abgeaendert
    const create_cell_color = (color) => {
        if (color === "label"){
            return(styles.cell_l);
        } else if (color === "white"){
            return(styles.cell_w);
        } else if (color === "black"){
            return(styles.cell_b);
        }
    }

    // Zahlen zu Buchstaben konvertieren
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

    // Zahlen zu Zahlen konvertieren..
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

    // Hier wird das Spielbrett erstellt
    return (
        <div className={styles.board}>
            <table className={styles.table} key = {`1`} id = {"chess-board"}>
                <tbody>
                    {create_rows()}
                </tbody>
            </table>
        </div>
    );
  }
