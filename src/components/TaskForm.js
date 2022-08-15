import "../styles/main.css";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  getDoc,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Auth";

const TaskForm = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [currTask, setCurrTask] = useState("");
  const params = useParams();
  const taskId = params.taskId;
  const [formState, setFormState] = useState("");

  const onEdit = async (newTask) => {
    const docRef = doc(getFirestore(), "tasks", taskId);
    const payload = {
      desc: newTask.desc,
      text: newTask.text,
      status: newTask.status,
    };
    await updateDoc(docRef, payload);
  };

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
    if (formState == "edit") {
      onEdit({ text, desc, status });
    } else {
      onAdd({ text, desc, status });
    }
    setText("");
    setDesc("");
    setStatus("Ready");
    navigate("/");
  };

  const getData = async () => {
    const docRef = doc(getFirestore(), "tasks", taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
  };

  useEffect(() => {
    console.log(formState);

    if (taskId) {
      setCurrTask(getData());
    }
  }, []);

  return (
    <form className="NewTask" onSubmit={onSub}>
      <label htmlFor="title">
        {formState == "edit" ? <>Edit Task</> : <>Add New Task</>}
      </label>
      <input
        type="text"
        name="title"
        value={currTask.text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label htmlFor="desc">Description</label>
      <input
        type="text"
        name="desc"
        value={currTask.desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        value={currTask.status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Ready">Ready</option>
        <option value="Done">Done</option>
        <option value="InProgress">In Progress</option>
      </select>
      <input
        type="submit"
        value={formState === "edit" ? "Update Task" : "Add Task"}
      />
    </form>
  );
};

export default TaskForm;
