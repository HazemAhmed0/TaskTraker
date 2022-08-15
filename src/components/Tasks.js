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
  const DraggableElement = document.querySelectorAll(".DraggableElement");
  DraggableElement.forEach((task) => {
    task.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", task.id);
    });
  });
  for (const drop of document.querySelectorAll("#delete-zone")) {
    drop.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    drop.addEventListener("drop", (e) => {
      e.preventDefault();
      const deletedTaskId = e.dataTransfer.getData("text/plain");
      onDelete(deletedTaskId);
    });
  }

  return (
    <div className="container">
      <button className="NewButton">
        <Link to="../newtask">ADD NEW TASK</Link>
      </button>
      <div id="delete-zone">Drag tasks here to delete</div>

      {tasks
        .filter((task) => task.user == currUser.email)
        .map((task) => (
          <div className="DraggableElement" id={task.id} draggable={true}>
            <Task
              key={task.id}
              task={task}
              onDelete={onDelete}
              onDone={onComplete}
              onProgress={onProgress}
            />
          </div>
        ))}
    </div>
  );
};

export default Tasks;
