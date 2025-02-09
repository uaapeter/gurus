'use client'
import { toTitleCase } from '@/app/actions/textAction'
import moment from 'moment'
import React, { Fragment } from 'react'

function ExpiredTable({ products}: { products:any[]}) {
    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                        <td scope="col" className="text-xs font-semibold px-1 border-l-0">
                            S/N
                        </td>
                        <th scope="col" className="text-xs">
                           Barcode
                        </th>
                        <th scope="col" className="text-xs py-2">
                            Product
                        </th>
                        <th>Category</th>
                        <th scope="col" className="text-xs text-center">
                           Stock Qty
                        </th>
                        <th scope="col" className="text-xs">
                           Supplier
                        </th>
                        <th scope="col" className="text-xs">
                           Expiry Date
                        </th>
                        <th scope="col" className="text-xs">
                           Price
                        </th>
                       
                        <th scope="col" className="text-xs bg-green-50">
                            Store
                        </th>
                        <th scope="col" className="text-xs">
                            Status
                        </th> 
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
                    products?.flatMap((item:any, index:number) => {
                        return (
                            <Fragment key={(index+4)*6}>
                                <tr
                                    className='text-sm border-b hover:bg-gray-100 '
                                >
                                    <td className='text-success'>
                                        {index+1}
                                    </td>
                                    <td scope="row" className="font-medium py-2 text-gray-900 whitespace-nowrap dark:text-white-light">
                                        {toTitleCase(item?.barcode)}
                                    </td>
                                    <td>
                                        {item?.productName}
                                    </td>
                                    <td>
                                        {item?.category?.categoryName}
                                    </td>
                                    <td className='text-red-500 text-center'>
                                        {item?.cartonQty}
                                    </td>
                                    <td>
                                        {item?.supplier?.supplierName}
                                    </td>
                                    <td className="text-center bg-red-50">
                                        { moment(item?.expireDate).format('LL')}
                                    </td>
                                    <td className="text-right pr-2 bg-green-50">
                                       <div className='flex justify-between'>
                                        <p className='text-red-500'> {item?.costPrice?.toLocaleString()}</p>
                                        <p className='text-right text-black'> {item?.sellingPrice?.toLocaleString()}</p>

                                       </div>
                                    </td>
                                    {/* <td className="text-left">
                                        {item?.cartonQty}
                                    </td> */}
                                    <td className="">
                                        {item?.store?.storeName}
                                    </td>
                                    <td className="text-center">
                                        <span
                                            className={`${item?.status == 'Open' ? 'text-primary' : ''} ${item?.cartonQty > 1 ? 
                                                'bg-primary text-white-light rounded text-xs px-1': 'bg-red-500 text-white-light rounded text-xs px-1'}`}
                                        >
                                            {item?.cartonQty > 1 ? 'In stock' : 'Out Stock'}
                                        </span>
                                    </td>
                                    {/* {
                                        right == 'Admin' ?
                                        <td className="text-center">
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
                                    } */}
                                </tr>
                            </Fragment>
                        )
                    })
                }
                </tbody>
                
            </table>
            {
                products?.length <1 ? 
                
                <div
                    className='w-full items-center flex justify-center text-sm py-4'
                >
                    <p className='text-red-500'>No Records Found</p>
                </div>
                : ''
            }
                
            
        </div>
    )
}

export default ExpiredTable