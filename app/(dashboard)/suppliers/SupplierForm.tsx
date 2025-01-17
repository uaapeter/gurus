'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import Button from '@/app/components/Button'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import { selectSelectedSupplier, setSelectedSupplier } from '@/app/reducers/supplierReducer'
import { selectIsLoading, selectIsOpen, setIsLoading, setIsOpen } from '@/app/reducers/uiReducer'
import { createSupplier } from '@/app/server/supplierServer'
import { PencilSquareIcon, PlusCircleIcon, } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function SupplierForm({token}: {token:any}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const isLoading = useSelector(selectIsLoading) 
    const selectedSupplier = useSelector(selectSelectedSupplier)
    return (
        <section>
            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                    Suppliers Information
                </p>

                <Button 
                    title={
                        <div
                            className='flex space-x-2'
                        >
                            <PlusCircleIcon className='w-4' />
                            <p className='text-sm'>Add Suppliers</p>
                        </div>
                    }
                    onClick={() =>{
                        dispatch(setSelectedSupplier(null))
                        dispatch(setIsOpen(!open))
                    }}
                    className='bg-primary text-white-light'
                />
            </div>
            <AppModalDialog
                open={open}
                onClick={() =>{}}
                setOpen={() => dispatch(setIsOpen(!open))} 
                title='Add New Supplier' 
                className='md:max-w-1xl max-w-7xl'
            >
                <form action={(formData: FormData) => {
                    dispatch(setIsLoading(true))
                    createSupplier(formData, token)

                    setTimeout(() => {
                        dispatch(setIsLoading(false))
                        dispatch(setIsOpen(!open))
                    }, 2000);
                }}
                    className='px-4 py-6'
                >
                    <FlexRow
                        className='flex-col'
                    >
                        <label htmlFor="supplierName" className='text-left text-sm'>
                            Supplier Name
                        </label>
                        <InputFied 
                            height='h-12'
                            name='supplierName'
                            placeholder='Enter Name...'
                            value={selectedSupplier?.supplierName}
                        />
                        <input name='_id' value={selectedSupplier?._id} hidden />
                    </FlexRow>
                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="companyName" className='text-left text-sm'>
                            Company Name
                        </label>
                        <InputFied 
                            height='h-12'
                            name='companyName'
                            placeholder='Enter Company Name...'
                            value={selectedSupplier?.companyName}
                        />
                    </FlexRow>

                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="supplierEmail" className='text-left text-sm'>
                            Supplier e-mail
                        </label>
                        <InputFied 
                            height='h-12'
                            name='supplierEmail'
                            placeholder='Enter company e-mail...'
                            value={selectedSupplier?.supplierEmail}
                        />
                    </FlexRow>

                    <FlexRow
                        className='flex-row space-x-4'
                    >
                        <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="supplierPhone" className='text-left text-sm'>
                                Supplier Phone
                            </label>
                            <InputFied 
                                height='h-12'
                                name='supplierPhone'
                                placeholder='Enter Company Phone...'
                                value={selectedSupplier?.supplierPhone}
                            />
                        </FlexRow>
                    </FlexRow>

                    <FlexRow
                        className='flex-row space-x-4'
                    >
                        <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="supplierAddress" className='text-left text-sm'>
                                Supplier Address
                            </label>
                            <InputFied 
                                height='h-12'
                                name='supplierAddress'
                                placeholder='Enter Company Address...'
                                value={selectedSupplier?.supplierAddress}
                            />
                        </FlexRow>
                        
                    </FlexRow>

                    <div
                        className='mt-4'
                    >
                        <Button 
                            disable={isLoading}
                            title={
                                <div
                                    className='flex'
                                >
                                    {
                                        selectedSupplier ? <PencilSquareIcon className='w-4' />
                                        :<PlusCircleIcon className='w-4' />
                                    }
                                    <p>{selectedSupplier? 'Edit' : 'Submit'}</p>
                                    {
                                        isLoading? <CircularProgress size={20} />: <></>
                                    }
                                </div>
                            }
                            className='bg-primary text-white-light'
                        />
                    </div>
                </form>
            </AppModalDialog>
        </section>
    )
}

export default SupplierForm