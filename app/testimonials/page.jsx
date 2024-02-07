"use client"

import adminAxios from '@/axios/adminAxios'
import Button from '@/components/Button'
import Table from '@/components/Table'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function page() {


    const [fetchedData, setFetchedData] = useState()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        adminAxios.get('/testimonial').then((res) => {
            setFetchedData(res?.data?.fetchedData)
        }).catch((err) => {
            console.log(err)
        })
    }, [reload])

    // const Testimonials = [
    //     { user: 'Adam', message: 'Hello!! Good Service', id: 1 },
    //     { user: 'Arijith singh', message: 'Hello!! Good Service', id: 2 },
    //     { user: 'Shreya Ghoshal', message: 'Hello!! Good Service', id: 3 },
    //     { user: 'Sithara', message: 'Hello!! Good Service', id: 4 },
    //     { user: 'Adam', message: 'Hello!! Good Service', id: 5 },
    //     { user: 'Arijith singh', message: 'Hello!! Good Service', id: 6 },
    //     { user: 'Shreya Ghoshal', message: 'Hello!! Good Service', id: 7 },
    //     { user: 'Sithara', message: 'Hello!! Good Service', id: 8 },
    //     { user: 'Adam', message: 'Hello!! Good Service', id: 9 },
    //     { user: 'Arijith singh', message: 'Hello!! Good Service', id: 10 },
    //     { user: 'Shreya Ghoshal', message: 'Hello!! Good Service', id: 11 },
    // ]

    const tableHead = ['USER', 'MESSAGE']

    const router = useRouter()

    return (
        <div className="md:p-10 p-5 space-y-10 ">
            <div className='flex justify-between items-center  md:px-10'>
                <h3 className={`md:text-3xl font-bold   `}>Testimonials</h3>
                <Button name={'Add Testimonials'} color={'bg-green-700'} onclick={() => router.push('/testimonials/create')} />
            </div>
            <div className=''>
                <Table tableData={fetchedData} tableHead={tableHead} deleteApiEndpoint={'/deleteTestimonial'} reloadData={() => { setReload(!reload) }} />
            </div>
        </div>
    )
}

export default page