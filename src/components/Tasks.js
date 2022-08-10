import Task from "./Task"

const TaskList = [
    {
        id:0,
        text: "Task Number 1",
        desc: "Lorem Impsum",
        status: "Ready",
        user: ""
    },{
        id:1,
        text: "Task Number 2",
        desc: "Lorem Impsum",
        status: "Ready",
        user: ""
    },{
        id:2,
        text: "Task Number 3",
        desc: "Lorem Impsum",
        status: "Done",
        user: ""
    }
]


const Tasks = () => {
  return (
    <>
    {TaskList.map((task) =>(
        <Task key={task.id} task={task}/>
    ))}
    </>
  )
}

export default Tasks