import './styles/main.css';
import Header from './components/Header';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="container">
      <Header title="Example"/>
      <Tasks />
    </div>
  );
}

export default App;
