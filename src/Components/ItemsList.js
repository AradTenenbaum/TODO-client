import React from "react";

import * as api from "../api";
import { DONE, UNDONE } from "../constants/taskStatus";

function ItemsList({ items, setTasks }) {
  const isEmptyObj = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("jwtToken");
    await api.deleteTask(id, token);
  };

  const changeItem = async (id) => {
    const token = localStorage.getItem("jwtToken");
    await api.changeTask(id, token);
  };

  return (
    <div className="container my-list">
      <div className="todo-list">
        {items ? (
          items.map((item) =>
            !isEmptyObj(item) ? (
              <div className="todo-item" key={item.task_id}>
                <div className="checker">
                  <span>
                    <input
                      className="check"
                      checked={item.status === DONE ? true : false}
                      type="checkbox"
                      onChange={async () => {
                        await changeItem(item.task_id);
                        let tempTasks = items;
                        tempTasks.map((task) => {
                          if (task.task_id === item.task_id) {
                            if (task.status === DONE) task.status = UNDONE;
                            else task.status = DONE;
                          }
                        });
                        setTasks([...tempTasks]);
                      }}
                    />
                  </span>
                </div>
                <span
                  className="my-item-text"
                  style={
                    item.status === DONE
                      ? { textDecoration: "line-through" }
                      : { "": "" }
                  }
                >
                  {item.text}
                </span>
                <button className="delete-in-item" onClick={async () => {
                    await deleteItem(item.task_id);
                    let tempTasks = items;
                    let i;
                    for(i = 0; i < tempTasks.length; i++) {
                        if (tempTasks[i].task_id === item.task_id) {
                            break;
                        }
                    }
                    console.log(tempTasks);
                    console.log(i);
                        tempTasks.splice(i, 1);
                    setTasks([...tempTasks]);
                }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill delete-but"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </button>
              </div>
            ) : (
              <div />
            )
          )
        ) : (
          <div>No tasks</div>
        )}
      </div>
    </div>
  );
}

export default ItemsList;
