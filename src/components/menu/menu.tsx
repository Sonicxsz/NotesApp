import React from 'react'
import style from './menu.module.scss'
import {useAppSelector, useAppDispatch} from '../../hooks'
import { useDispatch } from 'react-redux'
import {changeImportant} from '../../store/slice/notesSlice'


function Menu(props:any) {
  const important = useAppSelector(state => state.notesSlice.important)
  const dispatch = useAppDispatch()
  
  return (
    <div className={style.wrap}>
        <div className={style.item}
         onClick={() =>{
          dispatch(changeImportant(false))
        }}
        ><i className="bi bi-journal-bookmark"></i></div>
        <div className={style.item}><i className="bi bi-star"
          onClick={() =>{
            dispatch(changeImportant(true))
          }}
        ></i></div>
        <div className={style.item}><i className="bi bi-trash-fill"></i></div>
        <div className={style.item}
          onClick={() =>{
            props.openNote(true)
          }}
        ><i className="bi bi-plus-circle-dotted"></i></div>
    </div>
  )
}

export default Menu