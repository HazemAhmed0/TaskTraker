import "./styles/main.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import SignUp from "./components/SignUp";
import UserDetails from "./components/UserDetails";
import { useAuth } from "./components/Auth";
import { useEffect, useState } from "react";
import storage from "./firebase";
import { AuthProvider } from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import { db } from "./firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

function App() {
  useEffect(() => {
    onSnapshot(collection(getFirestore(), "tasks"), (snapshot) => {
      let currSnap = snapshot.docs.map((doc) => doc.data());
      // console.log(currSnap);
      setTaskList(currSnap);
    });
  });

  const [taskList, setTaskList] = useState([]);

  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/tasks" element={<Tasks tasks={taskList} />}></Route>
        <Route exact path="/profile" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/newtask" element={<TaskForm />}></Route>
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
