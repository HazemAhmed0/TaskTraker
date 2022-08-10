import './styles/main.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <div className="container">
      <Header title="Example"/>
      <TaskForm />
      <Tasks />
    </div>
  );
}

export default App;
