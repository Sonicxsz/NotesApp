import { Box, TextField, Button, Typography } from '@mui/material'
import { nanoid } from 'nanoid'
import React, {useState} from 'react'
import { timeCreater } from '../../utils/time'
import style from './modal.module.scss'
import { Istate } from '../noteItem/NoteItemList'
import {addNotes} from '../../store/slice/notesSlice'
import {useAppDispatch} from '../../hooks'
interface Imodal {
    closeNote: (value:boolean) => void

}





const Modal = (props:Imodal) => {
    const [name, setName] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [colorBtns, setColorBtns] = useState([
        {id: 0, name: "#2E958C"},
        {id: 1, name: "#4ca65f"},
        {id: 2, name: "#c35fcc"},
        {id: 3, name: "#e57a2d"},
    ])
    const [color, setColor] = useState<string>("#2E958C")

    const dispatch = useAppDispatch()
    
  return (
    <div className={style.dark}>
        <div className={style.wrap}>
            <Box>
            <div className={style.flex}>
            
            <TextField 
            value={name}
            onChange={(e) =>{
                setName(e.target.value)
            }}
            className={style.nameInp} 
            id="standard-basic" 
            label="Введите название заметки" 
            variant="standard" />
            
        </div>
       
      
        <div className={style.flex}>
        <TextField
            minRows={2}
            maxRows={6}
            value={title}
            onChange={(e) =>{
                setTitle(e.target.value)
            }}
          className={style.textInp}
          id="standard-textarea"
          label="Пишите...."
          placeholder="Творите"
          multiline
          variant="standard"
        />
      
      
        </div>
            </Box>
            <div className={style.colors}>
                <Typography mr={1} variant='body1'>
                    Выберите цвет:
                </Typography>
                {colorBtns.map(i =>{
                    let clazz = i.name === color ? `${style.colorPick}` : `${style.color}`
                    return <div
                    onClick={() =>{
                        setColor(i.name)
                    }}
                    key={i.id} className={clazz} style={{backgroundColor: i.name}} ></div>
                })}
            </div>
            
            
            <div className={style.btns}>
            <Button 
            onClick={() => {
                props.closeNote(false)
            }}
            variant="outlined" color="error">
                Отменить
            </Button>
            <Button 
            onClick={() => {
                let id = nanoid()
                let date = timeCreater()

                let newNote:Istate = {
                    important: false,
                    name: name,
                    title,
                    id,
                    time: date,
                    color,

                }
                const json = JSON.stringify(newNote)

                dispatch(addNotes(json))
                props.closeNote(false)
                
            }}
            variant="contained" color="success">
                Добавить
            </Button>
            </div>
           

        </div>
    </div>
  )
}

export default Modal