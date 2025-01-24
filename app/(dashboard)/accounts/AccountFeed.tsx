'use client'
import Button from '@/app/components/Button'
import InputFied from '@/app/components/InputField'
import LineThrough from '@/app/components/LineThrough'
import OrderTable from '@/app/components/OrderTable'
import { selectAccounTab } from '@/app/reducers/uiReducer'
import { ChartBarSquareIcon, CreditCardIcon, MagnifyingGlassIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { Paper } from '@mui/material'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { sumTotal } from '../actions/sumTotalAction'

type balanceSheetType = {
    cashierSales: any[],
    totalSales:number,
    totalPos:number,
    totalCash: number,
    totalTransfer: number,
    dryCashAmount: number,
    changeAmount: number
}

function AccountFeed({balancesheet}: {balancesheet: balanceSheetType}) {
    const router = useRouter()
    const accountTab = useSelector(selectAccounTab)
    const [query, setQuery] = useState({
        startDate: '',
        endDate: ''
    }) 
    const handleSearch = () => {
       if(!query.startDate || !query.endDate) return
        const start = moment(query.startDate).format().split('T')[0]
        const end = moment(query.endDate).format().split('T')[0]
       
        return  router.replace(`/accounts/${start}/${end}`)
       
    }
    return (
        <div className='w-full'>
            <section
                className='grid sm:grid-cols-2 md:grid-cols-4 my-6 gap-x-4'
            >
                <div>
                    <Button 
                        title={<div className='flex items-center'>
                            <ChartBarSquareIcon className='w-5' />
                            <p>Balancesheet</p>
                        </div>} className={''}                    
                    />
                </div>        
            </section>

            <div
                className='text-sm items-center grid md:grid-cols-3 w-full mt-2 pb-4'
            >
                <div
                    className='flex items-center w-full bg-gray-200 dark:text-black'
                >
                    <p
                        className='uppercase px-2'
                    >
                        From
                    </p>
                    <div
                        className='bg-white-light flex-1'
                    >
                        <InputFied  
                            type='date'
                            noRadus
                            value={query.startDate}
                            handleChange={(e:any) =>setQuery({...query, startDate: e?.target?.value})}
                        />
                    </div>
                </div>

                <div
                    className='flex items-center w-full bg-gray-200 dark:text-black'
                >
                    <p
                        className='uppercase px-2'
                    >
                        To
                    </p>
                    <div
                        className='bg-white-light flex-1'
                    >
                        <InputFied  
                            type='date'
                            noRadus
                            value={query.endDate}
                            handleChange={(e:any) =>setQuery({...query, endDate: e?.target?.value})}
                        />
                    </div>
                </div>
                <div
                    className='flex items-center w-full bg-gray-200 ml-2'
                >
                    <div
                        className='bg-white-light md:justify-end flex-1 flex flex-row items-center'
                    >
                    {/* <SelectInput 
                            name={'search'}   
                            handleChange={() => { } }
                            options={[
                                {key: 'All Payment', keyValue: 'All'}
                            ]}  
                            noBorder                           
                        /> */}
                        <Button 
                            type='button'
                            title={
                                <div
                                    className='flex  items-center'
                                >
                                    <MagnifyingGlassIcon className='w-4' />
                                    <p>Search Record</p>
                                </div>
                            }
                            onClick={() =>handleSearch()}
                            className='bg-primary text-white-light p-0'
                        />
                    </div>
                </div>
            </div>
            <Paper
                className='p-3'
            >
                {/* <div>
                    <SelectInput 
                        name='cashiers'
                        options={[]} 
                        handleChange={function (e: any): void {
                            throw new Error('Function not implemented.')
                        } }                    
                    />
                </div> */}
                <div>
                    <p>Sales Balancesheet Record</p>
                </div>

                <div
                    className='flex max-w-6xl w-full justify-between'
                >
                    <table className='table w-full text-sm'>
                        <thead>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            
                            {
                                balancesheet.cashierSales?.flatMap((item, index) => {
                                    return (
                                        <Fragment key={index+777}>
                                            <tr>
                                                <td>Type</td>
                                                <td>Casher({item?.cashier?.userName})</td>
                                                
                                            </tr>
                                            <tr>
                                                <td>Employee</td>
                                                <td>{item?.cashier?.fullName}</td>
                                            </tr>
                                            <tr>
                                                <td>Order Open</td>
                                                <td> {item.sales?.filter((sale:any) =>sale?.status == 'Open').length} </td>
                                                
                                            </tr>
                                            <tr>
                                                <td>Order Closed</td>
                                                <td> {item.sales?.filter((sale:any) =>sale?.status == 'Paid').length} </td>
                                            </tr>
                                            <hr className='my-2' />
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                        <Button 
                            className='bg-red-500 text-white-light'
                            title={<div className='flex items-center'>
                                <CreditCardIcon className='w-5' />
                                <p>Audit Payments</p>
                            </div>}  
                        />
                    </table>
                    <table className='table w-full text-sm'>
                        <thead>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='py-2'>Total Sales</td>
                                <td className='py-2'>
                                    <LineThrough /> {balancesheet?.totalSales?.toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2'>Cash</td>
                                <td className='py-2'>
                                    <LineThrough /> {balancesheet?.totalCash?.toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2'>POS</td>
                                <td className='py-2'>
                                    <LineThrough /> {balancesheet?.totalPos?.toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                                <td className='py-2'>Transfer</td>
                                <td className='py-2'>
                                    <LineThrough /> {balancesheet?.totalTransfer?.toLocaleString()}
                                </td>
                            </tr>
                            <tr className='text-red-500'>
                                <td className='py-2'>Credit</td>
                                <td className='py-2'>
                                    <LineThrough /> {balancesheet?.dryCashAmount?.toLocaleString()}
                                </td>
                            </tr>
                            <tr>
                               
                                <td colSpan={1}>
                                    <table className='table w-full'>

                                        <thead>
                                            <th className='text-left'>Employee</th>
                                            <th className='text-left'>Sales</th>
                                            <th className='text-center'>#</th>
                                        </thead>
                                       

                                        {
                                            balancesheet?.cashierSales?.flatMap((item:any, index) =>{
                                                return (
                                                    <Fragment
                                                        key={index+909}
                                                    >
                                                        <tr>
                                                            <td>{item?.cashier?.fullName}</td>
                                                            <td>
                                                                <LineThrough /> {sumTotal(item?.sales, 'amount')}
                                                            </td>
                                                            <td className='text-right'>1</td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                        
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                       
                    </table>
                    <div>
                        <Button 
                            title={<div className='flex items-center'>
                                <PrinterIcon className='w-5' />
                                <p>Print</p>
                            </div>} className={''}                    
                        />
                    </div>
                </div>
            </Paper>


           {
                accountTab == 'statement' ?
                <section>
                    <div
                        className='pb-4 flex flex-col'
                    >
                        <p
                            className='text-gray-400 text-lg'
                        >Filter sales record y date range</p>

                        <div
                            className='text-sm items-center grid md:grid-cols-3 w-full mt-2'
                        >
                            <div
                                className='flex items-center w-full bg-gray-200 dark:text-black'
                            >
                                <p
                                    className='uppercase px-2'
                                >
                                    From
                                </p>
                                <div
                                    className='bg-white-light flex-1'
                                >
                                    <InputFied  
                                        type='date'
                                        noRadus
                                    
                                    />
                                </div>
                            </div>

                            <div
                                className='flex items-center w-full bg-gray-200 dark:text-black'
                            >
                                <p
                                    className='uppercase px-2'
                                >
                                    From
                                </p>
                                <div
                                    className='bg-white-light flex-1'
                                >
                                    <InputFied  
                                        type='date'
                                        noRadus
                                    />
                                </div>
                            </div>
                            <div
                                className='flex items-center w-full bg-gray-200 ml-2'
                            >
                            
                                <div
                                    className='bg-white-light flex-1 flex flex-row items-center'
                                >
                                {/* <SelectInput 
                                        name={'search'}   
                                        handleChange={() => { } }
                                        options={[
                                            {key: 'All Payment', keyValue: 'All'}
                                        ]}  
                                        noBorder                           
                                    /> */}
                                    <Button 
                                        title={
                                            <div
                                                className='flex  items-center'
                                            >
                                                <MagnifyingGlassIcon className='w-4' />
                                                <p>Search Record</p>
                                            </div>
                                        }
                                        className='bg-black text-white-light p-0'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <OrderTable orders={[]} />
                </section>
                :
                <></>
            }
        </div>
    )
}

export default AccountFeed