'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import AppSnackbar from '@/app/components/AppSnackbar'
import Button from '@/app/components/Button'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import { selectSelectedSupplier, setSelectedSupplier } from '@/app/reducers/supplierReducer'
import { selectIsOpen, setIsOpen } from '@/app/reducers/uiReducer'
import { createSupplier } from '@/app/server/supplierServer'
import { PencilSquareIcon, PlusCircleIcon, } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'

import React, { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
    isLoading: false,
    message: '',
    success: ''
}
function SupplierForm({token}: {token:any}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const selectedSupplier = useSelector(selectSelectedSupplier)
    const {pending} = useFormStatus()
    const [state, formAction] = useActionState(createSupplier, initialState)
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
                <form action={formAction}
                    className='px-4 py-6'
                >
                    {
                        <AppSnackbar 
                            severity='error'
                            open={state?.message ? true : false} 
                            message={state?.message} 
                            position={'top'} 
                        />
                    }
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
                        <input name='token' value={token} hidden />

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
                            disable={pending}
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
                                        pending? <CircularProgress size={20} />: <></>
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