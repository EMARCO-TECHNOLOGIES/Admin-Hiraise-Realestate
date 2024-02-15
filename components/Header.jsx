import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'

function Header() {
    const router = useRouter()
    const logout = () => {
        Cookies.remove('userToken')
        router.push('/login')
        toast.success('You have logged out')
    }


    function logoutButton() {
        return (
            <a className="cursor-pointer text-gray-500 transition-colors duration-200 rtl:rotate-0 hover:text-red-600  flex space-x-2">
                <p className="md:text-sm text-xs font-medium ">Logout</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rotate-180">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </a>
        )
    }
    return (
        <div className='bg-white shadow-md flex justify-between h-20'>
            <div className="flex items-center justify-center w-56 p-10">
                <Image src={'/logo.png'} width={200} height={200} alt='logo' className='md:w-[120px] w-24 object-cover' />
            </div>
            <div className='flex justify-center items-center pr-5 space-x-5'>

                <Modal component={'logout'} btnName={logoutButton()} onAccept={logout} />
            </div>
        </div>
    )
}

export default Header