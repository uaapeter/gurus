'use client'
import { toTitleCase } from '@/app/actions/textAction'
import { setSelectedCategory } from '@/app/reducers/categoryReducer'
import { selectSearch, setIsOpen } from '@/app/reducers/uiReducer'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@mui/material'
import moment from 'moment'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'


function CategoryTable({ right, categories}: { right: any, categories:any[]}) {
    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                        <td scope="col" className="text-xs font-semibold px-1 border-l-0 text-success">
                            S/N
                        </td>
                        <th scope="col" className="px-6 text-xs py-2">
                            Category Name
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
                        categories?.filter((item:any) =>{
                            if(search == '') {
                                return item
                            }else if(item?.categoryName?.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }})
                        
                        ?.flatMap((item:any, index:number) => {
                            return (
                                <Fragment key={(index+4)*6}>
                                    <tr
                                        className='text-sm border-b hover:bg-gray-100'
                                    >
                                        <td className='text-success'>
                                            {index+1}
                                        </td>
                                        <td scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {toTitleCase(item?.categoryName)}
                                        </td>
                                        
                                        <td className="px-2 py-3 text-center">
                                            { moment(item?.createdAt).format('LL')}
                                        </td>
                                       
                                        {
                                            right == 'Admin' ?
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
                categories?.length <1 ? 
                
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

export default CategoryTable