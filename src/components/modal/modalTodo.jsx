import { useState } from "react";
import ModalBtns from "./modalBtns";
import style from "./modalTodo.css";
import TodoItem from "./modalTodoItem";

function ModalTodo() {
  const [list, setList] = useState({
    title: "",
    content: "",
  });

  const [notes, setNotes] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setList((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  function addNote(newNote) {
    setNotes((preValue) => {
      return [...preValue, newNote];
    });
  }

  // function createNewInput()

  function addBtn(e) {
    e.preventDefault();
    addNote(list);
  }

  return (
    <div>
      <form>
        <input
          value={list.title}
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <p>
          <textarea
            value={list.content}
            name="content"
            placeholder="Введите текст..."
            onChange={handleChange}
          ></textarea>
        </p>
        <button onClick={(e) => addBtn(e)}>add</button>
      </form>
      {notes.map((item, index) => {
        return (
          <TodoItem key={index} title={item.title} content={item.content} />
        );
      })}
    </div>
  );
}

export default ModalTodo;
