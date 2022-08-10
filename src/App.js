import './styles/main.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import NewTask from './components/NewTask';

function App() {
  return (
    <div className="container">
      <Header title="Example"/>
      <NewTask />
      <Tasks />
    </div>
  );
}

export default App;
