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
    <div>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/* ---PAGE TITLE--- */}
        <title>To-Do List</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous"/>
    </div>
    <div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
    </div>
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
