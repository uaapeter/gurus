'use client'
import { toTitleCase } from '@/app/actions/textAction'
import { setSelectedStore } from '@/app/reducers/storeReducer'
import {  setIsOpen } from '@/app/reducers/uiReducer'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, } from 'react-redux'



function StoreTable({stores}: {stores:any[]}) {
    const dispatch = useDispatch()
    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                           
                        <th scope="col" className="px-6 text-xs py-2">
                            Name
                        </th>
                    
                        <th scope="col" className="px-6 text-xs text-center">
                            Location
                        </th>
                        <th scope="col" className="px-6 text-xs">
                            Manager
                        </th>
                    
                        
                        <th scope="col" className="px-6 text-xs text-right bg-orange-50">
                           Phone
                        </th>
                        <th scope="col" className="px-6 text-xs bg-green-50">
                            Status
                        </th>
                        
                        <th scope="col" className="px-6 text-xs">
                            Action
                        </th> 
                        {/* 
                        <th scope="col" className="px-6 text-xs">
                            Date joined
                        </th> 
                        <th scope="col" className="px-6 text-xs text-center"> 
                            Action
                        </th>*/}
                    </tr>
                </thead>
                
                <tbody>

                    {
                        stores?.flatMap((item:any, index:number) => {
                            return (
                                <Fragment key={(index+4)*6}>
                                    <tr
                                        className='text-sm border-b hover:bg-gray-100 '
                                    >
                                        <td scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {toTitleCase(item?.storeName)}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.location?.locationName}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.manager?.fullName}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.storePhone}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <p
                                                className={`${item?.status == 'Open' ? 'text-primary' : 'text-red-500'}`}
                                            >
                                                {item?.status}
                                            </p>
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <div
                                                className='flex items-center justify-center space-x-2'
                                            >
                                                <IconButton 
                                                    size='medium'
                                                    onClick={() => {
                                                        // dispatch(setSelectedStore(item))
                                                        // dispatch(setIsOpen(true))
                                                    }}
                                                >
                                                    <TrashIcon className='w-4' />
                                                </IconButton>
                                                <IconButton 
                                                    size='medium'
                                                    onClick={() => {
                                                        dispatch(setSelectedStore(item))
                                                        dispatch(setIsOpen(true))
                                                    }}
                                                >
                                                    <PencilIcon className='w-4' />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                    
                </tbody>
                
            </table>
            {
                stores.length <1 ? 
                
                <div
                    className='w-full items-center flex justify-center text-sm py-4'
                >
                    <p>No Data Availabe In Table</p>
                </div>
                : ''
            }
                
            
        </div>
    )
}

export default StoreTable