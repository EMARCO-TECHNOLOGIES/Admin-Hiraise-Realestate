import Form from '@/components/Form'
import React from 'react'

function page() {

    const inputFields = [
        { name: 'Title', type: 'text' },
        { name: 'Content', type: 'textArea' },
        { name: 'Image', type: 'file' },
    ]

    return (
        <div className="md:p-10 p-5 space-y-10 ">
            <div className='w-full'>
                <Form inputFields={inputFields} endPoint={'addBlog'} />

            </div>
        </div>
    )
}

export default page