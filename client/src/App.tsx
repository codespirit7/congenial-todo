import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Task from './components/Task'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route  path = "/" element = {<Register />} />
        <Route  path = "login" element = {<Login />} />
        <Route  path = "tasks" element = {<Task />} />
      </Routes>
    </Router>


      
    </>
  )
}

export default App
