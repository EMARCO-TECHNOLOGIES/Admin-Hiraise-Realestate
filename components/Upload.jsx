"use client"

import adminAxios from '@/axios/adminAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import LoadingComponent from './LoadingComponent';
import { usePathname } from 'next/navigation';

function Upload({ photos, itemId, reload, setReload, setAllPhotos, allPhotos, setFieldValue }) {

    const pathName = usePathname()
    const path = pathName.split('/')[1]

    const [uploadedImages, setUploadedImages] = useState(photos)
    const [isLoading, setLoading] = useState(false)

    const handleImg = (event) => {
        const img = event.target.files[0]

        const formData = new FormData()
        formData.append("image", img)
        setLoading(true)
        adminAxios.post('/uploadPhoto', formData).then((res) => {
            if (res.data.success) {
                toast.success('Photo uploaded successfully')
                setUploadedImages({ url: res?.data?.imageUrl.url, publicId: res?.data?.imageUrl.public_id })
                path === 'properties' ?
                    setAllPhotos([...allPhotos, { url: res?.data?.imageUrl.url, publicId: res?.data?.imageUrl.public_id }])
                    :
                    setFieldValue("image", { url: res?.data?.imageUrl.url, publicId: res?.data?.imageUrl.public_id })
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)

        })
    }

    const removePhoto = (publicId) => {
        setLoading(true)
        adminAxios.post('/removePhoto', { publicId: publicId, itemId: itemId, route: path }).then((res) => {
            if (res.data.success) {
                toast.success('Photo removed')
            } else {
                toast.error(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
            setReload(!reload)

        })
    }

    return (
        <div >
            {isLoading ? <LoadingComponent /> :
                uploadedImages && uploadedImages.url !== null ?


                    <div className="flex w-full h-full items-center justify-center bg-grey-lighter">
                        <label className="w-64 relative  flex flex-col items-center px-2 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-400">
                            <img src={uploadedImages.url} alt={uploadedImages.url} className='w-64 h-28 object-fill' />
                            <span className='hover:text-red-600 text-orange-300 absolute right-5 top-3' onClick={() => removePhoto(uploadedImages.publicId)}><FontAwesomeIcon icon={faTrash} /></span>
                        </label>
                    </div>


                    :
                    <div className='space-y-4'>


                        <div className="flex  w-full h-full items-center justify-center bg-grey-lighter ">
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-400">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 leading-normal text-[10px]">Select a file</span>
                                <input type='file' className="hidden" name='image' id={`image`} onChange={(event) => handleImg(event)} />
                            </label>
                        </div>
                        <p className='text-yellow-600 text-xs text-center px-3'>* Upload file size maximum: 10 MB</p>

                    </div>
            }


        </div>
    )
}

export default Upload