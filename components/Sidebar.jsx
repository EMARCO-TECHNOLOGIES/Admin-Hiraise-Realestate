"use client"
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import { primary_color } from '@/utils/colors';


function Side() {


    const [openNav, setOpenNav] = useState(false)
    const path = usePathname().split('/')[1]

    const [selected, setSelected] = useState(path ? path : 'banner')

    const menuItems = [
        // { icon: 'bx-home', name: 'Home', redirect: '/' },
        { icon: 'bx-slider', name: 'Banner', redirect: '/banner' },
        { icon: 'bx-building', name: 'Properties', redirect: '/properties' },
        { icon: 'bx-user-voice', name: 'Testimonials', redirect: '/testimonials' },
        { icon: 'bx bxl-blogger', name: 'Blog', redirect: '/blog' },


    ]

    const router = useRouter()



    return (
        <div>
            {/* to load the icons on tabs */}
            <link rel="stylesheet" href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css" />

            <div className="min-h-screen h-full  lg:flex hidden flex-row ">
                <div className="flex flex-col w-56 pt-10 bg-white overflow-hidden  shadow-lg">

                    <ul className="flex flex-col py-4">
                        {menuItems.map((item, index) => (

                            <li key={index} className={`text-[#${primary_color}]`}>
                                <span onClick={() => { router.push(item.redirect), setSelected(item.name.toLowerCase()) }} className={`flex cursor-pointer flex-row hover:bg-slate-200  items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800 ${selected === item.name.toLowerCase() ? 'bg-slate-200 text-gray-800' : 'bg-white'}`}>
                                    <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className={`bx ${item.icon}`} ></i></span>
                                    <span className="text-[15px] font-semibold">{item.name}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='lg:hidden block '>
                <div className='absolute top-0 p-6  border-none w-screen'>

                    <FontAwesomeIcon icon={faBars} onClick={() => setOpenNav(!openNav)} />
                </div>
                {openNav ?
                    <div className="min-h-screen flex flex-row bg-gray-100 border-none">
                        <div className="flex flex-col w-screen bg-white  overflow-hidden ">

                            <ul className="flex flex-col py-4 w-full justify-center  ">
                                {menuItems.map((item, index) => (

                                    <li key={index} className={`text-[#${primary_color}] `}>
                                        <span onClick={() => { router.push(item.redirect), setOpenNav(!openNav) }} className={`flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200  hover:text-gray-800`}>
                                            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i className={`bx ${item.icon}`} ></i></span>
                                            <span className={`text-sm font-medium `}>{item.name}</span>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    : null}
            </div>
        </div>
    )
}

export default Side