import './App.css';
import React,{ useEffect, useState } from 'react';
import {v4} from 'uuid'
import TodoItem from './components/TodoItem';

function App() {
  const [name, setName] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setEdit] = useState(null);

  const handleSubmit = (event) =>{
    event.preventDefault();

    const getIdLocalStorage = JSON.parse(localStorage.getItem("myTodoList"))

    const res = getIdLocalStorage.map((eachTodo) => (eachTodo.id === todoList.id ))

    if(isEdit && todoList.id === res){
      const updateTodosList = todoList.map(((eachTodo) => (eachTodo.id === isEdit) ? {...eachTodo, todoName:name}:eachTodo))
      setEdit(updateTodosList)
      localStorage.getItem("myTodoList", JSON.stringify(updateTodosList));

      setEdit(null)
    }else{
      const todo = {
        id: v4(),
        todoName: name,
      }

      const updateTodo = [...todoList, todo];
      setTodoList(updateTodo)

      localStorage.setItem("myTodoList", JSON.stringify(updateTodo))

    }

    setName('');

  }

  const editTodoId = (editId) => {
    //console.log(editId)
    const editTodos = todoList.find(((eachTodo) => (eachTodo.id === editId)))
    if(editTodos){
      setName(editTodos.todoName)
      setEdit(editId)
    }
  }

  useEffect(() => {
    const getTodosFromLocalStorage = JSON.parse(localStorage.getItem("myTodoList"));
    setTodoList(getTodosFromLocalStorage)
  },[])

  const saveTodo = () => {
    localStorage.setItem("myTodoList",JSON.stringify(todoList));
  }

  const delTodoId = (delTodoId) => {
    // console.log(delTodoId)
    const updateTodos = todoList.filter(((eachTodo) => eachTodo.id !== delTodoId))
    setTodoList(updateTodos)
    localStorage.setItem("myTodoList",JSON.stringify(updateTodos))
  }



  return (
    <div className="App-container bg-primary vh-100 d-flex flex-column justify-content-center align-items-center ">
      <form style={{width:'50%'}} onSubmit={handleSubmit} >
        <div className='d-flex  bg-light p-1 rounded'>
        <input onChange={(e) => setName(e.target.value)} type='text' value={name} className='p-1 user-input' placeholder='Add your Todo'  />
        <button className='add-btn bg-primary text-light' type='submit'><div><i className="bi bi-plus-square p-2"></i></div></button>
        </div>
      </form>
      <div className='mt-5 fw-bold '>
        <div className='text-danger fs-3'>My Todo Lists</div>
      </div>
      <ul style={{width:'50%'}} className='text-white fw-bold mt-5'>
        {
          todoList.map((eachTodo) => (
            <TodoItem  key={eachTodo.id} todoDetails={eachTodo} deleteTodoId={delTodoId} onEditTodo={editTodoId}  />
          ))
        }
      </ul>
      <div>
        <button onClick={saveTodo} className='btn btn-primary fw-bold'>Save</button>
      </div>
    </div>
  );
}

export default App;
