import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
interface TitleProps {
  value: string
  address: {
    home: string
  }
}
function Title(prop: TitleProps) {
  var value = prop.value
  console.log(`title ${value} `)
  return <h1 className='text-white text-left text-4xl my-6 w-full ml-12 font-semibold'>{value}</h1>
}

Title.prototype = {
  value: PropTypes.string.isRequired
}
let handleEqual = (nextProps: TitleProps, prevProps: TitleProps) => {
  return nextProps.address.home === prevProps.address.home
}
export default React.memo(Title, handleEqual)
