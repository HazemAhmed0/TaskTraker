import Task from "./Task";
import { Link } from "react-router-dom";
import {
  collection,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Tasks = ({ tasks }) => {
  const onDelete = async (id) => {
    console.log("Deleting");
    await deleteDoc(doc(getFirestore(), "tasks", id));
  };
  const onComplete = async (id) => {
    const docRef = doc(getFirestore(), "tasks", id);
    const payload = {
      status: "Done",
    };
    await updateDoc(docRef, payload);
  };
  const onProgress = async (id) => {
    const docRef = doc(getFirestore(), "tasks", id);
    const payload = {
      status: "InProgress",
    };
    await updateDoc(docRef, payload);
  };

  return (
    <div className="container">
      <Link to="../newtask">ADD NEW TASK</Link>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onDone={onComplete}
          onProgress={onProgress}
        />
      ))}
    </div>
  );
};

export default Tasks;
