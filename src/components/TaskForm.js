import "../styles/main.css";
import { useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";

const TaskForm = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Ready");

  const onAdd = async (newTask) => {
    const collRef = collection(getFirestore(), "tasks");
    const payload = {
      desc: newTask.desc,
      status: newTask.status,
      text: newTask.text,
      user: currUser.email,
    };
    console.log("attempting to add", payload);
    await addDoc(collRef, payload);
  };

  const onSub = (e) => {
    e.preventDefault();
    onAdd({ text, desc, status });
    setText("");
    setDesc("");
    setStatus("Ready");
    navigate("/tasks");
  };

  return (
    <form className="NewTask" onSubmit={onSub}>
      <label htmlFor="title">Task</label>
      <input
        type="text"
        name="title"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label htmlFor="desc">Description</label>
      <input
        type="text"
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Ready">Ready</option>
        <option value="Done">Done</option>
        <option value="InProgress">In Progress</option>
      </select>
      <input type="submit" value="Add Task" />
    </form>
  );
};

export default TaskForm;
