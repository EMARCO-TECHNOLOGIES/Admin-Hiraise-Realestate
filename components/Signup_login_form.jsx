"use client"


import React from 'react'
import { Formik } from 'formik'
import adminAxios from '@/axios/adminAxios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

function Login_Signup_form({ initialValues, endPoint, inputFields, formName }) {

    const router = useRouter()

    return (
        <Formik

            initialValues={initialValues}

            validate={(values) => {
                const errors = {}

                if (!values.username) {
                    errors.username = 'Enter username'
                } else if (values.username.length < 4) {
                    errors.username = 'Username is too short'
                }
                if (!values.password) {
                    errors.password = 'Enter Password'
                }

                return errors
            }}

            onSubmit={(values) => {

                adminAxios.post(endPoint, values).then((res) => {
                    if (res.data.success) {
                        toast.success(res?.data?.message)
                        if (formName === 'Register') {
                            router.push('/login')
                        } else {
                            Cookies.set('userToken', res.data.userId)
                            router.push('/banner')
                        }
                    } else {
                        toast.error(res?.data?.message)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }}

        >
            {({
                errors,
                touched,
                handleChange,
                handleSubmit,
            }) => (

                <form method="post" action="#" onSubmit={handleSubmit} >
                    <h1 className=" text-2xl font-bold">{`${formName} Admin here`}</h1>

                    {inputFields.map((field, index) => (

                        <div className="mb-6 mt-6 text-red-500 text-xs" key={index}>
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor={field.name}
                            >
                                {field.name}
                            </label>
                            <input
                                className="text-sm bg-gray-200 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10"
                                name={field.name.toLowerCase()}
                                id={field.name}
                                type={field.type}
                                placeholder={`Enter ${field.name}`}
                                onChange={handleChange}
                            />
                            {errors[field.name.toLowerCase()] && touched[field.name.toLowerCase()] && errors[field.name.toLowerCase()]}


                        </div>
                    ))}

                    <div className="flex w-full mt-8">
                        <button
                            className="w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10"
                            type='submit'
                        >
                            {formName === 'Login' ? 'Login Admin' : 'Register Admin'}
                        </button>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default Login_Signup_form