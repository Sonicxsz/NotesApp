import { useEffect, useState, useRef } from "react";
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { TextField } from "@mui/material";
import { MiniButton } from "../buttons/Button";
import ModalBtns from "./modalBtns";
import styles from './modal.module.scss'
import ColorPick from "../colorPick/ColorPick";




function ModalTodo({closeNote}) {

  const [name, setName] = useState("");
  const [textTodo, setTextTodo] = useState("");
  const [todos, setTodos] = useState([])
  const [names, setNames] = useState([])
  const [color, setColor] = useState("#2E958C")

  const deleteTodo = (i) => {
    const filtered = todos.filter((todo, index) => index !== i)
    setTodos(filtered)
  }


  return (
    <>
      
        <div className={styles.flex}>
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
          {names.map((item) => (
            <div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
  
      <div className={styles.flex}>
          <TextField
          value={textTodo}
          onChange={(e) => {
            setTextTodo(e.target.value);
          }}
          className={styles.nameInp}
          id="standard-basic"
          label="Опишите задачу"
          variant="standard"
          inputProps={{ maxLength: 50 }}
          helperText={textTodo.length === 50 ? 'Максимум 50 символов' : ' '}
          erorText="Please enter only 12 digits number"
          onKeyDown={e =>{
            if(e.code === 'Enter'){
              setTodos([...todos, {textTodo, completed:false}])
              setTextTodo('')
            }
          }}
        />
        </div>
      
       
     
      <div className={styles.todos}>
        {todos.map((todo, index) => (
          <div key={index} className={styles.todo}>
              <div className={styles.todoText}>
                {`${index + 1} -`} {todo.textTodo}
                <div></div>
              </div>
              <MiniButton onClick={() =>{
                deleteTodo(index)
              }}><NotInterestedIcon fontSize="small" /></MiniButton>
          </div>
        ))}
      </div>
      <ColorPick setColor={setColor} color={color} />
      <ModalBtns closeNote={closeNote} />
    </>
  );
}

export default ModalTodo;
