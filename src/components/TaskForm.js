import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { Formik, Field, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./Auth";

const TaskForm = () => {
  const { currUser } = useAuth();
  const navigate = useNavigate();
  const [currTask, setCurrTask] = useState("");
  const params = useParams();
  const taskId = params.taskId;
  let intValues;

  const onSubmit = async (values) => {
    if (taskId) {
      onEdit({ text: values.text, desc: values.desc, status: values.status });
    } else {
      onAdd({ text: values.text, desc: values.desc, status: values.status });
    }
    navigate("/");
  };

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
    await addDoc(collRef, payload);
  };

  const getData = async () => {
    const docRef = doc(getFirestore(), "tasks", taskId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  };

  useEffect(() => {
    if (taskId) {
      getData().then((data) => {
        setCurrTask(data);
        intValues = data;
      });
    }
    console.log(intValues);
    console.log(currTask);
  }, []);

  return (
    <div className="form-container">
      <Formik initialValues={intValues} onSubmit={(values) => onSubmit(values)}>
        <Form>
          {taskId ? <>Edit Task</> : <>Add New Task</>}
          <Field type="text" name="text" required />
          <Field type="text" name="desc" required />
          <Field name="status" as="select">
            <option value="Ready">Ready</option>
            <option value="Done">Done</option>
            <option value="InProgress">In Progress</option>
          </Field>

          <button className="w-100" type="submit">
            {taskId ? "Update Task" : "Add Task"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskForm;
