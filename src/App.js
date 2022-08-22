import "./styles/App.scss";
import Login from "./components/Login";
import Tasks from "./components/Tasks";
import TaskForm from "./components/TaskForm";
import SignUp from "./components/SignUp";
import UserDetails from "./components/UserDetails";
import { useEffect, useState } from "react";
import { AuthProvider } from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

function App() {
  useEffect(() => {
    onSnapshot(collection(getFirestore(), "tasks"), (snapshot) => {
      let currSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTaskList(currSnap);
    });
  }, []);
  
  const [currUser, setCurrUser] = useState("");
  const [taskList, setTaskList] = useState([]);

  return (
    <AuthProvider>
      <NavBar currUser={currUser}/>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute currUser={currUser}>
              <Tasks tasks={taskList} currUser={currUser}/>
            </ProtectedRoute>
          }
        ></Route>


        <Route exact path="/login" element={<Login  currUser={currUser} setCurrUser={setCurrUser}/>}></Route>

        <Route
          exact
          path="/newtask"
          element={
            <ProtectedRoute currUser={currUser}>
              <TaskForm currUser={currUser}/>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          exact
          path="/edit-task/:taskId"
          element={
            <ProtectedRoute currUser={currUser}>
              <TaskForm currUser={currUser}/>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          exact
          path="/user"
          element={
            <ProtectedRoute currUser={currUser}>
              <UserDetails currUser={currUser}/>
            </ProtectedRoute>
          }
        ></Route>

        <Route exact path="/signup" element={<SignUp currUser={currUser} setCurrUser={setCurrUser}/>}></Route>

        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword currUser={currUser}/>}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
