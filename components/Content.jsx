import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

function Content() {
    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className=" w-full">

                </div>
            </div>


        </div>
    )
}

export default Content