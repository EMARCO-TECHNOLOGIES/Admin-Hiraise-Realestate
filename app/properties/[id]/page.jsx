"use client"

import Form from '@/components/Form'
import React, { useState } from 'react'

function page() {

    const [isLoading, setLoading] = useState(false)


    const inputFields = [
        { name: 'Name', type: 'text' },
        { name: 'Price', type: 'text' },
        { name: 'Location', type: 'textField' },
        { name: 'Sub_title', type: 'text' },
        { name: 'Image', type: 'file' },

    ]




    return (
        <div className="w-full md:p-10 p-5 ">

            <div className='w-full'>
                {isLoading ?
                    <LoadingComponent />
                    :
                    <Form editDataApiEndPoint={'propertyById'} inputFields={inputFields} endPoint={'editProperty'} />
                }
            </div>
        </div>
    )
}

export default page