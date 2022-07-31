import React, { useEffect } from 'react'
import NoteItem from './noteItem'
import './noteItem.scss'
import { fetchNotes } from '../../store/slice/notesSlice'
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
  
  const dispatch = useAppDispatch()

  const notes = useAppSelector(state => state.notesSlice.notes)
  const loading = useAppSelector(state => state.notesSlice.loading)
  function importantHandler(id: string): void{
    if(notes){
      let newNotes = [...notes].filter(i =>{
        if(i.id === id){
          i.important = !i.important
          return i
        }else{
          return i
        }
      })
   
    }

  }


  useEffect(() =>{
    dispatch(fetchNotes())
  },[])

  useEffect(() =>{
    dispatch(fetchNotes())
  },[loading])

  

  return (
      <div className='wrap'>
      {notes.length > 0 ? notes.map((i, ind) =>{
       return <NoteItem importantHandler={importantHandler} color={i.color} important={i.important} key={ind} title={i.title} name={i.name} id={i.id} time={i.time}/>
      }) : (
        <div><h1>пока нету заметок</h1></div>
      )}
    </div>
  )
}


export default NoteItemList;