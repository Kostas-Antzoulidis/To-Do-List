// ---TO-DO LIST REACT FUNCTION WEB APP by Konstantinos Antzoulidis---

// ---PAGE CSS---
import './App.css';
// ---TASK MANAGING COMPONENT---
import TaskComponent from './components/TaskComponent.js';
// ---ICONS---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      {/* ---TITLE--- */}
      <div className="h1 fw-light text-decoration-bold mt-3">To-Do List &nbsp;<FontAwesomeIcon icon={faList} /></div>
      <hr/>
      {/* ---TASK TO-DO LIST COMPONENT--- */}
      <TaskComponent/> 
      <br/><br/><br/>
      {/* ---FOOTER--- */}
      <div className="h5 fw-light text-decoration-bold footer">by Konstantinos Antzoulidis</div>
    </div>
  );
}

export default App;
