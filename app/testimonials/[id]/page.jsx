"use client"

import Form from '@/components/Form'
import LoadingComponent from '@/components/LoadingComponent'
// import { Form } from 'formik'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {

    const [isLoading, setLoading] = useState(false)




    const inputFields = [
        { name: 'User', type: 'text' },
        { name: 'Message', type: 'text' },

    ]


    return (
        <div className="w-full md:p-10 p-5 ">

            <div className='w-full'>
                {isLoading ?
                    <LoadingComponent />
                    :
                    <Form editDataApiEndPoint={'testimonialById'} inputFields={inputFields} endPoint={'editTestimonial'} />
                }
            </div>
        </div>

    )
}

export default page