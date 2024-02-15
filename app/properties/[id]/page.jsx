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
        { name: 'Bed_space', type: 'number' },
        { name: 'Toilet', type: 'number' },
        { name: 'Image', type: 'file', count: 5 },

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