'use client'
import SearchInput from '@/app/components/SearchInput'
import React from 'react'

function OrderHeader() {
    return (
        <div
            className='py-4 flex md:flex-row flex-col gap-y-4 md:gap-y-0 items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
        >
            <p
                className='text-lg font-semibold text-black'
            >
            Order Lists
            </p>   
            <div
                className='flex-1 mx-4'
            >
                <SearchInput 
                    setSearh={() => {}} 
                    placeholder='Search by... (orderid, customer, total, payable, payment, status, cashier)'
                />
            </div>             
        </div>
    )
}

export default OrderHeader