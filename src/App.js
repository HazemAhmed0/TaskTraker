import "./styles/main.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState([
    {
      id: 0,
      text: "Task Number 1",
      desc: "Lorem Impsum",
      status: "Ready",
      user: "",
    },
    {
      id: 1,
      text: "Task Number 2",
      desc: "Lorem Impsum",
      status: "Ready",
      user: "",
    },
    {
      id: 2,
      text: "Task Number 3",
      desc: "Lorem Impsum",
      status: "Done",
      user: "",
    },
  ]);
  let id = taskList.length;

  const [user, setUser] = useState("");
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id != id));
  };
  const addTask = (task) => {
    const newTask = { id, ...task, user };
    console.log(newTask);
    //setTaskList(...taskList, newTask);
    id++;
  };

  return (
    <div className="container">
      <Header title="Example" />
      <TaskForm onAdd={addTask} />
      <Tasks tasks={taskList} onDelete={deleteTask} />
    </div>
  );
}

export default App;
