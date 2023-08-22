import React from 'react'
import star from '../../../../assets/trustpilotStar.png'


const ReviewCard = ({ item }) => {

    return (
        <div className="min-w-[15rem] h-48 inline-flex flex-col items-start 
                    bg-gradient-to-b from-secondary/blue to-primary/black text-white 
                    text-lg font-bold rounded-md p-4 space-y-4
                    shadow select-none snap-start snap"
        >
            <span className='text-sm text-secondary/gray '>{item.name}</span>
            <div className='flex'>
                {new Array(item.stars).fill(1).map((_, i) => (
                    <img key={i} className='h-4 scale-150' src={star} />
                ))}
            </div>
            <div className='h-full w-full break-words whitespace-pre-wrap place-content-center truncate select-none'>
                <p className='h-full text-xs text-secondary/gray break-inside-avoid'>{item.review}</p>
            </div>

        </div>
    )
}

export default ReviewCard