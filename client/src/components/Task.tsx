import React, { ChangeEvent, useEffect, useState } from 'react'
import "./Task.css"

interface TaskItem {
  _id: string;
  user: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

const Task: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [update,setUpdate] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState<string | null>(null);
  const [editedTaskValue, setEditedTaskValue] = useState<string>("");


  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
  
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
  
      if (cookieName === name) {
        return cookieValue;
      }
    }
    setUpdate((prev) => prev+1);
    return null; // Cookie not found
  };


  const token = getCookie('token');

  const createTask = async() => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/task/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title
        }),
      });

      if (response.ok) {
        console.log("Task created succesfully")
        
      }else {
        console.log('Error', response.statusText);
      }
    } catch (err) {
      console.log('Error:', err);
    }
    setTitle("");
    setUpdate((prev) => prev+1);
  }

  const handleDeleteTask = async(id: string) => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/task/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
       
      });

      if (response.ok) {

        console.log("Deleted succesfully");
        setUpdate((prev) => prev+1);
      } else {
        console.log('Error', response.statusText);
      }
    } catch (err) {
      console.log('Error:', err);
    }
  }

  const handleUpdateTask = async () => {
    if (editedTaskId && editedTaskValue) {
      try {
        const response = await fetch(`http://localhost:5000/api/task/${editedTaskId}`, {
          method: 'PUT', // Use PATCH for updating
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: editedTaskValue
          }),
        });

        if (response.ok) {
          console.log("Updated successfully");
          setUpdate((prev) => prev + 1);
          resetEditState(); // Reset the edit state after updating
        } else {
          console.log('Error', response.statusText);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    }
  };

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    window.location.replace('http://localhost:3000/login');
  };

  const resetEditState = () => {
    setIsEditing(false);
    setEditedTaskId(null);
    setEditedTaskValue("");
  };

  useEffect(() => {
    
    const getTasks = async() => {
      try {
      
        const response = await fetch(`http://localhost:5000/api/task/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          
        });

        if (response.ok) {
          const data = await response.json();
          if(data.length > 0){
            setTasks(data);
          }else{
            setTasks([]);
          }
        } else {
          console.log('Error', response.statusText);
        }
      } catch (err) {
        console.log('Error:', err);
      }
    }

    if (token) {
      getTasks();
    }
  }, [token, update]);

  return (
    <div>
      <button className="logout-button" onClick={logout}>Logout</button>
  
      <div className='input-wrapper'>
        <input type='text' name = "todo"  value = {title}  onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }} placeholder='create a todo'></input>
        <button className='add-button' onClick={createTask}>Create</button>
      </div>

      {tasks?.length > 0 ? (
        <ul className="todo-list">
          {tasks.map((todo) => (
            <div className="todo" key={todo._id}>
              {isEditing && editedTaskId === todo._id ? (
                <>
                  <input
                    type='text'
                    value={editedTaskValue}
                    className='task-input'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setEditedTaskValue(e.target.value);
                    }}
                  />
                  <button className="update-button" onClick={handleUpdateTask}>Save</button>
                  <button className="cancel-button" onClick={resetEditState}>Cancel</button>
                </>
              ) : (
                <>
                  <li>{todo.title}</li>
                  <button
                    className="update-button"
                    onClick={() => {
                      setIsEditing(true);
                      setEditedTaskId(todo._id);
                      setEditedTaskValue(todo.title);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteTask(todo._id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
    </div>
      
  )
}

export default Task;