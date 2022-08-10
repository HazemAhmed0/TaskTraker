import Task from "./Task"

const TaskList = [
    {
        id:0,
        text: "Task Number 1",
        status: "inProgress",
        user: ""
    },{
        id:1,
        text: "Task Number 2",
        status: "Cancelled",
        user: ""
    },{
        id:2,
        text: "Task Number 3",
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