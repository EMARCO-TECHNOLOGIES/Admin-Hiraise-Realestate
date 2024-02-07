import Form from '@/components/Form'
import React from 'react'

function page() {

    const inputFields = [
        { name: 'User', type: 'text' },
        { name: 'Message', type: 'text' },

    ]

    return (
        <div className="md:p-10 p-5 space-y-10 ">
            <div className='w-full'>
                <Form inputFields={inputFields} endPoint={'addTestimonial'} />
            </div>
        </div>
    )
}

export default page