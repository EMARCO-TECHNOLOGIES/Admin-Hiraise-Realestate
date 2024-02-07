"use client"

import React from 'react'
import Login_Signup_form from '@/components/Signup_login_form'

function page() {

    const inputFields = [
        { name: 'Username', type: 'text' },
        { name: 'Password', type: 'password' },

    ]

    return (

        <div className='flex justify-center items-center w-full h-screen '>

            <div
                className="container max-w-md mx-auto xl:max-w-3xl h-[400px] flex bg-white rounded-lg shadow overflow-hidden"
            >
                <div className="relative hidden xl:block xl:w-1/2 h-full">
                    <img
                        className="absolute h-auto w-full object-cover"
                        src="https://images.unsplash.com/photo-1541233349642-6e425fe6190e"
                        alt="my zomato"
                    />
                </div>
                <div className="w-full xl:w-1/2 p-8 space-y-4">

                    <Login_Signup_form initialValues={{ username: '', password: '' }} endPoint={'/login'} inputFields={inputFields} formName={'Login'} />
                    <p className='text-xs'>Don't have an account yet? <a href="/register">Register here</a></p>

                </div>
            </div>
        </div>

    )
}

export default page