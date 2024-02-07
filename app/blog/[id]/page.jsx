"use client"

import Form from '@/components/Form'
import React, { useState } from 'react'

function page() {

    const [isLoading, setLoading] = useState(false)


    const inputFields = [
        { name: 'Title', type: 'text' },
        { name: 'Content', type: 'textArea' },
        { name: 'Image', type: 'file' },
    ]




    return (
        <div className="w-full md:p-10 p-5 ">

            <div className='w-full'>
                {isLoading ?
                    <LoadingComponent />
                    :
                    <Form editDataApiEndPoint={'blogById'} inputFields={inputFields} endPoint={'editBlog'} />
                }
            </div>
        </div>
    )
}

export default page