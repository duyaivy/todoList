import React, { useEffect, useRef, useState } from 'react'

function WatchTimer() {
  const [seconds, setSeconds] = useState<number>(0)
  const intervalRef = useRef<any>(null)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
      console.log('setinterval chay hcay')
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
      console.log('setinterval unmout')
    }
  }, [])
  return <div>Watch: {seconds}</div>
}
export default function Watch() {
  const [visible, setVisible] = useState<boolean>(true)
  const btnRef = useRef<HTMLButtonElement>(null)
  const setColor = () => {
    if (btnRef.current) {
      btnRef.current.style.color = 'red'
    }
  }
  return (
    <div>
      <button
        ref={btnRef}
        onClick={() => {
          setColor()
          setVisible((prev) => !prev)
        }}
      >
        setVisible
      </button>
      {visible && <WatchTimer />}
    </div>
  )
}
