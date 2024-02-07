"use client"

import adminAxios from '@/axios/adminAxios'
import Form from '@/components/Form'
import LoadingComponent from '@/components/LoadingComponent'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {


    const [isLoading, setLoading] = useState(false)




    // const dummyData = [
    //     { name: 'Banner-image-1', image: '/Banner/carousal1.png', id: '1' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '2' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '3' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '4' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '5' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '6' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '7' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '8' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '9' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '10' },
    //     { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: '11' },
    // ]

    const inputFields = [
        { name: 'Name', type: 'text' },
        { name: 'Image', type: 'file' },

    ]



    // const obj = dummyData.filter((item, index) => {
    //     return item.id === bannerId
    // })

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