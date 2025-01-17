'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import Button from '@/app/components/Button'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import { selectSelectedLocation, setSelectedLocation } from '@/app/reducers/locationReducer'
import { selectIsLoading, selectIsOpen, setIsLoading, setIsOpen } from '@/app/reducers/uiReducer'
import { createLocation } from '@/app/server/locationServer'
import { PencilSquareIcon, PlusCircleIcon, } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function LocationForm({ right, token}: { right: any, token:any}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const isLoading = useSelector(selectIsLoading) 
    const selectedLocation = useSelector(selectSelectedLocation)
    return (
        <section>
            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                    Location List
                </p>

                {
                    right  == 'Admin' ?
                    <Button 
                        title={
                            <div
                                className='flex'
                            >
                                <PlusCircleIcon className='w-4' />
                                <p>Add Location</p>
                            </div>
                        }
                        onClick={() =>{
                            dispatch(setSelectedLocation(null))
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
                title='Add Location' 
                className='md:max-w-1xl'
                onClick={() => {}}
            >
                <form  action={(formData: FormData) => {
                    dispatch(setIsLoading(true))
                    createLocation(formData, token)

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
                        <label htmlFor="locationName" className='text-left text-sm'>
                            Category Name
                        </label>
                        <InputFied 
                            height='h-12'
                            name='locationName'
                            placeholder='Enter Name...'
                            value={selectedLocation?.locationName}
                        />
                        <input hidden name="_id" value={selectedLocation?._id} />
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
                                        selectedLocation ? <PencilSquareIcon className='w-4' />
                                        :<PlusCircleIcon className='w-4' />
                                    }
                                    <p>{selectedLocation? 'Edit' : 'Submit'}</p>
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

export default LocationForm