import Form from '@/components/Form'
import React from 'react'

function page() {


    const inputFields = [
        { name: 'Name', type: 'text' },
        { name: 'Image', type: 'file', count: 1 },

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