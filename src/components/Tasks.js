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
import { useAuth } from "./Auth";

const Tasks = ({ tasks }) => {
  const { currUser } = useAuth();
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
  // const onEdit = async (task) => {
  //   const docRef = doc(getFirestore(), "tasks", task.id);
  //   console.log("got here");
  //   let newText = prompt("Please enter new title", task.text);
  //   let newDesc = prompt("Please enter new title", task.text);
  //   let newStatus = prompt("Please enter new title", task.text);

  //   const payload = {
  //     desc: newDesc,
  //     text: newText,
  //     status: newStatus,
  //   };
  //   await updateDoc(docRef, payload);
  // };

  return (
    <div className="container">
      <Link to="../newtask">ADD NEW TASK</Link>
      {tasks
        .filter((task) => task.user == currUser.email)
        .map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDone={onComplete}
            onProgress={onProgress}
            // onEdit={onEdit}
          />
        ))}
    </div>
  );
};

export default Tasks;
