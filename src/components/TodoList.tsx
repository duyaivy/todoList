import React, { useEffect, useReducer, useState } from 'react'

import TaskInput from './TaskInput'
import TaskList from './TaskList'
import { Todo } from '../@types/todo.type'
import Title from './Title'
import Watch from './Watch/Watch'

import './style.css'
import Count from './Count/Count'
import Counter from './Counter/Counter'

interface handleNewTodos {
  (todos: Todo[]): Todo[]
}
const initialState = {
  todos: [] as Todo[]
}
type typeTodo = {
  name: string
  done: boolean
  id: string
}
type actionType =
  | {
      type: 'addTodo'
      payload: Todo
    }
  | { type: 'checkTodo'; payload: { id: string } }
  | { type: 'updateTodo'; payload: Todo[] }

const reducer = (state: typeof initialState, action: actionType) => {
  switch (action.type) {
    case 'updateTodo':
      return {
        todos: action.payload
      }
    case 'addTodo':
      return {
        todos: [...state.todos, action.payload]
      }
    case 'checkTodo':
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              done: !todo.done
            }
          } else return todo
        })
      }

    default:
      return state
  }
}
const syncToLocal = (handleNewTodos: handleNewTodos) => {
  const todoString = localStorage.getItem('todos')
  const todoObj: Todo[] = JSON.parse(todoString || '[]')
  const newTodos = handleNewTodos(todoObj)
  localStorage.setItem('todos', JSON.stringify(newTodos))
}

export default function TodoList() {
  // const [todos, setTodos] = useState<Todo[]>([])
  const [state, dispatch] = useReducer(reducer, initialState)

  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)
  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')

    dispatch({ type: 'updateTodo', payload: todoObj })
  }, [])
  const doneTodos = state.todos.filter((todo) => {
    return todo.done
  })
  const notDoneTodos = state.todos.filter((todo) => {
    return !todo.done
  })
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    // setTodos((prev) => {
    //   return [...prev, todo]
    // })
    dispatch({ type: 'addTodo', payload: todo })
    syncToLocal((todosObj: Todo[]) => [...todosObj, todo])
  }
  const startEditTodo = (id: string) => {
    const findedTodo = state.todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }
  const finishEditTodo = () => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    }
    // setTodos(handler)

    dispatch({ type: 'updateTodo', payload: handler(state.todos) })
    syncToLocal(handler)
    setCurrentTodo(null)
  }
  const editTodo = (name: string) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }
  const delTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObj: Todo[]) => {
      const findedIndex = todoObj.findIndex((todo) => todo.id === id)
      if (findedIndex !== -1) {
        const resuilt = [...todoObj]
        resuilt.splice(findedIndex, 1)
        return resuilt
      }
      return todoObj
    }
    // setTodos(handler)
    dispatch({ type: 'updateTodo', payload: handler(state.todos) })
    syncToLocal(handler)
  }
  const checkTodo = (id: string, done: boolean) => {
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }
    // setTodos(handler)
    dispatch({ type: 'checkTodo', payload: { id: id } })
    syncToLocal(handler)
  }
  var address = {
    home: 'todolis Title'
  }
  return (
    <div className='flex justify-start flex-col items-center max-w-[500px] bg-slate-800 m-auto h-[95vh] rounded-2xl my-5'>
      <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
      <Title address={address} value='Hoàn thành'></Title>
      <TaskList
        todos={notDoneTodos}
        startEditTodo={startEditTodo}
        checkTodo={checkTodo}
        delTodo={delTodo}
        doneTaskList={false}
      ></TaskList>
      <Title address={address} value={'Chưa hoàn thành'}></Title>
      <TaskList
        todos={doneTodos}
        startEditTodo={startEditTodo}
        checkTodo={checkTodo}
        delTodo={delTodo}
        doneTaskList={true}
      ></TaskList>
    </div>
  )
}
