import { useState } from "react";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { TextField } from "@mui/material";
import { MiniButton } from "../../buttons/Button";
import ModalBtns from "../modalBtns";
import styles from '../modal.module.scss'
import ColorPick from "../../colorPick/ColorPick";
import cn from 'classnames'
import {useAppDispatch} from '../../../hooks'
import {addTodo, fetchTodos, Itodo, todo} from '../../../store/slice/todoSlice'
import { timeCreater } from "../../../utils/time";

interface ImodalTodoProps {
  closeNote: (val: boolean) => void
}

function ModalTodo({closeNote}:ImodalTodoProps) {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<todo[]>([])
  const [color, setColor] = useState("#2E958C")

  const deleteTodo = (i:number) => {
    const filtered = todos.filter((todo, index) => index !== i)
    setTodos(filtered)
  }


  const dispatch = useAppDispatch();
  function addNewNote() {
    if(name.length > 0 && todos.length > 0){
    let date = timeCreater(2);
      let newTodo: Itodo = {
        important: false,
        isTodo: true,
        name: name,
        todosAr: todos,
        time: date,
        color,
    };
    const json = JSON.stringify(newTodo);
    dispatch(addTodo(json));
    setTimeout(() =>{
      dispatch(fetchTodos())
    })
    closeNote(false);
    }
    
  }


  return (
    <>
      
        <div className={cn(styles.flex, {
          [styles.firstInp]: true
        })}>
          <TextField
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          inputProps={{ maxLength: 25 }}
          helperText={name.length === 25 ? 'Максимум 25 символов' : ' '}
          className={styles.nameInp}
          id="standard-basic"
          label="Введите название задач"
          variant="standard"
        />
        </div>
   
        <div>
          
        </div>
  
      <div className={styles.flex}>
          <TextField
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={styles.nameInp}
          id="standard-basic"
          label="Опишите задачу"
          variant="standard"
          inputProps={{ maxLength: 50 }}
          helperText={title.length === 50 ? 'Максимум 50 символов' : ' '}
          onKeyDown={e =>{
            if(e.code === 'Enter' && title.length > 0){
              setTodos([...todos, {title, completed:false}])
              setTitle('')
            }
          }}
        />
        </div>
      
       
     
      <div className={styles.todos}>
        {todos.map((todo, index) => (
          <div key={index} className={styles.todo}>
              <div className={styles.todoText}>
                {`${index + 1}.${todo.title}`}
                <div></div>
              </div>
              <MiniButton onClick={() =>{
                deleteTodo(index)
              }}><NotInterestedIcon fontSize="small" /></MiniButton>
          </div>
        ))}
      </div>
      <ColorPick setColor={setColor} color={color} />
      <ModalBtns addNew={addNewNote}  closeNote={closeNote} />
    </>
  );
}

export default ModalTodo;
