import React from 'react'

const Title = ({text, textSize, otherProps}) => {
  return (
    <h1 className={`font-heading font-extrabold text-4xl md:text-5xl pb-4  2xl:text-6xl text-white ${textSize ? textSize : 'text-2xl'} text-center md:text-start ${otherProps}`}>{text}</h1>
  )
}
export default Title