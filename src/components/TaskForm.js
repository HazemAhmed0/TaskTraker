import "../styles/main.css";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Auth";

const TaskForm = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const [currTask, setCurrTask] = useState("");
  const params = useParams();
  const taskId = params.taskId;
  const [formState, setFormState] = useState("");

  const formik = useFormik({
    initialValues: {
      desc: currTask.desc,
      status: currTask.status,
      text: currTask.text,
    },
    onSubmit: async (values) => {
      console.log(values.text);
      if (formState == "edit") {
        onEdit({ text: values.text, desc: values.desc, status: values.status });
      } else {
        onAdd({ text: values.text, desc: values.desc, status: values.status });
      }
      navigate("/");
    },
  });

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
    <form className="NewTask" onSubmit={formik.handleSubmit}>
      <label htmlFor="title">
        {formState == "edit" ? <>Edit Task</> : <>Add New Task</>}
      </label>
      <input
        type="text"
        name="text"
        onChange={formik.handleChange}
        value={formik.values.text}
        required
      />
      <label htmlFor="desc">Description</label>
      <input
        type="text"
        name="desc"
        onChange={formik.handleChange}
        value={formik.values.desc}
        required
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        onChange={formik.handleChange}
        value={formik.values.status}
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
