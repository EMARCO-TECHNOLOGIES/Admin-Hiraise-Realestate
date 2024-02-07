"use client"

import ModalForm from '@/components/Modal'
import Button from '@/components/Button'
import Form from '@/components/Form'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { primary_color, secondary_color } from '@/utils/colors'
import axios from 'axios'
import adminAxios from '@/axios/adminAxios'

function Page() {

    const [fetchedData, setFetchedData] = useState()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        adminAxios.get('/banner').then((res) => {
            setFetchedData(res?.data?.fetchedData)
        }).catch((err) => {
            console.log(err)
        })
    }, [reload])

    const tableData = [
        { name: 'Banner-image-1', image: '/Banner/carousal1.png', id: 1 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 2 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 3 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 4 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 5 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 6 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 7 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 8 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 9 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 10 },
        { name: 'Banner-image-2', image: '/Banner/neighbor3.png', id: 11 },
    ]

    const tableHead = ['NAME', 'IMAGE']


    const router = useRouter()

    return (

        <div className="md:p-10 p-5 space-y-10 ">
            <div className='flex justify-between md:px-10'>
                <h3 className={`md:text-3xl font-bold   `}>Banner Management</h3>
                <Button name={'Add Banner'} color={'bg-green-700'} onclick={() => router.push('/banner/create')} />
            </div>
            <div className=''>
                <Table tableData={fetchedData} tableHead={tableHead} deleteApiEndpoint={'/deleteBanner'} reloadData={() => { setReload(!reload) }} />
            </div>
        </div>

    )
}

export default Page