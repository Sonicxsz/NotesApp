import { useEffect, useState } from "react";
import ModalBtns from "./modalBtns";
import "./modalTodo.css";
import { timeCreater } from "../../utils/time";
import { addNotes, changeFavorite } from "../../store/slice/notesSlice";
import { useDispatch } from "react-redux";

export const noteSelecColors = [
  { id: 0, name: "#2E958C" },
  { id: 1, name: "#589d62" },
  { id: 2, name: "#945D87" },
  { id: 3, name: "#EF7663" },
  {id:4, name: '#a8296b'},
  {id:5, name: '#303d55'},  
]

function ModalTodo() {

  const dispatch = useDispatch()
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [colorBtns, setColorBtns] = useState(noteSelecColors);
  const [color, setColor] = useState("#2E958C");
  const closeNote = (bool) => null;

  function addNewNote() {
    
    let date = timeCreater(2);
    let newNote = {
      important: false,
      name: name,
      title,
      time: date,
      color,
    };
    const json = JSON.stringify(newNote);
    dispatch(addNotes(json));
    closeNote(false);
  }

  

  const [text, setText] = useState("");
  const [textName, setTextName] = useState("");
  const [todos, setTodos] = useState([])
  const [names, setNames] = useState([])


  const handleSubmit = (e) => {
    e.preventDefault();
  };
 //

  const addZag = () => {
    setNames([{
      name: textName
    }])
    setTextName('')
  }

  const deleteTodo = (i) => {
    const filtered = todos.filter((todo, index) => index !== i)
    setTodos(filtered)
  }

  const makeFavorite = (i) => {
    const newTodos = todos.map((item, index) => {
      if (i === index) {
        return {
          ...item,
          favorite: !item.favorite
        }
      }
      return item
    });
    setTodos(newTodos)
  }

  const addTodo = () => {
    setTodos([
      {
        text: text,
        favorite: false
      },
      ...todos
    ])
    setText('')
  }

  


  return (
    <div className="app">
      <h4>Заголовок</h4>
      {!names.length ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setTextName(e.target.value)}
            value={textName}
            placeholder="..."
          />
          <button className="button" disabled={!textName} onClick={addZag}>
            Добавить
          </button>
        </form>
      ) : (
        <div>
          {names.map((item) => (
            <div>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      )}
      <h4>Задача</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="..."
        />
        <button className="button" disabled={!text} onClick={addTodo}>
          Добавить
        </button>
      </form>
      <div className="todos">
        {todos.map((todo, index) => (
          <div className="todo">
            <div className={`todo ${todo.favorite ? 'selected' : ''}`}>
              <div className="favorite">
                <button onClick={() => makeFavorite(index)}>+</button>
              </div>
              <div className="todoText">
                {todo.text}
              </div>
              <div className="actions">
                <button onClick={() => deleteTodo(index)}>X</button>
              </div>
            </div>
          </div>
        ))}
        <ModalBtns addNewNote={addNewNote} closeNote={closeNote} />
      </div>
    </div>
  );
}

export default ModalTodo;
