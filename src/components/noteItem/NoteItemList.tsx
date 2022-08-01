import React, { useEffect } from 'react'
import NoteItem from './noteItem'
import './noteItem.scss'

import {useAppDispatch, useAppSelector} from '../../hooks';


export interface Istate {
  name: string;
  title: string;
  time: number | string;
  color: string;
  important: boolean;
  id: string;
 };



const  NoteItemList:React.FC = () => {

  
  const {notes, important} = useAppSelector(state => state.notesSlice)

  
 
 let filteredNotes = important ? notes.filter(i =>{
    if(i.important){
      return i
    }
 }) : notes
  

  return (
      <div className='wrap'>
      {filteredNotes.length > 0 ? filteredNotes.map((i, ind) =>{
       return <NoteItem  color={i.color} important={i.important} key={ind} title={i.title} name={i.name} id={i.id} time={i.time}/>
      }) : (
        <div><h1>пока нету заметок</h1></div>
      )}
    </div>
  )
}


export default NoteItemList;