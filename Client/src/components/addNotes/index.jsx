import React, { useContext, useState } from 'react'
import { MdModeEditOutline } from "react-icons/md"
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from '../buttons/customButton';
import { ServicePageContext } from '../context/service-page.context';

const AddNotes = () => {
    const [isNotesOpen, setisNotesOpen] = useState(false)
    const [notesAdded, setNotesAdded] = useState(false)
    const { notes, setNotes } = useContext(ServicePageContext)

    const handleClick = (e) => {
        if (!isNotesOpen) return setisNotesOpen(true)
        if (notes === '') {
            setisNotesOpen(false)
            return setNotesAdded(false)
        }
        setNotesAdded(true)
        setisNotesOpen(false)
    }

    return (
        <div className='relative'>
            <CustomButton
                // className='flex bg-gray-300 hover:bg-gray-200 rounded-md place-content-center items-center p-1'
                size={'w-[5.5rem] h-6 px-1'}
                otherProps={`flex justify-between`}
                gray={true}
                hover={true}
                onClick={handleClick}
            >
                <span className={`text-xs pr-1`}
                >
                    {notesAdded ? 'Added' : 'Add notes'}</span>
                <MdModeEditOutline className={`${notesAdded && 'text-custom-green'}`} size={15} />
            </CustomButton>
            {isNotesOpen &&
                <div className='flex flex-col absolute w-64 h-[12.2rem] bg-primary/black right-[6.5rem] -top-[4.2rem] rounded-md px-2 pt-2 space-y-2 '>
                    <div className='flex h-8 w-full justify-between  text-white'>
                        <span>Let us know any other info:</span>
                        <button onClick={() => setisNotesOpen(false)}>
                            <AiOutlineClose />
                        </button>
                    </div>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className='h-[7.2rem] px-2 w-full  outline-none noResize overlay'
                    />
                    <div className='flex h-8 place-content-end'>
                        <CustomButton
                            size={'w-12 h-6'}
                            hover={true}
                            onClick={handleClick}
                        >
                            Save
                        </CustomButton>
                    </div>
                </div>
            }
        </div>

    )
}

export default AddNotes