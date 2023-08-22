import React, { useState } from 'react'

const TextSliceButton = ({ text }) => {
    const [effect, setEffect] = useState(false)

    return (
        <div className='relative flex w-full px-3 '>
            {effect &&
                <span
                    className='absolute text-xs left-20 -top-2'
                >
                    copied!
                </span>}
            {text &&
                <button
                    className={`${effect && "animate-textToGreen"} underline truncate w-full text-primary/purple hover:text-white`}
                    onClick={() => {
                        navigator.clipboard.writeText(text)
                        setEffect(true);
                    }}
                    onAnimationEnd={() => setEffect(false)}
                >
                    <span className='truncate'>{text}</span>
                 </button>
            }
        </div>
    )
}

export default TextSliceButton