'use client'
import LineThrough from '@/app/components/LineThrough'
import React, { Fragment, useRef, useState } from 'react'
import { toTitleCase } from '../actions/textAction'
import { EyeIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { IconButton } from '@mui/material'
import { useReactToPrint } from 'react-to-print'
import AppModalDialog from './AppModalDialog'
import Invoice from './Invoice'
import { setSelectedOrder } from '../reducers/orderReducer'
import { useDispatch } from 'react-redux'
import moment from 'moment'



function OrderTable({orders}: {orders:any[]}) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    
    const contentRef = useRef<HTMLDivElement>(null)
    const handlePrint = useReactToPrint({contentRef: contentRef})  
    
    return (
        <div className="relative overflow-x-auto py-4">
            <AppModalDialog
                open={open}
                title='Invoice'
                setOpen={() =>{
                    setOpen(false)
                    dispatch(setSelectedOrder([]))
                }}
                className='max-w-7xl'
                onClick={() =>handlePrint()}
                btnTitle={
                    <div
                        className='flex items-center text-white-light'
                    >
                        <PrinterIcon className='w-4' />
                        <p>Print</p>
                    </div>
                }
            >
                <Invoice ref={contentRef} />
            </AppModalDialog>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                        <td scope="col" className="text-xs font-semibold px-1 border-l-0 py-2">
                            S/N
                        </td>
                        <th scope="col" className="text-xs">
                            Order Id
                        </th>
                    
                        <th scope="col" className="text-xs">
                            Customer
                        </th>
                        {/* <th scope="col" className="text-xs">
                            Phone/Email
                        </th> */}
                        <th scope="col" className="text-xs text-center bg-green-50">
                          Total<LineThrough /> 
                        </th>
                        
                        <th scope="col" className="text-xs text-center bg-green-50">
                          (%)
                        </th>
                        <th scope="col" className="text-xs text-center bg-red-50">
                            Payable<LineThrough />
                        </th>
                        <th scope="col" className="text-xs bg-green-50 text-center">
                            Paid<LineThrough /> 
                        </th>
                        <th scope="col" className="text-xs text-center">
                            Payment
                        </th>
                        <th scope="col" className="text-xs">
                            Date
                        </th>
                        <th scope="col" className="text-xs text-center">
                            Status
                        </th>

                        <th scope="col" className="text-xs">
                           Cashier
                        </th>                        
                        <th scope="col" className="text-xs text-center">
                            Action
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
                        orders?.flatMap((item:any, index:number) => {
                            return (
                                <Fragment key={(index+4)*6}>
                                    <tr
                                        className='text-sm border-b hover:bg-gray-100 '
                                    >
                                        <td className='text-success'>
                                            {index+1}
                                        </td>
                                        <td 
                                            scope="row" 
                                            onClick={() => {
                                                dispatch(setSelectedOrder(item)) 
                                                setOpen(!open)
                                            }}
                                            className="py-2 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900 cursor-pointer">
                                            {item?.orderId}
                                        </td>
                                        <td className="py-3">
                                            {toTitleCase(item?.customer?.customerName?item?.customer?.customerName: 'Guest')}
                                        </td>
                                        <td className="py-3 text-center bg-green-50">
                                            {item?.amount?.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-center">
                                            {item?.discount > 0? item?.discount : <></>}
                                        </td>
                                        <td className="py-3 text-center bg-red-50">
                                            {(item?.amount)?.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-center bg-green-50">
                                            {item?.totalPaid?.toLocaleString()}
                                        </td>
                                        <td className="py-3 text-center">
                                            {item?.paymentMethod}
                                        </td>
                                        <td className="py-3 ">
                                           
                                            {`${ moment(item?.createdAt).format('MMM Do YY')}`}
                                        </td>
                                        <td className="py-3 text-center">
                                            {
                                                item?.status =='Open' ?
                                                <span
                                                    className='rounded bg-red-500 text-white-light'
                                                > {item.status} </span>
                                                :
                                                <span 
                                                    className='bg-primary text-white-light px-1 rounded cursor-pointer'
                                                > {item.status} </span>

                                            }
                                        </td>
                                        <td className="py-3">
                                            {item?.cashier?.fullName}
                                        </td>
                                        <td className="py-3">
                                            <div
                                                className='flex w-full justify-center'
                                            >
                                                <IconButton
                                                    className='small'
                                                >
                                                    <EyeIcon className='w-4' />
                                                </IconButton>
                                            </div>
                                        </td>
                                        {/* {
                                            right == 'Admin' ?
                                            <td className="py-3 text-center">
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
                orders.length <1 ? 
                
                <div
                    className='w-full items-center flex justify-center text-sm py-4'
                >
                    <p className='text-red-500 text-sm'>No Data Availabe In Table</p>
                </div>
                : ''
            }
                
            
        </div>
    )
}

export default OrderTable