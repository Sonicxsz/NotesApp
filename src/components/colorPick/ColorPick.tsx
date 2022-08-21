import Typography from "@mui/material/Typography";
import { useState } from "react";
import style from './ColorPick.module.scss'

interface ColorPickProps{
    setColor: (i:string) => void
    color: string
}

export const noteSelecColors = [
    { id: 0, name: "#2E958C" },
    { id: 1, name: "#589d62" },
    { id: 2, name: "#945D87" },
    { id: 3, name: "#EF7663" },
    {id:4, name: '#a8296b'},
    {id:5, name: '#303d55'},  
]

function ColorPick ({setColor, color}:ColorPickProps):JSX.Element {
    const [colorBtns, setColorBtns] = useState(noteSelecColors);

    return (
        <div className={style.colors} >
            <Typography mr={1} variant="body1">
            Цвет:
            </Typography>
            {colorBtns.map((i) => {
            let clazz =
                i.name === color ? `${style.colorPick}` : `${style.color}`;
            return (
                <div
                onClick={() => {
                    setColor(i.name);
                }}
                key={i.id}
                className={clazz}
                style={{ backgroundColor: i.name }}
                ></div>
            );
            })}
        </div>
    )
}


export default ColorPick;