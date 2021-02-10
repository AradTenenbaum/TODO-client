import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../Hooks/useForm";
import * as api from "../api";
import ItemsList from "./ItemsList";
import { UNDONE } from "../constants/taskStatus";

function TasksPage() {
  const context = useContext(AuthContext);
  const history = useHistory();
  //   Prevent a user from going to the screen if he is not logged in
  useEffect(() => {
    if (!context.user) history.push("/login");
  }, []);

  //   tasks from server
  const [tasks, setTasks] = useState([]);

  const { onChange, Clear, values } = useForm(() => {}, {
    taskText: "",
  });

//   Compare for sort by done and undone
function compare( a, b ) {
    if ( a.status > b.status ){
      return -1;
    }
    if ( a.status < b.status ){
      return 1;
    }
    return 0;
  }
  

  //   Api fetch
  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    if (context.user) {
      let tempTasks = await api.fetchTasks(token);
      tempTasks.data.sort(compare);
      setTasks(tempTasks.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //   Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (values.taskText.length > 0) {
      const token = localStorage.getItem("jwtToken");
      const addedTaskId = await api.addTask(
        context.user.username,
        values.taskText,
        token
      );
      console.log(addedTaskId.data);
      let tempTasks = tasks;
      tempTasks.push({
        task_id: addedTaskId.data.task_id,
        username: context.user.username,
        text: values.taskText,
        status: UNDONE,
      });
      tempTasks.sort(compare);
      setTasks([...tempTasks]);
      Clear();
    }
  };

  return (
    <div>
      <h1>
        <span className="styling">TODO</span>List
      </h1>
      <form onSubmit={addTask}>
        <div className="input-div">
          <input
            className="input"
            type="text"
            name="taskText"
            value={values.taskText}
            onChange={onChange}
            placeholder="What Do Yo Want To Do..."
          />

          <button className="add-button">
            <span>&#43;</span>
            <i />
          </button>
        </div>
      </form>
      {tasks ? <ItemsList items={tasks} setTasks={setTasks} /> : <div></div>}
    </div>
  );
}

export default TasksPage;
