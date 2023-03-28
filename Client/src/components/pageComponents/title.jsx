import React from 'react'

const Title = ({text, textSize}) => {
  return (
    <h1 className={`font-heading font-extrabold text-white ${textSize ? textSize : 'text-6xl'} text-start`}>{text}</h1>
  )
}
export default Title