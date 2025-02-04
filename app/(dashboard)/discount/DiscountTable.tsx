'use client'
import { toTitleCase } from '@/app/actions/textAction'
import { setSelectedCategory } from '@/app/reducers/categoryReducer'
import { setIsOpen } from '@/app/reducers/uiReducer'
import { LockClosedIcon, LockOpenIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@mui/material'
import moment from 'moment'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'



function DiscountTable({ right, discounts}: { right: any, discounts:any[]}) {
    const dispatch = useDispatch()
    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                        <td scope="col" className="text-xs font-semibold px-1 border-l-0 text-success">
                            S/N
                        </td>
                        <th scope="col" className="px-6 text-xs py-2">
                            Discount Name
                        </th>
                        <th scope="col" className="px-6 text-xs py-2">
                            Discount Percentage (%)
                        </th>
                    
                        <th scope="col" className="px-6 text-xs text-center">
                            Created At
                        </th>
                        
                        {
                            right == 'Admin' ?
                            <th scope="col" className="px-6 text-xs">
                                Action
                            </th> 
                            :
                            <></>
                        }
                    </tr>
                </thead>
                
                <tbody>
                {
                        discounts?.flatMap((item:any, index:number) => {
                            return (
                                <Fragment key={(index+4)*6}>
                                    <tr
                                        className='text-sm border-b hover:bg-gray-100'
                                    >
                                        <td className='text-success'>
                                            {index+1}
                                        </td>
                                        <td scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {toTitleCase(item?.discountName)}
                                        </td>
                                        <td scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item?.discountValue}
                                        </td>
                                        
                                        <td className="px-2 py-3 text-center">
                                            { moment(item?.createdAt).format('LL')}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            { 
                                                item?.status ?
                                                <LockOpenIcon className='w-5 text-success' />
                                                :
                                                <LockClosedIcon className='w-5 text-red-500' />
                                            
                                            }
                                        </td>
                                       
                                        {
                                            right == 'Admin' || right == 'Manager' ?
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
                                                        <TrashIcon className='w-4 text-red-500' />
                                                    </IconButton>
                                                    <IconButton 
                                                        size='medium'
                                                        onClick={() => {
                                                            dispatch(setSelectedCategory(item))
                                                            dispatch(setIsOpen(true))
                                                        }}
                                                    >
                                                        <PencilIcon className='w-4' />
                                                    </IconButton>
                                                </div>
                                            </td>
                                            :
                                            <></>
                                        }
                                    </tr>
                                </Fragment>
                            )
                        })
                    }
                </tbody>
                
            </table>
            {
                discounts?.length <1 ? 
                
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

export default DiscountTable