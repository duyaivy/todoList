import { useReducer } from 'react'
const initalState = {
  age: 26
}
type actionType = { type: 'increaseAge' } | { type: 'decreaseAge' }
const reducer = (state: typeof initalState, action: actionType) => {
  if (action.type === 'increaseAge') {
    return {
      ...state,
      age: state.age + 1
    }
  }
  if (action.type === 'decreaseAge') {
    return {
      ...state,
      age: state.age - 1
    }
  }
  throw Error('Invalid action ', action)
}

export default function Counter() {
  //   const [state, setState] = useState<{ age: number }>({ age: 20 })
  const [state, dispatch] = useReducer(reducer, initalState)
  const increasrAge = () => {
    dispatch({ type: 'increaseAge' })
  }
  const decreasrAge = () => {
    dispatch({ type: 'decreaseAge' })
  }

  return (
    <div>
      <button onClick={increasrAge} style={{ background: 'green' }}>
        +
      </button>
      <div>Age: {state.age}</div>
      <button onClick={decreasrAge} style={{ background: 'red' }}>
        -
      </button>
    </div>
  )
}
