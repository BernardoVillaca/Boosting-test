import React from 'react'

const PageContainer = ({image, children}) => {
    return (
        <div
            className='flex h-screen'
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(30,27,29,1) 0%, rgba(137,40,249,0.9220063025210083) 100%),
                url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}>
                {children}
        </div>
    )
}

export default PageContainer