import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

import '../style.css'
const InputTest = forwardRef<{ typing: () => void }>((props, ref) => {
  const [value, setValue] = useState<string>(' ')
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => {
    return {
      typing
    }
  })
  const typing = () => {
    inputRef.current?.focus()
    let numberIndex: number = 0
    let initialString = 'Tran Tam Nhu'

    let interval: any = setInterval(() => {
      setValue(initialString.slice(0, numberIndex))
      if (numberIndex === initialString.length) {
        clearInterval(interval)
      }
      numberIndex++
    }, 100)
  }

  const onChangeInput = () => {
    setValue(inputRef.current?.value ? inputRef.current?.value : ' ')
  }

  return (
    <div>
      <input className='bg-black text-white' type='text' onChange={onChangeInput} ref={inputRef} value={value} />
    </div>
  )
})
export default function AutoInput() {
  const funcInputRef = useRef<{ typing: () => void }>({ typing: () => {} })
  const handleClick = () => {
    funcInputRef.current.typing()
  }
  return (
    <div>
      <div>
        <button onClick={handleClick}>Click me to typing</button>
      </div>
      <InputTest ref={funcInputRef} />
    </div>
  )
}
