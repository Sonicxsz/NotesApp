import React from 'react'
import styles from './TodoItem.module.scss'
import DoneIcon from '@mui/icons-material/Done';
import { useAppDispatch } from '../../hooks';
import cn from 'classnames'
import { completeTodo } from '../../store/slice/todoSlice';
interface TodoProps{
    text: string,
    completed?: boolean
    _id: string,
}






function Todo({text, completed, _id}: TodoProps) {
    const dispatch = useAppDispatch();

    const completedTodo = async() => {
        const b = await JSON.stringify({ completed: !completed });
        dispatch(completeTodo({_id, b}))
    }

  return (
    <div className={styles.todoWrapper}>
        <div 
        onClick={completedTodo}
        className={cn(styles.todoComplete, {
            [styles.todoCompleteDone]:completed
        })}>
            {true ? <DoneIcon fontSize='small'/> : null}
        </div>
        <div className={cn(styles.todoText, {
            [styles.completeText]: completed
        })}>{text}</div>
        
    </div>
  )
}

export default Todo