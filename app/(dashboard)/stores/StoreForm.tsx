'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import AppSnackbar from '@/app/components/AppSnackbar'
import Button from '@/app/components/Button'
import Error from '@/app/components/ErrorComponet'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import SelectInput from '@/app/components/SelectInput'
import { SubmitButton } from '@/app/components/SubmitButton'
import { selectSelectedStore, setSelectedStore } from '@/app/reducers/storeReducer'
import { selectIsOpen, setIsOpen } from '@/app/reducers/uiReducer'
import { createStore } from '@/app/server/storeServer'
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'


import React, { useActionState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
    isLoading: false,
    message: '',
    success: ''
}

function StoreForm({users, token, locations}: {users:any[], token:any, locations: any[]}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const selectedStore = useSelector(selectSelectedStore)

    const [state, formAction] = useActionState(createStore, initialState)

    return (
        <ErrorBoundary errorComponent={Error}>
        <section>

            <div
                className='py-6 border-b-[0.1px] border-b-gray-200'
            >
                <p
                    className='text-black font-semibold text-lg'
                >
                    Stores
                </p>
            </div>

            <div
                className='py-4 flex items-center w-full justify-between'
            >
                <p>
                    Store Data
                </p>

                <Button 
                    title={
                        <div
                            className='flex'
                        >
                            <PlusCircleIcon className='w-4' />
                            <p>Add Store</p>
                        </div>
                    }
                    onClick={() =>{
                        dispatch(setSelectedStore(null))
                        dispatch(setIsOpen(!open))
                    }}
                    className='bg-primary text-white-light'
                />
            </div>
            <AppModalDialog
                open={open}
                setOpen={() =>dispatch(setIsOpen(!open))} 
                title='Add New Store' 
                className='md:max-w-1xl'
                onClick={() => {}}
            >
                {
                    !state?.message?.status ?
                    <AppSnackbar severity='error' 
                        open={state?.message? true : false} 
                        message={state?.message} 
                        position={'top'} 
                    />
                    :
                    <></>
                }
                {
                    state?.message?.status ?
                    <AppSnackbar severity='success' 
                        open={state?.message?.status? true : false} 
                        message={state?.message?.message} 
                        position={'top'} 
                    />
                    :
                    <></>
                }
                <form action={formAction}
                    className='px-4 py-6'
                >
                    <FlexRow
                        className='flex-col'
                    >
                        <label htmlFor="storeName" className='text-left'>
                            Name
                        </label>
                        <InputFied 
                            height='h-12'
                            name='storeName'
                            value={selectedStore?.storeName}
                        />
                        <input name='_id'  hidden value={selectedStore?._id} />
                        <input name='token'  hidden value={token} />
                    </FlexRow>
                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="manager" className='text-left'>
                            Manager
                        </label>
                        <SelectInput 
                            options={
                                users?.flatMap((item:any) => {
                                    return({
                                        key: item.fullName, keyValue: item?._id
                                    })
                                })
                            }
                            name='manager'
                            handleChange={() => {}}
                            value={selectedStore?.manager?._id}
                        />
                    </FlexRow>

                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="location" className='text-left'>
                            Location
                        </label>
                        <SelectInput 
                            options={
                                locations?.flatMap((item:any) => {
                                    return({
                                        key: item.locationName, keyValue: item?._id
                                    })
                                })
                            }
                            name='location'
                            handleChange={() => {}}
                            value={selectedStore?.location?._id}
                        />
                    </FlexRow>

                    <FlexRow
                        className='flex-row space-x-4'
                    >
                        <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="storePhone" className='text-left'>
                                Store Phone
                            </label>
                            <InputFied 
                                height='h-12'
                                name='storePhone'
                                value={selectedStore?.storePhone}
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="location" className='text-left'>
                                Status
                            </label>
                            <SelectInput 
                                options={[
                                    {key: 'Open', keyValue:'Open'},
                                    {key: 'Closed', keyValue:'Closed'}
                                ]}
                                name='status'
                                handleChange={() => {}}
                                value={selectedStore?.status}
                            />
                        </FlexRow>
                    </FlexRow>
                    <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="storeEmail" className='text-left'>
                                Email Address
                            </label>
                            <InputFied 
                                height='h-12'
                                name='storeEmail'
                                value={selectedStore?.storeEmail}
                            />
                        </FlexRow>
                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="storeAddress" className='text-left'>
                            Contact Addres
                        </label>
                        <InputFied 
                            height='h-12'
                            name='storeAddress'
                            value={selectedStore?.storeAddress}
                        />
                    </FlexRow>
                    

                    <div
                        className='mt-4'
                    >
                        <SubmitButton 
                            title={
                                <div
                                    className='flex'
                                >
                                    {
                                        selectedStore ? <PencilSquareIcon className='w-4' />
                                        :<PlusCircleIcon className='w-4' />
                                    }
                                    <p>{selectedStore? 'Edit Store' : 'Add Store'}</p>
                                   
                                </div>
                            }
                        />
                    </div>
                </form>
            </AppModalDialog>
        </section>
        </ErrorBoundary>
    )
}

export default StoreForm