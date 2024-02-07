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





function Form({ editDataApiEndPoint, inputFields, endPoint, }) {

    const pathName = usePathname()
    const [editData, setEditData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [img, setImg] = useState('')
    const [photos, setPhotos] = useState([])

    const id = pathName.split('/')[2]

    useEffect(() => {
        if (pathName.split('/')[2] != 'create') {

            setLoading(true)
            adminAxios.get(`/${editDataApiEndPoint}`, { params: { id } }).then((res) => {
                setEditData(res?.data?.fetchedData)
                setImg(res?.data?.fetchedData?.image)
            }).catch((err) => {
                console.log(err)
            }).finally(
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            )
        }

    }, [])


    const handleImage = (setFieldValue, event) => {


        if (event.target.files && event.target.files[0]) {
            if (event.target.files.length === 1) {

                console.log(typeof (event.target.files), '{{{{{{{{{{', event.target.files.length)
                setImg(URL.createObjectURL(event.target.files[0]));
                setFieldValue("image", event.target.files[0])

            } else {

                const images = []
                for (let index = 0; index < event.target.files.length; index++) {
                    images.push(URL.createObjectURL(event.target.files[index]))
                }
                setPhotos(images);
                console.log(images, '||||||||||||||||', photos)
            }

        }
    }

    console.log(photos, 'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKk')
    const generateInitialValues = () => {
        const initialValues = {};

        inputFields.forEach((item) => {
            const propertyName = item?.name?.toLowerCase();
            initialValues[propertyName] = editData ? editData[propertyName] : ''
        });
        return initialValues;
    };



    const path = pathName.split('/')[2]

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
                                // initialValues={{ name: data ? data?.name : '', image: ''}}
                                initialValues={generateInitialValues()}
                                validate={(values, event) => {
                                    const errors = {}
                                    inputFields.forEach((item, index) => {

                                        if (item.name === 'Image') {
                                            if (!values.image || !img) {
                                                errors.image = 'Upload photo to continue'
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
                                    console.log(values, ':::::::::::::::')
                                    setLoading(true)
                                    console.log('After setLoading(true):', isSubmit);

                                    try {

                                        const formData = new FormData();
                                        Object.keys(values).map((item, index) => {
                                            formData.append(item, values[item]);

                                        })

                                        axios.post(`${baseUrl}${endPoint}`, formData ? formData : values, {
                                            params: editData ? { id: id } : null,

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

                                            })
                                    } catch (err) {
                                        console.log(err)
                                    } finally {
                                        setIsSubmit(false)
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
                                    <form className="space-y-6 px-6 lg:p-8 pb-4  sm:pb-6 xl:pb-8 flex flex-col justify-center" onSubmit={handleSubmit}  >
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white ">{path === 'create' ? `Create new ${pathName.split('/')[1].charAt(0).toUpperCase()}${pathName.split('/')[1].slice(1)}` : `Update ${pathName.split('/')[1].charAt(0).toUpperCase()}${pathName.split('/')[1].slice(1)}`}</h3>
                                        <div className={`grid ${pathName.split('/')[1] === 'properties' ? 'md:grid-cols-2' : 'md:grid-cols-1 w-1/3'} gap-10`}>

                                            {inputFields?.map((field, indx) => (

                                                field.type === 'file' ? (
                                                    <div key={indx} className="grid grid-cols-1 gap-x-5 text-xs text-red-500 ">
                                                        {


                                                            img ? (
                                                                // field.name === 'Image' ? (
                                                                <div className='relative flex flex-col justify-center space-y-5 '>
                                                                    <img src={img} width={300} height={300} alt={values.image} className='w-[400px] h-40 object-cover ' />
                                                                    <span onClick={() => setImg('')} className='  font-bold cursor-pointer' title='remove Photo'>Remove Photo</span>
                                                                </div>
                                                                //     ) : (


                                                                //     <div className='relative grid grid-cols-3 gap-2 p-5 '>
                                                                //         {photos.map((item, imgIndex) => (
                                                                //             <>
                                                                //                 {/* {console.log(item)} */}
                                                                //                 <img src={item} width={300} height={300} alt={item} className='w-[200px] h-32 object-contain ' />
                                                                //                 <p onClick={() => photos.pop([imgIndex])} className='  font-bold cursor-pointer' title='remove Photo'>x</p>
                                                                //             </>

                                                                //         ))}
                                                                //     </div>
                                                                // )


                                                            ) : (
                                                                <div key={indx} className=''>
                                                                    <label className="text-sm font-bold text-gray-500 tracking-wide">Attach {field.name}</label>
                                                                    <div className="flex items-center justify-center w-full">
                                                                        <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                                                            <div className="h-full w-full text-center flex flex-col items-center justify-center   ">
                                                                                <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                                                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                                                                                </div>
                                                                                <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                                                            </div>
                                                                            <div className=' '>

                                                                                <input type="file" name={field.name.toLowerCase()} id='image' className="hidden"
                                                                                    onChange={(event) => handleImage(setFieldValue, event)}
                                                                                    onBlur={handleBlur}
                                                                                    value={img}
                                                                                    multiple={field.name === 'Multiple Photos' ? true : false}
                                                                                />
                                                                            </div>

                                                                        </label>
                                                                    </div>
                                                                    <span className='block text-yellow-600'>*Note: Upload landscape images for better view</span>
                                                                    {errors.image && touched.image && errors.image}
                                                                    {/* {errors[field.name.toLowerCase()] && touched[field.name.toLowerCase()] && errors[field.name.toLowerCase()]} */}

                                                                </div>
                                                            )}
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
                                                // null
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