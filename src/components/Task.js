import "../styles/main.css";
const task = ({ task, onDelete, onDone, onProgress }) => {
  var classes = task.status + " task";
  return (
    // const onAdd = async (newTask) => {
    //   const docRef = doc(getFirestore(), "tasks", "tempID");
    //   const payload = {
    //     desc: newTask.desc,
    //     status: newTask.status,
    //     text: newTask.text,
    //     user: "",
    //   };
    //   console.log("attempting to add", payload);
    //   await setDoc(docRef, payload);
    // };

    <div className={classes}>
      <h3>{task.text}</h3>
      <p>{task.desc}</p>
      <a title="In Progress" onClick={() => onProgress(task.id)}>
        &#9994;
      </a>
      <a title="Edit Task">&#128221;</a>
      <a title="Remove Task" onClick={() => onDelete(task.id)}>
        &#10062;
      </a>
      <a title="Complete Task" onClick={() => onDone(task.id)}>
        &#9989;
      </a>
    </div>
  );
};

export default task;
