import React from 'react'

function LoadingComponent() {
    return (
        <div className='flex flex-col justify-center items-center h-full text-[10px] space-y-2 '>

            <div className='flex justify-center items-center h-full space-x-2'>
                <div className='w-1 h-1 border-blue-500 border-2 animate-spin rounded-[1px] bg-blue-500' />
                <div className='w-2 h-2 border-red-500 border-2 animate-spin rounded-sm bg-red-500' />
                <div className='w-3 h-3 border-yellow-500 border-2 animate-spin rounded-sm bg-yellow-500' />
                <div className='w-4 h-4 border-[#C3A67D] border-2 animate-spin rounded-sm bg-[#C3A67D] ' />
            </div>
            <p >Please wait..</p>
        </div>

    )
}

export default LoadingComponent