import { useAppDispatch } from '../../hooks'
import './noteItem.scss'
import { deleteNotes } from '../../store/slice/notesSlice'
export type INoteItem = {
    name: string,
    title: string,
    time: number | string,
    important: boolean,
    id: string,
    color: string,
    importantHandler: (id:string) => void,
    
}

const NoteItem  = (props: INoteItem) => {
  const {name, title, time, id, important, importantHandler} = props
  const text = title.length > 260 ? title.slice(0, 248) + '...' : title
  const clazz = +important ? "circle imp" : "circle"

  const dispatch = useAppDispatch()


  return (
   <>
    <div className='note' style={{backgroundColor: props.color}}>
      <div className='note__first'>
      <span
      onClick={() => {
        importantHandler(id)
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