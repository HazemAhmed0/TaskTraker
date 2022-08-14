import "../styles/main.css";
import { useState } from "react";

const TaskForm = () => {
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Ready");

  const onAdd = () => {
    console.log("attempting to add");
  };

  const onSub = (e) => {
    e.preventDefault();
    onAdd({ text, desc, status });
    setText("");
    setDesc("");
    setStatus("Ready");
    // this.props.history.push('/foo')
  };

  return (
    <form className="NewTask" onSubmit={onSub}>
      <label htmlFor="title">Task</label>
      <input
        type="text"
        name="title"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label htmlFor="desc">Description</label>
      <input
        type="text"
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Ready">Ready</option>
        <option value="Done">Done</option>
        <option value="InProgress">In Progress</option>
      </select>
      <input type="submit" value="Add Task" />
    </form>
  );
};

export default TaskForm;
