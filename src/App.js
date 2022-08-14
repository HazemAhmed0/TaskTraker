import "./styles/main.css";
import Header from "./components/Header";
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
  });

  const [taskList, setTaskList] = useState([]);

  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route
          exact
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks tasks={taskList} />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route
          exact
          path="/newtask"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          exact
          path="/user"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        ></Route>
        <Route exact path="/signup" element={<SignUp />}></Route>
        <Route
          exact
          path="/forgot-password"
          element={<ForgotPassword />}
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
