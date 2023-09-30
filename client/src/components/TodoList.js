import React from "react";
import { MdDeleteForever } from "react-icons/md";

const TodoList = (props) => {
  return (
    <div className="liList">
      <li>{props.text}</li>
      <MdDeleteForever
        onClick={() => {
          props.onSelect(props.id);
        }}
        className="deleteList"
      />
    </div>
  );
};

export default TodoList;
