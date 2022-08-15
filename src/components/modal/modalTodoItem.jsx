import React from "react";

function TodoItem({ title, content }) {
  return (
    <div className="item">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export default TodoItem;
