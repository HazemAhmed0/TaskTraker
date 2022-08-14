import "./styles/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import SignUp from "./components/SignUp";
import UserDetails from "./components/UserDetails";
import { useState } from "react";
import { AuthProvider } from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [taskList, setTaskList] = useState([
    {
      id: 0,
      text: "Task Number 1",
      desc: "Lorem Impsum",
      status: "InProgress",
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

  const [userID, setuserID] = useState("");
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id != id));
  };
  const addTask = (task) => {
    const newTask = { id, ...task, userID };
    console.log(newTask);
    setTaskList([...taskList, newTask]);
    id++;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route
          exact
          path="/tasks"
          element={<Tasks tasks={taskList} onDelete={deleteTask} />}
        ></Route>
        <Route exact path="/profile" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/newtask"
          element={<TaskForm onAdd={addTask} />}
        ></Route>
        <Route exact path="/user" element={<UserDetails />}></Route>

        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword />}
        ></Route>
        <Route exact path="/userdetails" element={<UserDetails />}></Route>
      </Routes>
      {/* <Header title="Example" />
      <TaskForm onAdd={addTask} />
      <Tasks tasks={taskList} onDelete={deleteTask} /> 
        <SignUp /> */}
    </AuthProvider>
  );
}

export default App;
