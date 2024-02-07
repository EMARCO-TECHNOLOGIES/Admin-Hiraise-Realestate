import Form from '@/components/Form'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import React from 'react'

function page() {


    const inputFields = [
        { name: 'Name', type: 'text' },
        { name: 'Image', type: 'file' },

    ]

    return (

        <div className="w-full md:p-10 p-5 ">

            <div className='w-full'>
                <Form inputFields={inputFields} endPoint={'addBanner'} />

            </div>
        </div>

    )
}

export default page