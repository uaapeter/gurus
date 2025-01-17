'use client'
import { toTitleCase } from '@/app/actions/textAction'
import { selectIsLoading, setIsOpen } from '@/app/reducers/uiReducer'
import { setSelectedUser } from '@/app/reducers/userReducer'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { CircularProgress, IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector, } from 'react-redux'



function UserTable({users}: {users:any[]}) {
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                        <td scope="col" className="text-xs font-semibold px-1 border-l-0">
                            S/N
                        </td>
                        <th scope="col" className="px-6 text-xs py-2">
                            Name
                        </th>
                    
                        <th scope="col" className="px-6 text-xs text-center">
                            Username
                        </th>
                        <th scope="col" className="px-6 text-xs">
                           Phone
                        </th>
                    
                        <th scope="col" className="px-6 text-xs">
                            E-mail
                        </th>
                        <th scope="col" className="px-6 text-xs text-right bg-orange-50">
                           Role
                        </th>
                        <th scope="col" className="px-6 text-xs bg-green-50">
                            Store
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
                        users?.flatMap((item:any, index:number) => {
                            return (
                                <Fragment key={(index+4)*6}>
                                    <tr
                                        className='text-sm border-b hover:bg-gray-100'
                                    >
                                        <td
                                            className='text-success'
                                        >
                                            {index+1}
                                        </td>
                                        <td scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {toTitleCase(item?.fullName)}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.username}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.phoneNumber}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.emailAddress}
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            {item?.role}
                                        </td>
                                        
                                        <td className="px-2 py-3 text-center">
                                            {item?.store?.storeName}
                                        </td>
                                        
                                       
                                        
                                        
                                        {/* <td className="px-2 py-3 text-center">
                                            <p
                                                className={`${item?.status == 'Open' ? 'text-primary' : 'text-red-500'}`}
                                            >
                                                {item?.status}
                                            </p>
                                        </td> */}
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
                                                        dispatch(setSelectedUser(item))
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
                isLoading ?
                <div
                    className='w-full flex items-center justify-center'
                >
                    <CircularProgress color='success' />
                </div>
                :<></>
            }
            {
                users.length <1 && !isLoading ? 
                
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

export default UserTable