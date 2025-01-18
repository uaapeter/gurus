'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import Button from '@/app/components/Button'
import Error from '@/app/components/ErrorComponet'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import SelectInput from '@/app/components/SelectInput'
import { selectSelectedCategory, setSelectedCategory } from '@/app/reducers/categoryReducer'
import { selectIsLoading, selectIsOpen, setIsLoading, setIsOpen } from '@/app/reducers/uiReducer'
import { createDiscount } from '@/app/server/discountServer'
import { PencilSquareIcon, PlusCircleIcon, } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function DiscountForm({ right, token}: { right: any, token:any}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const isLoading = useSelector(selectIsLoading) 
    const selectedCategory = useSelector(selectSelectedCategory)
    return (
        <ErrorBoundaryHandler pathname='/' errorComponent={Error}>
        <section>
            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                    Product Discount List
                </p>

                {
                    right  == 'Admin' || 'Manager' ?
                    <Button 
                        title={
                            <div
                                className='flex'
                            >
                                <PlusCircleIcon className='w-4' />
                                <p>Add Discount</p>
                            </div>
                        }
                        onClick={() =>{
                            dispatch(setSelectedCategory(null))
                            dispatch(setIsOpen(!open))
                        }}
                        className='bg-primary text-white-light'
                    />
                    :
                    <></>
                }
            </div>
            <AppModalDialog
                open={open}
                setOpen={() => dispatch(setIsOpen(!open))} 
                title='Add Discount' 
                className='md:max-w-1xl'
                onClick={() => {}}
            >
                <form  action={(formData: FormData) => {
                    dispatch(setIsLoading(true))
                    createDiscount(formData, token)

                    setTimeout(() => {
                        dispatch(setIsLoading(false))
                        dispatch(setIsOpen(!open))
                    }, 500);
                }}
                    className='px-4 py-6'
                >
                    <FlexRow
                        className='flex-col'
                    >
                        <label htmlFor="discountName" className='text-left text-sm'>
                            Discount Name
                        </label>
                        <InputFied 
                            height='h-12'
                            name='discountName'
                            placeholder='Enter Name...'
                            value={selectedCategory?.discountName}
                        />
                        <input hidden name="_id" value={selectedCategory?._id} />
                    </FlexRow>

                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="discountValue" className='text-left text-sm'>
                            Discount Percentage (%)
                        </label>
                        <InputFied 
                            height='h-12'
                            type='number'
                            name='discountValue'
                            placeholder='Enter Name...'
                            value={selectedCategory?.discountValue}
                        />
                        <input hidden name="_id" value={selectedCategory?._id} />
                    </FlexRow>

                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="status" className='text-left'>
                            Status
                        </label>
                        <SelectInput 
                            options={
                                [{  key: 'Active', keyValue: true}, {  key: 'In Active', keyValue: false}]
                            }
                            name='status'
                            handleChange={() => {}}
                            value={selectedCategory?.status}
                        />
                    </FlexRow>

                    <div
                        className='mt-4'
                    >
                        <Button 
                        
                            title={
                                <div
                                    className='flex'
                                >
                                    {
                                        selectedCategory ? <PencilSquareIcon className='w-4' />
                                        :<PlusCircleIcon className='w-4' />
                                    }
                                    <p>{selectedCategory? 'Edit' : 'Submit'}</p>
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
        </ErrorBoundaryHandler>
    )
}

export default DiscountForm