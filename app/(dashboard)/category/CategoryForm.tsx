'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import Button from '@/app/components/Button'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import { selectSelectedCategory, setSelectedCategory } from '@/app/reducers/categoryReducer'
import { selectIsLoading, selectIsOpen, setIsLoading, setIsOpen } from '@/app/reducers/uiReducer'
import { createCategory } from '@/app/server/categoryServer'
import { PencilSquareIcon, PlusCircleIcon, } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function CategoryForm({ right, token}: { right: any, token:any}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const isLoading = useSelector(selectIsLoading) 
    const selectedCategory = useSelector(selectSelectedCategory)
    return (
        <section>
            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                    Product Category List
                </p>

                {
                    right  == 'Admin' ?
                    <Button 
                        title={
                            <div
                                className='flex'
                            >
                                <PlusCircleIcon className='w-4' />
                                <p>Add Category</p>
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
                title='Add Category' 
                className='md:max-w-1xl'
                onClick={() => {}}
            >
                <form  action={(formData: FormData) => {
                    dispatch(setIsLoading(true))
                    createCategory(formData, token)

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
                        <label htmlFor="categoryName" className='text-left text-sm'>
                            Category Name
                        </label>
                        <InputFied 
                            height='h-12'
                            name='categoryName'
                            placeholder='Enter Name...'
                            value={selectedCategory?.categoryName}
                        />
                        <input hidden name="_id" value={selectedCategory?._id} />
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
    )
}

export default CategoryForm