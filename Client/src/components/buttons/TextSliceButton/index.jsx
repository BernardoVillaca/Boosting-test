import React, { useState } from 'react'

const TextSliceButton = ({ text, slice }) => {
    const [effect, setEffect] = useState(false)

    return (
        <div className='relative flex'>
            {effect &&
                <span
                    className='absolute text-xs left-20 -top-2'
                >
                    copied!
                </span>}
            {text &&
                <button
                    className={`${effect && "animate-textToGreen"} underline text-primary/purple hover:text-white`}
                    onClick={() => {
                        navigator.clipboard.writeText(text)
                        setEffect(true);
                    }}
                    onAnimationEnd={() => setEffect(false)}
                >
                    {text.length <= slice ? text : `${text.slice('', slice)}...`}
                </button>
            }
        </div>
    )
}

export default TextSliceButton