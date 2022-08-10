import '../styles/main.css';

const NewTask = () => {
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
        </select>
    </form>
  )
}

export default NewTask