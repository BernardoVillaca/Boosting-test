import React from 'react'

const BoosterItem = ({ booster, handleChild, selectedBooster}) => {
  
  return (

    <button
      key={booster.id}
      className={`flex flex-col w-full h-8 border-b-2 hover:bg-slate-200 ${selectedBooster.includes(booster) ? 'bg-slate-200' : ''}`}
      onClick={() => {
        
        handleChild(booster)
      }}
    >
      <span>{booster.displayName}</span>
    </button>
  )
}

export default BoosterItem