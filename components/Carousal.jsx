"use client"


import React, { useState } from 'react'
import Carousel from '@itseasy21/react-elastic-carousel';
import Image from 'next/image';
import Button from './Button';

function Carousal({ items, itemsToShow, propertyId, openClose }) {


    const breakPoints = [
        { width: 100, itemsToShow: 1 },
        { width: 800, itemsToShow: 3 },
        // { width: 850, itemsToShow: 3 },
        // { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
        // { width: 1450, itemsToShow: 5 },
        // { width: 1750, itemsToShow: 1 },
    ]


    const customPagination = ({ pages, activePage, onClick }) => {
        return (
            <div className='flex' style={{ flexDirection: 'row' }}>
                {pages.map(page => {
                    const isActivePage = activePage === page;
                    return (
                        <div
                            key={page}
                            onClick={() => onClick(page)}
                            className={`${isActivePage ? 'bg-yellow-900' : 'bg-slate-500'} mx-2 h-[3px] w-5 bg-opacity-30 mt-5 `}
                        />
                    );
                })}
            </div>
        );
    };

    const customArrow = ({ type, onClick, isEdge }) => {
        return (
            <button
                onClick={onClick}
                disabled={isEdge}
                className={`absolute z-10 ${type === 'PREV' ? 'left-4 top-1/2 transform -translate-y-1/2' : 'right-4 top-1/2 transform -translate-y-1/2 rotate-180'}`}
            >
                <img src="/carousal button.png" alt="" className='w-20' />
            </button>
        );
    };





    return (
        <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-40 flex flex-col items-center justify-center'>
            <div className='lg:w-2/3 w-full relative flex flex-col bg-gray-300 lg:p-10 md:p-5 md:py-0 py-5 rounded-lg'>
                <Button name={'Close'} color={'bg-red-600 text-white self-end mr-10 shadow-lg'} onclick={() => openClose(null)} />

                <Carousel
                    renderArrow={customArrow}
                    renderPagination={customPagination}
                    itemsToShow={itemsToShow}
                    enableMouseSwipe={true}
                    enableSwipe={true}
                    className='flex content-center rounded-md overflow-hidden'
                >
                    {items?.map((item, index) => (
                        <div key={index} className='flex flex-col justify-center items-center m-5 space-y-4'>

                            <Image src={item.url} width={800} height={800} className={`object-cover md:w-[700px] h-96  rounded-3xl shadow-2xl`} alt='img' />
                        </div>
                    ))}
                </Carousel>
            </div>

        </div>

    )
}

export default Carousal