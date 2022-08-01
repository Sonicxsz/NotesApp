import { useAppDispatch } from '../../hooks'
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import './noteItem.scss'
import {  changeFavorite, deleteNotes, fetchNotes } from '../../store/slice/notesSlice'
import { Button } from '@mui/material';
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
  const color = +important ? "warning" : 'inherit'

  const dispatch = useAppDispatch()


  return (
   <>
    <div className='note' style={{backgroundColor: props.color}}>
      <div className='note__first'>
      <BookmarkOutlinedIcon
      color={color}
      fontSize='large'
      onClick={async() => {
        let a = {"important": !important}
        let b = await JSON.stringify(a)
        
        dispatch(changeFavorite({b, id}))   
      }}
      ></BookmarkOutlinedIcon>
      <ClearIcon
      fontSize='medium'
      onClick={() =>{
        dispatch(deleteNotes(id))
        
      }} >
      </ClearIcon>
      </div>
      <span className='name'>{name}</span>
      
      <div className='text'>
        <p>{text}</p>
      </div>
      <div className='line'></div>
      <div className='flex'>
      <div className='time'>Дата: {time}</div>
      
       <div className='imp'>
       <OpenInFullIcon
        fontSize='small'
        />
       </div>
      
      </div>
    </div>
   </>
  )
}

export default NoteItem