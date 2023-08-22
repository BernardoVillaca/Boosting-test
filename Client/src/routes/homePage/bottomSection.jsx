import React from 'react'
import paypal from '../../assets/payments/paypal-ui-kit.svg'
import visa from '../../assets/payments/visa-ui-kit.svg'
import mastercard from '../../assets/payments/mastercard-ui-kit.svg'
import discord from '../../assets/discord.png'
import Title from '../../components/pageComponents/title'


const BottomSection = () => {
    return (
        <div className='xl:flex-grow xl:flex h-full  pb-4 xl:pt-8 place-content-center items-center  '>
            <div className='xl:flex xl:justify-center xl:space-x-16 '>
                <div className='flex flex-col items-center py-4 space-y-4 border-b-[1px] border-light-purple border-opacity-20 xl:border-b-0'>
                    <Title
                        text={'Contact Us'}
                        otherProps={''}
                        textSize={'text-2xl md:text-3xl xl:text-4xl'}
                    />
                    <div className='flex items-center'>
                        <img className='h-12 md:w-48 ' src={discord}></img>
                        <button
                            className='text-primary/purple text-xs md:text-base'
                            onClick={() => navigator.clipboard.writeText('InnateGaming#123123')}
                        >
                            InnateGaming#123123
                        </button>
                    </div>
                </div>
                <div className='flex flex-col text-center space-y-4 items-center pt-4'>
                    <Title text={'Secure Payment'} textSize={'text-2xl md:text-3xl xl:text-4xl'} />
                    <div className='xl:flex xl:space-x-4'>
                        <img className='h-8 xl:h-10 mx-auto ' src={paypal}></img>
                        <img className='h-8 xl:h-10 mx-auto scale-75' src={visa}></img>
                        <img className='h-8 xl:h-10 mx-auto' src={mastercard}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomSection