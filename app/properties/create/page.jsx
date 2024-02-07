import Form from '@/components/Form'
import React from 'react'

function page() {

    const inputFields = [
        { name: 'Name', type: 'text' },
        { name: 'Price', type: 'text' },
        { name: 'Location / Address', type: 'textField' },
        { name: 'Sub_title', type: 'text' },
        { name: 'Bed Rooms', type: 'number' },
        { name: 'Toilets', type: 'number' },
        { name: 'Image', type: 'file' },
        { name: 'Multiple Photos', type: 'file' },


    ]

    return (
        <div className="md:p-10 p-5 space-y-10 ">
            <div className='w-full'>
                <Form inputFields={inputFields} endPoint={'addProperty'} />

            </div>
        </div>
    )
}

export default page