import React, { createContext, useCallback, useContext, useId, useMemo, useState } from 'react'

import '../style.css'

interface ThemeType {
  theme: {
    color: 'light' | 'dark'
  }
  onChangeTheme: (color: 'light' | 'dark') => void
}
const ThemeContext = createContext<ThemeType>({
  theme: {
    color: 'light'
  },
  onChangeTheme: () => {}
})
const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType['theme']>({
    color: 'light'
  })
  const onChangeTheme = useCallback((color: 'light' | 'dark') => {
    setTheme((prev) => ({ ...prev, color }))
  }, [])
  return { theme, onChangeTheme }
}

export default function Wellcome() {
  const { theme, onChangeTheme } = useTheme()

  const valueContext = useMemo(() => {
    return { theme, onChangeTheme }
  }, [theme, onChangeTheme])

  return (
    <div className='flex flex-col'>
      <ThemeContext.Provider value={valueContext}>
        <Form />
        <Label />
      </ThemeContext.Provider>
    </div>
  )
}
const Label = () => {
  const { theme, onChangeTheme } = useContext(ThemeContext)
  const id = useId()
  return (
    <div>
      <input
        type='checkbox'
        checked={theme.color === 'dark'}
        id={id}
        onChange={(e) => {
          onChangeTheme(e.target.checked ? 'dark' : 'light')
        }}
      />
      <label htmlFor={id}>Use DarkMode</label>
    </div>
  )
}

const Form = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className={theme.color}>
      <h2>Wellcome</h2>
      <Button>Login</Button>
      <Button>Signup</Button>
    </div>
  )
}

const Button = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext)
  return <button className={'px-3 py-2 border border-[#ccc] mx-2 ' + theme.color}>{children}</button>
}
