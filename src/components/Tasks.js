import Task from "./Task";
import { Link } from "react-router-dom";
import {
  updateDoc,
  doc,
  deleteDoc,
  collection,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const baseURL =
  "https://task-tracker-865c6.firebaseio.com/users/jack/name.json'";

const Tasks = ({currUser}) => {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    onSnapshot(collection(getFirestore(), "tasks"), (snapshot) => {
      let currSnap = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTaskList(currSnap);
    });
  }, []);

  const onDelete = async (id) => {
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

  // const customResetPassword = async (email) => {
  //   await axios
  //     .post(baseURL, {
  //       requestType: "PASSWORD_RESET",
  //       email: email,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // };

  return (
    <div className="container">
      <button className="NewButton">
        <Link to="../newtask">ADD NEW TASK</Link>
      </button>
      <div id="delete-zone">Drag tasks here to delete</div>

      {taskList
        .filter((task) => task.user == currUser.email)
        .map((task) => (
          <div
            className="DraggableElement"
            id={task.id}
            draggable={true}
            key={task.id}
          >
            <Task
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
