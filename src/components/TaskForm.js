import '../styles/main.css';

const TaskForm = () => {
  return (
    <form className="NewTask">
        <label htmlFor="title">Task</label>
        <input type="text" name="title"/>
        <label htmlFor="desc">Description</label>
        <input type="text" name="desc"/>
        <label htmlFor="status">Status</label>
        <select name="status" >
            <option value="Ready">Ready</option>
            <option value="Done">Done</option>
            <option value="InProgress">In Progress</option>
        </select>
    </form>
  )
}

export default TaskForm