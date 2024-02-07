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
        adminAxios.get('/blog').then((res) => {
            setFetchedData(res?.data?.fetchedData)
        }).catch((err) => {
            console.log(err)
        })
    }, [reload])


    // const propertyList = [
    //     { name: 'Tranquil Haven in the Woods', image: '/Properties/property1.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Popular', id: 1 },
    //     { name: 'Serene Retreat by the Lake', image: '/Properties/property2.png', price: 'Rs 5,970', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'New Listing', id: 2 },
    //     { name: 'Charming Cottage in the Meadow', image: '/Properties/property3.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Discounted Price', id: 3 },
    //     { name: 'Tranquil Haven in the Woods', image: '/Properties/property1.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Popular', id: 4 },
    //     { name: 'Serene Retreat by the Lake', image: '/Properties/property2.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'New Listing', id: 5 },
    //     { name: 'Charming Cottage in the Meadow', image: '/Properties/property3.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Discounted Price', id: 6 },
    //     { name: 'Tranquil Haven in the Woods', image: '/Properties/property1.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Popular', id: 7 },
    //     { name: 'Serene Retreat by the Lake', image: '/Properties/property2.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'New Listing', id: 8 },
    //     { name: 'Charming Cottage in the Meadow', image: '/Properties/property3.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Discounted Price', id: 9 },
    //     { name: 'Tranquil Haven in the Woods', image: '/Properties/property1.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'Popular', id: 10 },
    //     { name: 'Serene Retreat by the Lake', image: '/Properties/property2.png', price: 'Rs 5,970', location: '103 Wright CourtBurien, WA 98168', sub_title: 'New Listing', id: 11 },
    // ]

    const tableHead = ['TITLE', 'IMAGE', 'CONTENT',]


    const router = useRouter()

    return (
        <div className="md:p-10 p-5 space-y-10 ">
            <div className='flex justify-between items-center  md:px-10'>
                <h3 className={`md:text-3xl font-bold   `}>Blog Management</h3>
                <Button name={'Add Blog'} color={'bg-green-700'} onclick={() => router.push('/blog/create')} />
            </div>
            <div className=''>
                <Table tableData={fetchedData} tableHead={tableHead} deleteApiEndpoint={'/deleteBlog'} reloadData={() => { setReload(!reload) }} />
            </div>
        </div>
    )
}

export default page