'use client'
import { toTitleCase } from '@/app/actions/textAction'
import LineThrough from '@/app/components/LineThrough'
import { setSelectedProduct } from '@/app/reducers/productReducer'
import { selectSearch, setIsOpen } from '@/app/reducers/uiReducer'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@mui/material'
import moment from 'moment'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'



function ProductTable({products, right}: {products:any[], right:any}) {
    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                        <td scope="col" className="text-xs font-semibold px-1 border-l-0">
                            S/N
                        </td>
                        <th scope="col" className="text-xs py-2">
                            Barcode
                        </th>
                    
                        <th scope="col" className="text-xs">
                            Product
                        </th>
                        <th scope="col" className="text-xs">
                            Category
                        </th>
                    
                        
                        <th scope="col" className="text-xs bg-red-50 text-center">
                           Expire
                        </th>
                        <th scope="col" className="text-xs bg-green-50">
                            <LineThrough/> Price
                        </th>
                        <th scope="col" className="text-xs">
                            In Stock
                        </th>
                        <th scope="col" className="text-xs">
                            Office
                        </th>
                        <th scope="col" className="text-xs">
                            Stock Status
                        </th>
                        {
                            right == 'Admin' ?
                            <th scope="col" className="text-xs text-center">
                                Actions
                            </th> 
                            :
                            <></>
                        }
                        {/* 
                        <th scope="col" className="text-xs">
                            Date joined
                        </th> 
                        <th scope="col" className="text-xs text-center"> 
                            Action
                        </th>*/}
                    </tr>
                </thead>
                
                <tbody>
                    {
                        products?.filter((item:any) =>{
                            if(search == '') {
                                return item
                            }else if(item?.barcode?.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }else if(item?.productName?.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }else if(item?.category.categoryName?.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }else if(item?.expireDate?.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }else if(item?.sellingPrice?.toString().includes(search.toString())){
                                return item
                            }else if(item?.cartonQty?.toString().includes(search.toString())){
                                return item
                            }else if(item?.store?.storeName?.toLowerCase().includes(search.toLowerCase())){
                                return item
                            }
                        })
                        ?.flatMap((item:any, index:number) => {
                            return (
                                <Fragment key={(index+4)*6}>
                                    <tr
                                        className='text-sm border-b hover:bg-gray-100 '
                                    >
                                        <td className='text-success'>
                                            {index+1}
                                        </td>
                                        <td className=" font-medium text-gray-900 dark:text-white">
                                            {toTitleCase(item?.barcode)}
                                        </td>
                                        <td className="line-clamp-1 p-1">
                                            {item?.productName}
                                        </td>
                                        <td className="">
                                            {item?.category?.categoryName}
                                        </td>
                                        <td className="line-clamp-1 p-1 bg-red-50">
                                            { moment(item?.expireDate).format('LL')}
                                        </td>
                                        <td className="text-right pr-2 bg-green-50">
                                        <div className='flex justify-between'>
                                            <p className='text-red-500'> {item?.costPrice?.toLocaleString()}</p>
                                            <p className='text-right text-black'> {item?.sellingPrice?.toLocaleString()}</p>

                                        </div>
                                        </td>
                                        <td className=" text-center">
                                            {item?.cartonQty}
                                        </td>
                                        <td className="line-clamp-1 p-1">
                                            {item?.store?.storeName}
                                        </td>
                                        <td className="">
                                            <span
                                                className={`${item?.status == 'Open' ? 'text-primary' : ''} ${item?.cartonQty > 1 ? 
                                                    'bg-primary text-white-light rounded text-xs px-1': 'bg-red-500 text-white-light rounded text-xs px-1'}`}
                                            >
                                                {item?.cartonQty > 1 ? 'In' : 'Out'}
                                            </span>
                                        </td>
                                        {
                                            right == 'Admin' || right == 'Manager' ?
                                            <td className="">
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
                                                            dispatch(setSelectedProduct(item))
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
                products.length <1 ? 
                
                <div
                    className='w-full items-center flex justify-center text-sm py-4 text-red-500'
                >
                    <p>No Data Availabe In Table</p>
                </div>
                : ''
            }
                
            
        </div>
    )
}

export default ProductTable