"use client"

import Button from '@/components/Button'
import Table from '@/components/Table'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
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