"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { primary_color } from '@/utils/colors'
import adminAxios from '@/axios/adminAxios'

function Table({ tableData, tableHead, deleteApiEndpoint, reloadData }) {

    const [currentPage, setCurrentPage] = useState(1);

    const router = useRouter()

    const itemsPerPage = 10;
    const totalPages = tableData?.length / 10
    const startingIndex = (currentPage - 1) * itemsPerPage;
    const endingIndex = startingIndex + itemsPerPage;

    const pathName = usePathname()
    const path = pathName.split('/')[1]


    const deleteFun = (id) => {
        adminAxios.delete(deleteApiEndpoint, { params: { id } }).then(res => {
            toast.success('item successfully deleted')
            reloadData()
        }).catch((err) => {
            console.log(err)
            toast.error('Failed to delete')
        })

    }

    return (
        // <!-- component -->
        <div className=" py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 ">
            <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css" />

            {/* search bar */}

            {/* <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
                <div className="flex justify-between">
                    <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
                        <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                            <div className="flex">
                                <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                                    <svg width="18" height="18" className="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </div>
                            <input type="text" className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px  border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search" />
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="align-middle inline-block min-w-full shadow-md overflow-hidden py-10 mb-20 bg-white md:px-8 pt-3 rounded-bl-lg rounded-br-lg ">
                <table className="min-w-full table-fixed ">
                    <thead className=''>
                        <tr className=''>
                            <th className={`px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-[#${primary_color}] tracking-wider`}>SLNO</th>
                            {tableHead?.map((item, index) => (

                                < th key={index} className={`px-6 py-3 border-b-2 border-gray-300 leading-4 text-[#${primary_color}]  tracking-wider text-center`} > {item}</th>

                            ))}
                            <th className={`px-6 py-3 border-b-2 border-gray-300 text-center  leading-4 text-[#${primary_color}] tracking-wider`}>ACTIONS</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white ">
                        {tableData?.slice(startingIndex, endingIndex > tableData?.length ? tableData.length : endingIndex)?.map((item, index) => (

                            <tr key={index} className='w-full border-b border-gray-500 '>
                                <td className="px-6 py-4 whitespace-no-wrap   text-center">
                                    <div className="flex items-center ">
                                        <div>
                                            <h1 className="text-sm leading-5 ">{startingIndex + index + 1}</h1>
                                        </div>
                                    </div>
                                </td>

                                {

                                    Object.keys(item).map((col, indx) => (
                                        tableHead?.includes(col.toUpperCase()) ?
                                            col === 'image' ?
                                                <td key={indx} className="px-6 py-4 whitespace-no-wrap  text-blue-900  text-sm leading-5 justify-center items-center ">
                                                    <div className='flex justify-center'>
                                                        <Image src={item.image} alt={item.image} width={100} height={100} className='lg:w-40 lg:h-24  rounded-lg  self-center' />
                                                    </div>
                                                    {/* <p className="px-6 py-4 whitespace-no-wrap text-blue-900  text-sm leading-5">{item.image}</p> */}
                                                </td> :
                                                <td key={indx} className="px-6 py-4 whitespace-no-wrap  text-center">
                                                    <div className="text-sm leading-5 text-blue-900">{item[col]}</div>
                                                </td> : null
                                    ))

                                }



                                <td className="px-6 py-4 whitespace-no-wrap text-center  text-sm leading-5 lg:space-x-3 space-y-3 ">
                                    <button onClick={() => router.push(`/${path}/${item._id}`)} className="px-4 py-2 border-blue-500 border text-blue-500 rounded-lg transition duration-300 hover:bg-blue-700  hover:text-white focus:outline-none ">Edit</button>
                                    <Modal id={item._id} btnName={'Delete'} component={'delete'} btnStyle={'px-4 py-2 border-red-500 border text-red-500 rounded-lg transition duration-300 hover:bg-red-700 hover:text-white'} onAccept={deleteFun} />
                                </td>



                            </tr>

                        ))}

                    </tbody>



                </table>


                <div className=" flex items-center justify-between mt-4 work-sans px-5">
                    <div>
                        <p className="text-sm leading-5 text-blue-700 space-x-2">
                            <span>Showing</span>
                            <span className="font-medium">{startingIndex + 1}</span>
                            <span>to</span>
                            <span className="font-medium">{endingIndex > tableData?.length ? tableData?.length : endingIndex}</span>
                            <span>of</span>
                            <span className="font-medium">{tableData?.length}</span>
                            <span>results</span>
                        </p>
                    </div>
                    <div>
                        <div className="relative z-0 inline-flex shadow-sm">
                            <div onClick={() => currentPage > 1 ? setCurrentPage(currentPage - 1) : null}>
                                <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous" >
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>

                            <div onClick={() => currentPage < totalPages ? setCurrentPage(currentPage + 1) : null}>
                                <a href="#" className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></script>

        </div >
    )
}

export default Table