"use client"

import Form from '@/components/Form'
import LoadingComponent from '@/components/LoadingComponent'
import React, { useEffect, useState } from 'react'

function page() {


    const [isLoading, setLoading] = useState(false)

    const inputFields = [
        { name: 'Name', type: 'text' },
        { name: 'Image', type: 'file' },

    ]



    return (
        <div className="w-full md:p-10 p-5 ">

            <div className='w-full'>
                {isLoading ?
                    <LoadingComponent />
                    :
                    <Form editDataApiEndPoint={'bannerById'} inputFields={inputFields} endPoint={'editBanner'} />

                }
            </div>
        </div>
    )
}

export default page