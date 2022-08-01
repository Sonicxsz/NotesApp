import { Button } from '@mui/material'
import style from './modal.module.scss'

interface btnProps {
    addNewNote: () => void
    closeNote: (arg:boolean) => void
}

function ModalBtns(props:btnProps) {
  return (
    <>
     <div className={style.btns}>
            <Button 
            onClick={() => {
                props.closeNote(false)
            }}
            variant="outlined" color="error">
                Отменить
            </Button>
            <Button 
            onClick={props.addNewNote}
            variant="contained" color="success">
                Добавить
            </Button>
    </div>
    </>
  )
}

export default ModalBtns