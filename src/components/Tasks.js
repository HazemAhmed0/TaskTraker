import Task from "./Task";
import { Link } from "react-router-dom";

const Tasks = ({ tasks, onDelete }) => {
  return (
    <div className="container">
                  <Link to="../newtask">ADD NEW TASK</Link>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Tasks;
