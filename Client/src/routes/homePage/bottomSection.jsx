import React from 'react'
import paypal from '../../assets/payments/paypal-ui-kit.svg'
import visa from '../../assets/payments/visa-ui-kit.svg'
import mastercard from '../../assets/payments/mastercard-ui-kit.svg'
import discord from '../../assets/discord.svg'
import Title from '../../components/pageComponents/title'

const BottomSection = () => {
    return (
        <div className='flex h-[17rem] place-content-center justify-center space-x-4 p-4'>
            <div className='flex flex-col w-1/2 text-center items-center pt-12'>
                <Title text={'Contact Us'} textSize={'text-5xl'} />
                <div className='flex items-center'>
                    <img className='w-48 ' src={discord}></img>
                    <button
                        className='text-primary/purple'
                        onClick={() => navigator.clipboard.writeText('InnateGaming#123123')}
                    >
                        InnateGaming#123123
                    </button>
                </div>
            </div>
            <div className='flex flex-col w-1/2 text-center items-center space-y-10 pt-12'>
                <Title text={'Secure Payment'} textSize={'text-5xl'} />
                <div className='flex space-x-4'>
                    <img className='h-8' src={paypal}></img>
                    <img className='h-8' src={visa}></img>
                    <img className='h-8' src={mastercard}></img>
                </div>
            </div>
        </div>
    )
}

export default BottomSection