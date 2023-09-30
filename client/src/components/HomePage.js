import React, { useState } from "react";
import "./components.css";
import { FaTimes } from "react-icons/fa";
import TodoList from "./TodoList";
import { toast } from "react-toastify";

const HomePage = () => {
  const [list, setList] = useState("");
  const [inputList, setInputList] = useState([]);

  const clearInput = () => {
    return setList("");
  };

  const addList = () => {
    if (list !== "") {
      setInputList((oldList) => {
        return [...oldList, list];
      });
      setList("");
    } else {
      toast.error("Please, Add Items");
    }
  };

  const deleteList = (id) => {
    setInputList((oldList) => {
      return oldList.filter((arrItem, index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          value={list}
          placeholder="Add items"
          onChange={(e) => setList(e.target.value)}
          autoFocus
          maxLength={30}
        />
        <span>{<FaTimes onClick={clearInput} />}</span>
        <button onClick={addList}>Add</button>
      </div>

      <ol>
        {inputList.map((list, index) => {
          return (
            <TodoList
              text={list}
              key={index}
              id={index}
              onSelect={deleteList}
            />
          );
        })}
      </ol>
    </>
  );
};

export default HomePage;
