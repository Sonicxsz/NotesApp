import './delete.scss'
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { deleteNotes } from '../../../store/slice/notesSlice';
import NoteItem from '../../noteItem/noteItem';
import { useEffect } from 'react';

function DeletePage() {
 const notes = useAppSelector((state) => state.notesSlice.notes)
 const dispatch = useAppDispatch()
 const deletedNotes = notes.filter((i) => i.remove && i)
useEffect(() =>{
  deletedNotes.map((i) =>{
    let iTime = i.removeTime
    let currentTime = Date.now()
      if(+iTime <= currentTime){
        dispatch(deleteNotes(i._id))
      }else{
        console.log(currentTime, ' время есть')
        
      }
    }
  )
}, [])

  return (
    <div className='deleteWrapper'>
      <div className='deleteNotice'>
      <span>Заметки удаляются из корзины через 3 дня.</span> 
      <button
        onClick={() =>{
          if(window.confirm('Вы действительно хотите удалить все заметки')){
              deletedNotes.map(i =>{
                dispatch(deleteNotes(i._id))
              })
            
          }
        }}
      >Очистить корзину</button>
      </div>
      
      <div className='wrap'>
       
       {deletedNotes.length > 0 && 
       deletedNotes.map((i, ind )=> <NoteItem 
        color={i.color}
        important={i.important}
        key={ind}
        title={i.title}
        name={i.name}
        _id={i._id}
        time={i.time}
        removeTime={i.removeTime}
        delete={true}
                 />
       
       )}

    
 </div>
    </div>
  )
}

export default DeletePage