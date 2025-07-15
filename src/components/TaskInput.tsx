import React, { useMemo, useState } from 'react'

import { Todo } from '../@types/todo.type'
import PropTypes from 'prop-types'
import { debug, log } from '../constand'
import connect from '../HOC/connect'
import Title from './Title'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import './style.css'
interface TaskInputProp {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}
function TaskInput(props: TaskInputProp & typeof injectedProps) {
  const { addTodo, editTodo, finishEditTodo, currentTodo, debug, log } = props
  const [name, setName] = useState<string>('')

  log('Day la debug Highter Order Components:' + debug)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
    } else {
      if (name) {
        addTodo(name)
        setName('')
      }
    }
  }
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (currentTodo) {
      if (value !== '') editTodo(value)
    } else {
      setName(value)
    }
  }
  var address = useMemo(() => {
    return {
      home: `TTN taskinput ${currentTodo} `
    }
  }, [currentTodo])
  return (
    <div className='w-full px-6'>
      <Title address={address} value={'To do list TypeScripts'}></Title>
      <form action='' className='flex gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          value={currentTodo ? currentTodo.name : name}
          className='py-3 px-4 text-[16px] placeholder:text-[#ccc] grow rounded-md focus:outline-none border-blue-950 border-[2px]'
          placeholder='Caption goes here'
          onChange={onChangeInput}
        />
        <button
          type='submit'
          className='flex justify-center items-center text-[1.3rem] bg-white px-4 rounded-md  border-blue-950 border-[2px]'
        >
          {currentTodo ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faPlus} />}
        </button>
      </form>
    </div>
  )
}

TaskInput.prototype = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOf([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired
    }),
    null
  ]),
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired
}
const injectedProps = { debug: debug, log: log }
export default connect(injectedProps)(TaskInput)
