import "../styles/main.css";
import { useSwipeable } from "react-swipeable";
import { Link, useNavigate, useParams } from "react-router-dom";

const Task = ({ task, onDelete, onDone, onProgress }) => {
  var classes = task.status + " task";
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onDelete(task.id);
    },
  });
  return (
    <div {...handlers}>
      <div className={classes}>
        <h3>{task.text}</h3>
        <p>{task.desc}</p>
        <a title="In Progress" onClick={() => onProgress(task.id)}>
          &#9994;
        </a>
        <Link to={`/edit-task/${task.id}`}>&#128221;</Link>
        <a title="Remove Task" onClick={() => onDelete(task.id)}>
          &#10062;
        </a>
        <a title="Complete Task" onClick={() => onDone(task.id)}>
          &#9989;
        </a>
      </div>
    </div>
  );
};

export default Task;
