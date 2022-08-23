import { changeFavoriteTodo, deleteTodo, deleteTodoLocal } from "../../store/slice/todoSlice";
import cn from "classnames";
import styles from "./TodoItem.module.scss";
import { useAppDispatch } from "../../hooks";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { motion, AnimatePresence } from "framer-motion";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { timeReamning } from "../../utils/timer";

import RedoIcon from "@mui/icons-material/Redo";
import { changeFavorite } from "../../store/slice/todoSlice";
import { Link } from "react-router-dom";
import Todo from "./Todo";
import {todo} from '../../store/slice/todoSlice'
interface TodoItemProps{
  name: string,
  time: string,
  color: string,
  important: boolean,
  todosAr: todo[],
  _id?: string,
}


function TodoItem({name, time, color, important, todosAr, _id}:TodoItemProps) {

  const colorIcon = +important ? "warning" : "inherit";



  const dispatch = useAppDispatch()
  
  const changeImpHandler = async () => {
       const b = await JSON.stringify({ important: !important });
        dispatch(changeFavoriteTodo({ b, _id }));
        dispatch(changeFavorite(_id))
  }

  const deleteTodoHandler = async () => {
     dispatch(deleteTodo( _id! ));
     dispatch(deleteTodoLocal(_id))
}


  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "330px", opacity: 1 }}
        style={{backgroundColor: color}}
        className={cn(styles.note)}
        
      >
        <div className={styles.note__first}>
       {true ? <>
        <div 
          onClick={changeImpHandler}
          className={styles.imp}> 
            <BookmarkOutlinedIcon
            fontSize="medium"
            color={colorIcon}
          ></BookmarkOutlinedIcon>
          </div>
          <div
            onClick={deleteTodoHandler}
          className={styles.imp}>
            <ClearIcon
              fontSize="medium"
             
            ></ClearIcon>
          </div>
          </> : <>
            <div className={styles.imp}>
            <DeleteOutlineIcon
            
          ></DeleteOutlineIcon>
            </div>
          <div className={styles.imp}>
            <RedoIcon
              fontSize="medium"
             
            ></RedoIcon>
          </div>
          </>}
          </div>
          <span className={styles.name}>{name}</span>

        <div className={styles.text}>
          {todosAr.map(i =>{
            return <Todo key={i._id} _id={_id!} text={i.title} completed={i.completed}  />
          })}
        </div>
        <div className={styles.line}>

        </div>
        <div className={styles.flex}>
          <div className={styles.time}>
            {
              false ? <><span style={{color:"yellow"}}>Будет удален</span>:{'скоро'}</> :  `Дата: ${time}`
            }
           
          </div>

          <Link style={{ color: "inherit" }} to={`noteid:$id`}>
            {true && <div
              className={styles.imp}
             
            >
              <OpenInFullIcon fontSize="small" />
            </div>}
          </Link>
        </div>
    
      </motion.div>
    </AnimatePresence>
  );
}

export default TodoItem;
