import React from 'react'

const TodoItem = (props) => {
    const {todoDetails, deleteTodoId, onEditTodo } = props
    const {id,todoName} = todoDetails

    const deleteTodo = () => {
      deleteTodoId(id)
    }

    const editTodo = () => {
      onEditTodo(id)
    }

  return (
    <li className='d-flex align-items-center p-3 rounded text-light  '>
        
            <div className='p-3 checkout-input'>
                <input id='todoId' className=' me-2 ' type='checkbox' />
            </div>

            <div  className='d-flex p-2  todo-con justify-content-between '>
            <div  >
            <label  className='p-2 label-con' htmlFor='todoId' >{todoName}</label>
            </div>

            <div  className='btns d-flex justify-content-between'>
                <button onClick={editTodo} ><i className="bi bi-pencil-square "></i></button>
                <button onClick={deleteTodo} ><i className="bi bi-trash3-fill"></i></button>
            </div>
            </div>
        <div>

        </div>
    </li>
  )
}

export default TodoItem;