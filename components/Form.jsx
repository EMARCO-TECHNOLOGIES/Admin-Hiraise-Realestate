"use client"

import { Field, Formik } from 'formik'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Button from './Button'
import axios from 'axios'
import { baseUrl } from '@/utils/baseUrl'
import adminAxios from '@/axios/adminAxios'
import LoadingComponent from './LoadingComponent'
import Upload from './Upload'





function Form({ editDataApiEndPoint, inputFields, endPoint, }) {

    const pathName = usePathname()
    const [editData, setEditData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [img, setImg] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [photos, setPhotos] = useState('')
    const [allPhotos, setAllPhotos] = useState('')
    const [reload, setReload] = useState(false)


    const id = pathName.split('/')[2]

    useEffect(() => {
        if (pathName.split('/')[2] != 'create') {

            setLoading(true)
            adminAxios.get(`/${editDataApiEndPoint}`, { params: { id } }).then((res) => {
                setEditData(res?.data?.fetchedData)
                setImg(res?.data?.fetchedData?.photos)

                if (pathName.split('/')[1] === 'properties') {

                    setPhotos(res?.data?.fetchedData?.photos)
                    setAllPhotos(res?.data?.fetchedData?.photos)
                } else {
                    setPhotos({ url: res?.data?.fetchedData?.image, publicId: res?.data?.fetchedData?.image_public_id })
                    setAllPhotos({ url: res?.data?.fetchedData?.image, publicId: res?.data?.fetchedData?.image_public_id })
                }
            }).catch((err) => {
                console.log(err)
            }).finally(
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            )
        }

    }, [reload])



    const generateInitialValues = () => {
        const initialValues = {};

        inputFields.forEach((item) => {
            const propertyName = item?.name?.toLowerCase();
            initialValues[propertyName] = editData ? editData[propertyName] : ''
        });
        return initialValues;
    };



    const path = pathName.split('/')[2]
    const isPropertyRoute = pathName.split('/')[1]


    const router = useRouter()
    return (
        <div className=" overflow-x-hidden overflow-y-auto h-modal md:h-full md:top-4 top-2 left-0 right-0 md:inset-0 z-50 pb-10 ">
            <div className="relative w-full  px-4 h-full md:h-auto space-y-5 mb-10">
                <div className='w-full flex justify-end'>
                    <Button name={'Back'} color={'bg-red-700'} onclick={() => router.back()} />
                </div>
                {isLoading ?
                    <LoadingComponent /> :

                    <div className="bg-white rounded-lg shadow-lg relative dark:bg-gray-700 lg:w-full flex justify-center items-center">

                        <div className='w-full'>

                            <Formik
                                initialValues={generateInitialValues()}
                                validate={(values, event) => {
                                    const errors = {}
                                    inputFields.forEach((item, index) => {

                                        if (item.name === 'Image') {
                                            if (imgUrl.length === 0) {
                                            }

                                        } else {
                                            if (!values[item.name.toLowerCase()]) {
                                                errors[item.name.toLowerCase()] = `${item.name} is Required`
                                            }
                                        }


                                    })
                                    return errors
                                }}

                                onSubmit={(values) => {


                                    try {

                                        if (isPropertyRoute === 'properties' && allPhotos.length === 0 || isPropertyRoute != 'properties' && isPropertyRoute != 'testimonials' && !values.image) {
                                            toast.error('Upload atleast one photo to create property')

                                        } else {



                                            setLoading(true)
                                            const formData = new FormData();
                                            Object.keys(values).map((item, index) => {
                                                if (item === 'images') {
                                                    values[item].forEach((image, i) => {
                                                        formData.append(`images`, image);
                                                    });
                                                } else {
                                                    formData.append(item, values[item]);
                                                }
                                            });

                                            axios.post(`${baseUrl}${endPoint}`, values, {
                                                params: editData ? { id: id, photos: allPhotos } : { photos: allPhotos },

                                            })
                                                .then((res) => {
                                                    if (res.data.success === true) {

                                                        toast.success(path === 'create' ? `${pathName.split('/')[1]} added successfully` : `${pathName.split('/')[1]} updated successfully`)
                                                        setTimeout(() => {
                                                            router.back()
                                                        }, 700);

                                                    } else {
                                                        toast.error(res.data.message)

                                                    }

                                                }).catch((err) => {
                                                    console.log(err)
                                                    setLoading(false)


                                                })
                                        }

                                    } catch (err) {
                                        console.log(err)
                                    }

                                }}


                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue
                                }) => (
                                    <form className="space-y-6 px-6 lg:p-8 pb-4  sm:pb-6 xl:pb-8 flex flex-col justify-center" onSubmit={handleSubmit} >
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white ">{path === 'create' ? `Create new ${pathName.split('/')[1].charAt(0).toUpperCase()}${pathName.split('/')[1].slice(1)}` : `Update ${pathName.split('/')[1].charAt(0).toUpperCase()}${pathName.split('/')[1].slice(1)}`}</h3>
                                        <div className={`grid ${pathName.split('/')[1] === 'properties' ? 'md:grid-cols-2' : 'md:grid-cols-1 w-1/3'} gap-10`}>

                                            {inputFields?.map((field, indx) => (

                                                field.type === 'file' ? (
                                                    field.name === 'Image' ?

                                                        isPropertyRoute === 'properties' ?
                                                            <div className='grid md:grid-cols-3 gap-5'>
                                                                <Upload photos={photos ? photos[0] : null} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} />
                                                                <Upload photos={photos ? photos[1] : null} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} />
                                                                <Upload photos={photos ? photos[2] : null} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} />
                                                                <Upload photos={photos ? photos[3] : null} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} />
                                                                <Upload photos={photos ? photos[4] : null} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} />
                                                                <Upload photos={photos ? photos[5] : null} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} />

                                                            </div>
                                                            :
                                                            <Upload photos={photos} setPhotos={setPhotos} itemId={id} setReload={setReload} reload={reload} setAllPhotos={setAllPhotos} allPhotos={allPhotos} setImg={setImg} setFieldValue={setFieldValue} />

                                                        :

                                                        <div>

                                                            <ImageUpload count={field.count} imgUrl={imgUrl} setImgUrl={setImgUrl} />
                                                        </div>
                                                ) : field.type === 'textArea' ? (
                                                    <div key={indx} className='text-xs text-red-500 '>
                                                        <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">{field.name}</label>
                                                        <textarea rows="4" cols="50" name={field.name.toLowerCase()} id={field.name.toLowerCase()} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            placeholder={field.name} required=""
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            defaultValue={values[field.name.toLowerCase()]}
                                                        />
                                                        {errors[field.name.toLowerCase()] && touched[field.name.toLowerCase()] && errors[field.name.toLowerCase()]}

                                                    </div>
                                                ) : (
                                                    <div key={indx} className='text-xs text-red-500 '>
                                                        <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">{field.name}</label>
                                                        <input type={field.type} name={field.name.toLowerCase()} id={field.name.toLowerCase()} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            placeholder={field.name} required=""
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            defaultValue={values[field.name.toLowerCase()]}
                                                        />
                                                        {errors[field.name.toLowerCase()] && touched[field.name.toLowerCase()] && errors[field.name.toLowerCase()]}

                                                    </div>
                                                )

                                            ))}
                                        </div>

                                        <div className=' flex justify-end items-end'>

                                            {isSubmit === true ? <LoadingComponent /> :
                                                <button type="submit" className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>{isLoading ? `Loading..${isLoading}` : path === 'create' ? 'Create' : 'Update'}</button>
                                            }
                                        </div>

                                    </form>
                                )}
                            </Formik>
                        </div>


                    </div >
                }

            </div >
        </div >
    )
}

export default Form