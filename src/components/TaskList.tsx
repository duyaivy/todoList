import React from 'react'

import PropTypes from 'prop-types'
import { Todo } from '../@types/todo.type'
import connect, { InjectedType } from '../HOC/connect'

import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

interface TaskListProps extends InjectedType {
  doneTaskList?: boolean
  todos: Todo[]
  startEditTodo: (id: string) => void
  delTodo: (id: string) => void
  checkTodo: (id: string, done: boolean) => void
}
function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, startEditTodo, delTodo, checkTodo } = props
  const handleEdit = (id: string) => {
    startEditTodo(id)
  }
  const handleDel = (id: string) => {
    delTodo(id)
  }
  const handleCheck = (id: string, done: Boolean) => {
    checkTodo(id, !done)
  }
  return (
    <div className=' w-full px-6 overflow-y-auto max-h-56'>
      {todos.map((todo) => (
        <div className='flex items-center gap-2 my-2' key={todo.id}>
          <input
            id={todo.id}
            type='checkbox'
            checked={todo.done}
            onChange={() => handleCheck(todo.id, todo.done)}
            className='h-5 w-5 cursor-pointer'
          />
          <label
            htmlFor={todo.id}
            className={doneTaskList ? 'text-white text-xl grow pl-3 line-through' : 'text-white text-xl grow pl-3 '}
          >
            {todo.name}
          </label>

          <button
            type='submit'
            className='flex justify-center items-center text-lg bg-white  p-2 rounded-lg'
            onClick={() => handleEdit(todo.id)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button
            type='submit'
            className='flex justify-center items-center text-lg bg-white  p-2 rounded-lg'
            onClick={() => handleDel(todo.id)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </div>
  )
}
TaskList.prototype = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    })
  ),
  startEditTodo: PropTypes.func,
  delTodo: PropTypes.func,
  checkTodo: PropTypes.func
}

export default connect({ profile: { name: 'duy' } })(TaskList)
