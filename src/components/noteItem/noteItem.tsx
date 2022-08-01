import { useAppDispatch } from '../../hooks'
import './noteItem.scss'
import {  changeFavorite, deleteNotes, fetchNotes } from '../../store/slice/notesSlice'
export type INoteItem = {
    name: string,
    title: string,
    time: number | string,
    important: boolean,
    id: string,
    color: string,
    
}

const NoteItem  = (props: INoteItem) => {
  const {name, title, time, id, important} = props
  const text = title.length > 260 ? title.slice(0, 248) + '...' : title
  const clazz = +important ? "circle imp" : "circle"

  const dispatch = useAppDispatch()


  return (
   <>
    <div className='note' style={{backgroundColor: props.color}}>
      <div className='note__first'>
      <span
      onClick={async() => {
        let a = {"important": !important}
        let b = await JSON.stringify(a)
        
        dispatch(changeFavorite({b, id}))
        
        
        
      }}
      className={clazz}></span>
      <i className="bi bi-x-circle"
      onClick={() =>{
        dispatch(deleteNotes(id))
        
      }}
      ></i>
      </div>
      <span className='name'>{name}</span>
      
      <div className='text'>
        <p>{text}</p>
      </div>
      <div className='line'></div>
      <div className='time'>Дата: {time}</div>
    </div>
   </>
  )
}

export default NoteItem