import React, { useState, useContext } from 'react'
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { ServicePageContext } from '../context/service-page.context';
import ServiceTabContainer from './serviceTabContainer';


const classData = [
    {
        wowClass: 'Druid',
        classIcon: require('../../assets/WoWClasses/Druid/druid_class.jpg'),
        specs: [
            {
                spec: 'Restoration',
                specIcon: require('../../assets/WoWClasses/Druid/resto_spec.jpg')
            },
            {
                spec: 'Balance',
                specIcon: require('../../assets/WoWClasses/Druid/balance_spec.jpg')
            },
            {
                spec: 'Feral',
                specIcon: require('../../assets/WoWClasses/Druid/feral_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Warrior',
        classIcon: require('../../assets/WoWClasses/Warrior/warrior_class.jpg'),
        specs: [
            {
                spec: 'Arms',
                specIcon: require('../../assets/WoWClasses/Warrior/arms_spec.jpg')
            },
            {
                spec: 'Fury',
                specIcon: require('../../assets/WoWClasses/Warrior/fury_spec.jpg')
            },
            {
                spec: 'Protection',
                specIcon: require('../../assets/WoWClasses/Warrior/protection_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Mage',
        classIcon: require('../../assets/WoWClasses/Mage/mage_class.jpg'),
        specs: [
            {
                spec: 'Fire',
                specIcon: require('../../assets/WoWClasses/Mage/fire_spec.jpg')
            },
            {
                spec: 'Frost',
                specIcon: require('../../assets/WoWClasses/Mage/frost_spec.jpg')
            },
            {
                spec: 'Arcane',
                specIcon: require('../../assets/WoWClasses/Mage/arcane_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Evoker',
        classIcon: require('../../assets/WoWClasses/Evoker/evoker_class.jpg'),
        specs: [
            {
                spec: 'Preservation',
                specIcon: require('../../assets/WoWClasses/Evoker/preservation_spec.jpg')
            },
            {
                spec: 'Devastation',
                specIcon: require('../../assets/WoWClasses/Evoker/devastation_spec.jpg')
            },

        ]
    },
    {
        wowClass: 'Warlock',
        classIcon: require('../../assets/WoWClasses/Warlock/warlock_class.jpg'),
        specs: [
            {
                spec: 'Affliction',
                specIcon: require('../../assets/WoWClasses/Warlock/affliction_spec.jpg')
            },
            {
                spec: 'Destruction',
                specIcon: require('../../assets/WoWClasses/Warlock/destruction_spec.jpg')
            },
            {
                spec: 'Demonology',
                specIcon: require('../../assets/WoWClasses/Warlock/demonology_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Hunter',
        classIcon: require('../../assets/WoWClasses/Hunter/hunter_class.jpg'),
        specs: [
            {
                spec: 'Beast Mastery',
                specIcon: require('../../assets/WoWClasses/Hunter/beast_mastery_spec.jpg')
            },
            {
                spec: 'Marksmanship',
                specIcon: require('../../assets/WoWClasses/Hunter/marks_spec.jpg')
            },
            {
                spec: 'Survival',
                specIcon: require('../../assets/WoWClasses/Hunter/survival_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Paladin',
        classIcon: require('../../assets/WoWClasses/Paladin/paladin_class.jpg'),
        specs: [
            {
                spec: 'Retribution',
                specIcon: require('../../assets/WoWClasses/Paladin/retribution_spec.jpg')
            },
            {
                spec: 'Protection',
                specIcon: require('../../assets/WoWClasses/Paladin/prot_spec.jpg')
            },
            {
                spec: 'Holy',
                specIcon: require('../../assets/WoWClasses/Paladin/holy_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Shaman',
        classIcon: require('../../assets/WoWClasses/Shaman/shaman_class.jpg'),
        specs: [
            {
                spec: 'Enhancement',
                specIcon: require('../../assets/WoWClasses/Shaman/enchanc_spec.jpg')
            },
            {
                spec: 'Restoration',
                specIcon: require('../../assets/WoWClasses/Shaman/restoration_spec.jpg')
            },
            {
                spec: 'Elemental',
                specIcon: require('../../assets/WoWClasses/Shaman/elemental_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Rogue',
        classIcon: require('../../assets/WoWClasses/Rogue/rogue_class.jpg'),
        specs: [
            {
                spec: 'Outlaw',
                specIcon: require('../../assets/WoWClasses/Rogue/outlaw_spec.jpg')
            },
            {
                spec: 'Assassination',
                specIcon: require('../../assets/WoWClasses/Rogue/assassination_spec.jpg')
            },
            {
                spec: 'Subtlety',
                specIcon: require('../../assets/WoWClasses/Rogue/subtlety_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Death Knight',
        classIcon: require('../../assets/WoWClasses/DeathKnight/death_knight_class.jpg'),
        specs: [
            {
                spec: 'Frost',
                specIcon: require('../../assets/WoWClasses/DeathKnight/frost_dk_spec.jpg')
            },
            {
                spec: 'Unholy',
                specIcon: require('../../assets/WoWClasses/DeathKnight/unholy_spec.jpg')
            },
            {
                spec: 'Blood',
                specIcon: require('../../assets/WoWClasses/DeathKnight/blood_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Priest',
        classIcon: require('../../assets/WoWClasses/Priest/priest_class.jpg'),
        specs: [
            {
                spec: 'Shadow',
                specIcon: require('../../assets/WoWClasses/Priest/shadow_spec.jpg')
            },
            {
                spec: 'Holy',
                specIcon: require('../../assets/WoWClasses/Priest/holyp_spec.jpg')
            },
            {
                spec: 'Discipline',
                specIcon: require('../../assets/WoWClasses/Priest/discipline_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Monk',
        classIcon: require('../../assets/WoWClasses/Monk/monk_class.jpg'),
        specs: [
            {
                spec: 'Windwalker',
                specIcon: require('../../assets/WoWClasses/Monk/windwalker_spec.jpg')
            },
            {
                spec: 'Brewmaster',
                specIcon: require('../../assets/WoWClasses/Monk/brewmaster_spec.jpg')
            },
            {
                spec: 'Mistweaver',
                specIcon: require('../../assets/WoWClasses/Monk/mistweaver_spec.jpg')
            },
        ]
    },
    {
        wowClass: 'Demon Hunter',
        classIcon: require('../../assets/WoWClasses/DemonHunter/demon_hunter_class.jpg'),
        specs: [
            {
                spec: 'Havoc',
                specIcon: require('../../assets/WoWClasses/DemonHunter/havoc_spec.jpg')
            },
            {
                spec: 'Vengeance',
                specIcon: require('../../assets/WoWClasses/DemonHunter/vengeance_spec.jpg')
            },
        ]
    },

]

const ClassTab = () => {
    const { wowClass, setWowClass, spec, setSpec, message, setMessage, setClassIcon, setSpecIcon, classIcon } = useContext(ServicePageContext)
    const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false)
    const [isSpecDropdownOpen, setIsSpecDropdownOpen] = useState(false)
    const [specsArray, setSpecsArray] = useState(null)

    const handleClassClick = (item) => {
        setMessage('')
        setWowClass(item.wowClass)
        setClassIcon(item.classIcon)
        setSpecsArray(item.specs)
        setIsClassDropdownOpen(false)

        if (item.wowClass !== wowClass) {
            setSpec(null)
            setIsSpecDropdownOpen(true)
        }
    }
    const handleSpecClick = (item) => {
        setSpec(item)
        setIsSpecDropdownOpen(false)
        setIsClassDropdownOpen(false)
    }



    {/* <span className={`border rounded-md w-24 pt-1 ${message === 'Fill with your class and spec to proceed!!' && 'border-red-600'}`}/> */ }
    return (
        <ServiceTabContainer tabName={'Class'}>
            {/* class button */}
            <div className='relative'>
                <button
                    className='flex h-8 items-center '
                    onClick={() => {
                        setIsClassDropdownOpen(!isClassDropdownOpen)
                        setIsSpecDropdownOpen(false)
                    }}
                >
                    <div className={`h-8 w-8 border rounded-md overflow-hidden ${message === 'Fill with your class and spec to proceed!!' ? 'border-custom-red' : 'border-primary/purple'}`}>
                        {classIcon &&
                            <img className='w-8 h-8' src={classIcon}></img>
                        }
                    </div>
                    {isClassDropdownOpen ? <BiCaretUp size={20} /> : <BiCaretDown size={20} />
                    }
                </button>
                {isClassDropdownOpen &&
                    <div className='absolute grid w-40 h-24 grid-rows-3 grid-flow-col top-[47px] -left-[5.5rem] z-10'>
                        {classData.map((item, index) =>
                            <button
                                key={index}
                                className={`${index === 12 && 'row-start-2 col-span-4'}group/container flex items-center bg-primary/black hover:opacity-90 hover:shadow-lg w-full `}
                                onClick={() => handleClassClick(item)}
                            >
                                <img className={`w-8 h-8 border-2 hover:border-0 border-transparent rounded-md ${item.wowClass === wowClass && 'opacity-30'}`} src={item.classIcon}></img>
                            </button>
                        )}
                    </div>
                }
            </div>
            {/* spec button */}
            <div className='relative flex flex-col pl-4'>
                <button
                    className='flex items-center'
                    onClick={() => setIsSpecDropdownOpen(!isSpecDropdownOpen)}
                    disabled={wowClass === null}
                >
                    <div className={`w-8 h-8 border rounded-md overflow-hidden ${message === 'Fill with your class and spec to proceed!!' ? 'border-custom-red' : 'border-primary/purple'}`}>
                        {spec !== null &&
                            <img className='w-8 h-8' src={spec.specIcon}></img>
                        }
                    </div>
                    <div className='w-8'>
                        {isSpecDropdownOpen ?
                            <BiCaretUp size={20} /> :
                            <BiCaretDown size={20} />
                        }
                    </div>
                </button>
                {isSpecDropdownOpen &&
                    <div className='absolute  top-[47px] left-4 bg-primary/black'>
                        {specsArray &&
                            specsArray.map((item, index) =>
                                <button
                                    key={index}
                                    className={`flex group/container items-center  ${item.spec === spec && 'bg-slate-200'}`}
                                    onClick={() => handleSpecClick(item)}
                                >
                                    <img className='w-8 h-8 border-2 group-hover/container:border-0 border-transparent rounded-md' src={item.specIcon}></img>
                                    
                                </button>
                            )}
                    </div>
                }
            </div>
        </ServiceTabContainer>

    )
}

export default ClassTab