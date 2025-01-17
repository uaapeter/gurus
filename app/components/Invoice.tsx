'use client'
import React, { Fragment } from 'react'
import LineThrough from './LineThrough'
import { useSelector } from 'react-redux'
import { selectSelectedOrder } from '../reducers/orderReducer'
import moment from 'moment'
import QRCode from 'react-qr-code'
import { selectStaff } from '../reducers/userReducer'


function Invoice({ref}:{ref:React.Ref<HTMLElement>}) {

    const staff = useSelector(selectStaff)
    const order = useSelector(selectSelectedOrder)
    
    return (
        <main className='py-6' ref={ref}>
            <div
                className='flex flex-col text-xs items-center justify-center'
            >
                <img 
                    width={100}
                    height={100}
                    src='/logo.png'
                    alt='logo'
                    // className='w-auto h-auto:'
                />
                <p className='text-lg font-semibold uppercase'>{staff?.store?.storeName}</p>
                <p>Address: {staff?.store?.storeAddress}</p>
                <p>Tel: {staff?.store?.storePhone}</p>
                <p>Email: {staff?.store?.storeEmail}</p>
            </div>
            <div
                className='flex items-center flex-col w-full'
            >
                <p
                    className='uppercase text-sm font-black'
                >Sales Invoice</p>

                <div className='flex items-center flex-col w-full'>
                {/* <Tile 
                    title={'Cashier'} 
                    value={'Smith'}                 
                />
                 <Tile 
                    title={'Invoice'} 
                    value={'INV-000001'}                 
                />
                 <Tile 
                    title={'Customer'} 
                    value={'Guest'}                 
                />
                 <Tile 
                    title={'Date'} 
                    value={'July 12th, 2024'}                 
                /> */}

                    <table className='table text-xs md:w-[50%] mx-auto'>
                        <thead>
                            <th></th>
                            <th></th>
                            <tr>
                                <td className='text-left uppercase'>Cashier</td>
                                <td className='text-left'> : {order?.cashier?.fullName}</td>
                            </tr>
                            <tr>
                                <td className='text-left uppercase'>Invoice No</td>
                                <td className='text-left'> : {order?.orderId}</td>
                            </tr>
                            <tr>
                                <td className='text-left uppercase'>Customer</td>
                                <td className='text-left'> : {order?.customer?.customerName ? order.customer?.customerName : <></>}</td>
                            </tr>
                            <tr>
                                <td className='text-left uppercase'>Date</td>
                                <td className='text-left'> : { moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')?.split(',')[0]}</td>
                            </tr>
                            <tr>
                                <td className='text-left uppercase'>Time</td>
                                <td className='text-left'> : { moment(order?.createdAt).format('MMMM Do YYYY, h:mm:ss a')?.split(',')[1]}</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div>
                <table className='table text-xs w-[50%] mx-auto'>
                    <thead className='border-b border-b-gray-400 border-dotted'>
                        <th className='text-left'>Item</th>
                        <th className='text-left'>Qty</th>
                        <th>Amount</th>
                    </thead>
                    {order ?
                    <tbody>
                        { 
                            order?.orderItems?.flatMap((item:any, index:number) => {
                                return (
                                    <Fragment
                                        key={(index+90)*77}
                                    >
                                        <tr className='border-b border-b-gray-400 border-dotted'>
                                            <td className='text-left line-clamp-1'> {item?.product?.productName} </td>
                                            <td className='text-left'>{item?.quantity} </td>
                                            <td className='text-right'> <LineThrough/>{item?.total?.toLocaleString()} </td>
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }

                        <tr>
                            <td className='text-left text-black font-semibold' colSpan={2}>

                            <span className='uppercase'>Total </span><span className='text-[8px]'> (Vat inclusive) </span>
                            </td>
                            <td
                                className='text-left border-b-4 border-b-black border-double'
                            >
                                <LineThrough />{order?.amount?.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left uppercase text-black font-semibold' colSpan={2}>

                                Payable
                            </td>
                            <td className='text-left'>
                                <LineThrough />{order.amount?.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left uppercase text-black font-semibold' colSpan={2}>

                                Paid
                            </td>
                            <td className='text-left'>
                                <LineThrough />{order?.totalPaid?.toLocaleString()}
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left uppercase text-black font-semibold' colSpan={2}>

                                Discount
                            </td>
                            <td className='text-left'>
                                <LineThrough />{order?.discount?.toLocaleString()} %
                            </td>
                        </tr>
                        <tr>
                            <td className='text-left uppercase text-black font-semibold' colSpan={2}>

                                Balance
                            </td>
                            <td className='text-left'>
                                <LineThrough />{(order?.amount - order?.totalPaid).toLocaleString()}
                            </td>
                        </tr>
                        <tr
                            className='border-b border-b-black border-solid'
                        >
                            <td className='text-left uppercase text-black font-semibold' colSpan={1}>

                                Paid Via:
                            </td>
                            <td className='text-center'>
                                {order?.paymentMethod}
                            </td>
                        </tr>
                        
                    </tbody>
                    :<></>
                     }
                </table>
                <div 
                    className='pt-4'
                    style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}
                >
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`${order?.orderId} Email:${staff?.store?.storeEmail}, Tel:+234${staff?.store?.storePhone?.slice(1, staff?.store?.storePhone?.length)}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <div
                    className='flex items-center justify-center'
                >
                    <p className='text-xs font-normal text-black'>Copyright &copy;  {new Date().getFullYear()} JOCTEC POS </p>
                </div>
            </div>
        </main>
    )
}

export default Invoice