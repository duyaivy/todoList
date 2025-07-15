import React, { useLayoutEffect, useRef, useState } from 'react'
const heavyTask = () => {
  for (var i = 0; i < 10000; i++) {
    let obj = { name: 'cc', age: 12 }
    let objString = JSON.stringify(obj)
    obj = JSON.parse(objString)
  }
}
export default function Count() {
  const [width, setWidth] = useState<number>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const calc = () => {
      setWidth(sectionRef.current?.offsetWidth || 0)
    }

    calc()
    heavyTask()
    window.addEventListener('resize', calc)
    return () => {
      window.removeEventListener('resize', calc)
    }
  }, [])
  return (
    <div>
      <section ref={sectionRef} style={{ background: 'red' }}>
        Width: {width}{' '}
      </section>
      {width > 300 && <div style={{ background: 'blue' }}>Please resize smaller</div>}
    </div>
  )
}
