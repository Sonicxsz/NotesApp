import React, { useState } from 'react';
import ModalBtns from './modalBtns';

function ModalTodo() {

    const [todos, setTodos] = useState({
      name : "",
      text : [{}]
    });

    const handleAdd = (e) => {
      setTodos({
        ...todos, name: e.target.value
      })
    };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
    <input type="text" value={todos.name} onChange={(e) => handleAdd(e)} placeholder='введите название...'></input>
    <input />
    <ModalBtns />
    </form>
    )
}

export default ModalTodo;
