import '../styles/main.css';
const task = ({task}) => {
  return (
    <div className="task">
        <h3>{task.text}</h3>
        <p>{task.desc}</p>
        <a title='In Progress'>&#9994;</a>
        <a title='Edit Task'>&#128221;</a>
        <a title='Remove Task'>&#10062;</a>
        <a title='Complete Task'>&#9989;</a>
        
    </div>
  )
}

export default task