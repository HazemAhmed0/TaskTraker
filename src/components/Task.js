import "../styles/main.css";
import { Link, useNavigate } from "react-router-dom";

const task = ({ task, onDelete, onDone, onProgress }) => {
  var classes = task.status + " task";
  return (
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
