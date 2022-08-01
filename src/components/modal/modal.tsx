import { Box, TextField, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { nanoid } from 'nanoid'
import React, {useState} from 'react'
import { timeCreater } from '../../utils/time'
import style from './modal.module.scss'
import { Istate } from '../noteItem/NoteItemList'
import {addNotes} from '../../store/slice/notesSlice'
import {useAppDispatch} from '../../hooks'
import ModalNote from './modalNote'
interface Imodal {
    closeNote: (value:boolean) => void

}





const Modal = (props:Imodal) => {
    const [mode, setMode] = useState<string>("1")
    
    const clazz = mode === "1" ? 'success' : 'standard'

  return (
    <div className={style.dark}>
        <div className={style.wrap}>
        <ToggleButtonGroup
        color="primary"
        exclusive
        value={mode}
        size='small'
        fullWidth
        style={{maxWidth: '100px', maxHeight: '25px', margin:'0 30%'}}
        >
        <ToggleButton
        value='1'
        color='warning'
        onClick={() =>{
            setMode("1")
        }}
        size='small'>Note</ToggleButton>
        <ToggleButton
        onClick={() =>{
            setMode("2")
        }}
        color='warning'
        size='small' value="2">List</ToggleButton>
        </ToggleButtonGroup>
            {mode === '1' ? <ModalNote closeNote={props.closeNote} /> : null}
           

        </div>
    </div>
  )
}

export default Modal