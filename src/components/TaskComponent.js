// ---TO-DO LIST REACT FUNCTION COMPONENT by Konstantinos Antzoulidis---

// ---PAGE CSS---
import "./TaskComponent.css";
// ---BASIC REACT---
import React from 'react';
import { useState, useEffect} from 'react';
// ---TO HELP WITH MOBILE RESPONSIVENESS---
import { useMediaQuery } from 'react-responsive';
// ---ICONS---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCalendarPlus } from '@fortawesome/free-regular-svg-icons';
// ---ANIMATIONS---
import { motion, AnimatePresence } from 'framer-motion';



function TaskComponent(){
    //---VARIABLE TO SAVE THE TASKS ALONG WITH HOOK---
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
      });
    //---VARIABLE TO SAVE NEW TASK ALONG WITH HOOK---
    const [newTask, setNewTask] = useState('');
    //---VARIABLE TO SET MOBILE BREAKPOINT ALONG WITH HOOK---
    const isMobile = useMediaQuery({ maxWidth: 767 });


    //---useEFFECT HOOK TO LOAD TASKS FROM LOCAL STORAGE ON PAGE LOAD---
    useEffect(() => {
        try {
          const storedTasks = localStorage.getItem('tasks');
          if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
            // console.log('Tasks loaded successfully:', JSON.parse(storedTasks));
          } else {
            // console.log('No saved tasks found.');
          }
        } catch (error) {
          console.error('Error loading tasks from localStorage:', error);
        }
      }, []);


    //---useEFFECT HOOK TO SAVE CURRENT TASKS TO LOCAL STORAGE ON CHANGE---
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


    //---useEFFECT HOOK TO TRACK BUTTON-PRESSES (FOR *ENTER* BUTTON) ANYWHERE ON THE DOCUMENT---
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [newTask, tasks]);



    //---FUNCTION THAT HANDLES WHEN *ENTER* KEY IS PRESSED---
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addTask();
        }
    };

     //---FUNCTION THAT HANDLES ADDING NEW TASK TO LIST/*ADD* BUTTON ON-CLICK---
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks((prevTasks) => [
                ...prevTasks,
                { id: Date.now(), text: newTask, completed: false },
            ]);
            setNewTask('');
        }
    };

    //---FUNCTION THAT HANDLES TOGGLE BOX FIELD ON-CLICK---
    const toggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    //---FUNCTION THAT HANDLES DELETING TASK FROM LIST/*DELETE* BUTTON ON-CLICK---
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

     //---FUNCTION THAT HANDLES DELETING COMPLETE TASKS FROM LIST/*DELETE ALL COMPLETE* BUTTON ON-CLICK---
     const deleteComplete = (tasks) => {
        for (const task of tasks){
            if (task.completed)deleteTask(task.id);
        }
    };


    return (
    <div className="justify-content-center"> 
        {/* ---INPUT SECTION--- */}
        <motion.div initial={{opacity:0,scale:0, transition: { duration:0.2, ease: "easeInOut" }}} animate={{opacity:1,scale:1, transition: { duration:0.6, ease: "easeInOut" }}} exit={{opacity:0, transition: { duration:0.2, ease: "easeInOut" }}} className={`d-flex justify-content-center`}>
            <div className="add-task h1 fw-light row align-items-center">
                <div className="col-9 align-items-center">
                    {/* ---INPUT FIELD--- */}
                    <input className="form-control"
                    id="100000"
                    type="text"
                    placeholder="Create a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    />
                </div>
                <div className="col-1">
                    <motion.div initial={{opacity:0,y:-100,scale:0, transition: { duration:0.2, ease: "easeInOut" }}} animate={{opacity:1,y:0,scale:1, transition: { duration:0.5, ease: "easeInOut" }}} exit={{opacity:0, transition: { duration:0.2, ease: "easeInOut" }}} className={``}>
                        {/* ---ADD BUTTON--- */}
                        <div className="btn btn-lg btn-success align-items-center my_but2" type="submit" onClick={addTask}>Add <FontAwesomeIcon icon={faCalendarPlus} /></div>
                    </motion.div>
                </div>
            </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:-100, scale:0, transition: { duration:0.2, ease: "easeInOut" }}} animate={{opacity:1,y:0,scale:1, transition: { duration:0.6, ease: "easeInOut" }}} exit={{opacity:0, transition: { duration:0.2, ease: "easeInOut" }}} className={`align-items-center`}>
            {/* ---DELETE ALL BUTTON--- */}
            <div className={`btn btn-sm align-items-center ${tasks.length===0?'disabled btn-secondary':'btn-danger'}`} type="submit" onClick={() => deleteComplete(tasks)} style={{"--bs-btn-padding-y": ".15rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-fontSize": ".85rem"}}>Delete all completed tasks</div>
        </motion.div>

        {/* ---TABLE SECTION--- */}
        <AnimatePresence>
        <motion.ul initial={{opacity:0, transition: { duration:0.3, ease: "easeInOut" }}} animate={{opacity:1, transition: { duration:0.8, ease: "easeInOut" }}} className='col-11 mt-2 ms-2'>
            <AnimatePresence>
            {tasks.length!==0?tasks.map((task,index) => (
                // ---TABLE ENTRIES---
                <motion.li key={task.id} className={`${task.completed ? 'completed-box' : ''}`}>
                    <motion.div initial={{ opacity: 0, x: "-100%", overflow: "hidden", transition: { duration: 0.3, ease: "easeInOut" } }}
                                animate={{ opacity: 1, x: "0", overflow: "hidden", transition: { duration: 0.8, ease: "easeInOut" } }}
                                exit={{ opacity: 0 ,x: "100%", transition: { duration: 0.6, delay:0.3, ease: "easeInOut" } }}
                                className={`container-fluid`}>
                        {/* ---FORM OF ENTRIES--- */}
                        <div className="form-check" key={task.id}>
                            <motion.div initial={{opacity:0, scaleX:0, scaleY:0, transition: { duration:0.2, ease: "easeInOut" }}} animate={{opacity:1, scaleX:1, scaleY:1, transition: { delay:0.7, duration:0.3, ease: "easeInOut" }}} exit={{opacity:0, transition: { duration:0.2, ease: "easeInOut" }}} className={`container-fluid`}>
                                {/* ---CHECKBOX OF EACH ENTRY--- */}
                                <input id={task.id} className="form-check-input align-items-center" type="checkbox" checked={task.completed} value="" onChange={() => toggleTask(task.id)}/>
                            </motion.div>
                            {/* ---TEXT OF EACH ENTRY--- */}
                            <label className={`text-decoration form-check-label fw-light h4 ${task.completed ? 'completed' : ''}`} htmlFor={task.id}>
                                {task.text}
                            </label>
                            {/* ---"COMPLETED" TEXT WHEN TASK IS CHECKED--- */}
                            <div className={`text-decoration completedText ${task.completed ? 'visible' : 'invisible'}`} style={{"--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".2 rem", "fontSize": ".75rem", "color":"green"}}> -COMPLETED</div>
                        </div>
                    </motion.div>
                    <motion.div initial={{opacity:0, x:"100%", transition: { duration:0.2, ease: "easeInOut" }}} animate={{opacity:1,x:"0", transition: { duration:0.8, ease: "easeInOut" }}} exit={{opacity:0, transition: { duration:0.2, ease: "easeInOut" }}} className={`container-fluid col-2 my_but`}>
                        {/* ---DELETE BUTTON ON EACH ENTRY--- */}
                        <div className={`btn btn-outline-danger  ${isMobile?'btn-sm':'btn-lg'}`} style={{"--bs-btn-padding-y": ".25rem", "--bs-btn-padding-x": ".5rem", "--bs-btn-fontSize": ".75rem"}} onClick={() => deleteTask(task.id)}>Delete <FontAwesomeIcon icon={faTrashCan} /></div>
                    </motion.div>
                    <hr/>
                </motion.li>
                

            )): 
                // ---DEFAULT VALUE WHEN NO ENTRIES ARE AVAILABLE---
                <motion.div initial={{opacity:0, x:"-100%", transition: { duration:0.3, ease: "easeInOut" }}} animate={{opacity:1,x:"0", transition: { duration:0.8, delay:0.7, ease: "easeInOut" }}} exit={{opacity:0, height: 0, x:"100%", transition: { duration:0.6, ease: "easeInOut" }}} className={`container-fluid col-9 col-sm-9`}>
                    <div className="form-check" key="999999">
                        <br></br>
                        <label className={`text-decoration form-check-label fw-light h3`}>
                            Nothing to-do... Add tasks!
                        </label>
                    </div>
                </motion.div>
            }

            </AnimatePresence>
        </motion.ul>
        </AnimatePresence>

      


    </div>

    );
    
  }
export default TaskComponent;