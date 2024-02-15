"use client"

import adminAxios from '@/axios/adminAxios'
import Button from '@/components/Button'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {


    const [fetchedData, setFetchedData] = useState()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        adminAxios.get('/property').then((res) => {
            setFetchedData(res?.data?.fetchedData)
        }).catch((err) => {
            console.log(err)
        })
    }, [reload])


    const tableHead = ['NAME', 'IMAGE', 'PRICE', 'LOCATION', 'SUB_TITLE', 'BED_SPACE', 'TOILET',]


    const router = useRouter()

    return (
        <div className="md:p-10 p-5 space-y-10 ">
            <div className='flex justify-between items-center  md:px-10'>
                <h3 className={`md:text-3xl font-bold   `}>Properties Management</h3>
                <Button name={'Add Property'} color={'bg-green-700'} onclick={() => router.push('/properties/create')} />
            </div>
            <div className=''>
                <Table tableData={fetchedData} tableHead={tableHead} deleteApiEndpoint={'/deleteProperty'} reloadData={() => { setReload(!reload) }} />
            </div>
        </div>
    )
}

export default page