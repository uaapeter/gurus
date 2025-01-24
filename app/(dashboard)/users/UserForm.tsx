'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import AppSnackbar from '@/app/components/AppSnackbar'
import Button from '@/app/components/Button'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import SelectInput from '@/app/components/SelectInput'
import { selectIsOpen, setIsOpen } from '@/app/reducers/uiReducer'
import { selectSelectedUser, setSelectedUser } from '@/app/reducers/userReducer'
import { createUser } from '@/app/server/userServer'
import { PencilSquareIcon, PlusCircleIcon, } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'
import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
const initialState = {
    isLoading: false,
    message: ''
}
function UserForm({stores, token}: {stores: any[], token:any}) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const [show, setShow] = useState(false)
    const selectedUser = useSelector(selectSelectedUser)
    const {pending} = useFormStatus()
    const [state, formAction] = useActionState(createUser, initialState)
    return (
        <section>
           
            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                    User Information
                </p>

                <Button 
                    title={
                        <div
                            className='flex'
                        >
                            <PlusCircleIcon className='w-4' />
                            <p>Add User</p>
                        </div>
                    }
                    onClick={() => {
                        dispatch(setSelectedUser(null))
                        dispatch(setIsOpen(!open))
                    }}
                    className='bg-primary text-white-light'
                />
            </div>
            <AppModalDialog
                open={open}
                setOpen={() => dispatch(setIsOpen(!open))} 
                title='Add New User' 
                className='md:max-w-1xl'
                onClick={() =>{}}
            >
                <form action={formAction}
                    className='px-4 py-6'
                >
                    <AppSnackbar 
                        open={state?.message ? true : false} 
                        message={state?.message} 
                        position={'top'} 
                        severity='error'
                    />
                    <AppSnackbar 
                        open={state?.message?.status ? true : false} 
                        message={state?.message?.message} 
                        severity='success'
                        position={'top'} 
                    />
                    <FlexRow
                        className='flex-col'
                    >
                        <label htmlFor="fullName" className='text-left text-sm'>
                            Fullname
                        </label>
                        <InputFied 
                            height='h-12'
                            name='fullName'
                            placeholder='Enter name'
                            value={selectedUser?.fullName}
                        />
                        <input name='_id' hidden value={selectedUser?._id} />
                        <input name='_id' hidden value={token} />

                    </FlexRow>
                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="username" className='text-left text-sm'>
                            Username
                        </label>
                        <InputFied 
                            height='h-12'
                            name='username'
                            placeholder='Enter Username'
                            value={selectedUser?.username}
                        />
                    </FlexRow>

                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="phoneNumber" className='text-left text-sm'>
                            Phone Number
                        </label>
                        <InputFied 
                            height='h-12'
                            name='phoneNumber'
                            placeholder='Enter Phone Number'
                            value={selectedUser?.phoneNumber}
                        />
                    </FlexRow>

                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="emailAddress" className='text-left text-sm'>
                            E-mail
                        </label>
                        <InputFied 
                            height='h-12'
                            name='emailAddress'
                            placeholder='Enter e-mail'
                            value={selectedUser?.emailAddress}
                        />
                    </FlexRow>
                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="password" className='text-left text-sm'>
                           Password
                        </label>
                        <InputFied 
                            height='h-12'
                            name='password'
                            placeholder='Password'
                            type={show ? '' : 'password'}
                        />
                    </FlexRow>
                    <FlexRow
                        className='flex-row mt-4'
                    >
                        <Button 
                            className='bg-black text-white-light text-sm py-0'
                            title='Generate Secure Password'
                        />
                        <div
                            className='flex ml-6 items-center space-x-2 text-sm'
                        >
                            <input type='checkbox' checked={show} onClick={() => setShow(!show)} className='bg-primary' />
                            <p>Show password</p>
                        </div>
                    </FlexRow>

                    <FlexRow
                        className='flex-row space-x-4'
                    >
                        <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="role" className='text-left text-sm'>
                                Choose User Role
                            </label>
                            <SelectInput 
                                options={[
                                    {key: 'Admin', keyValue:'Admin'},
                                    {key: 'Manager', keyValue:'Manager'},
                                    {key: 'Cashier', keyValue:'Cashier'}
                                ]}
                                name='role'
                                handleChange={() => {}} 
                                value={selectedUser?.role}
                            />
                        </FlexRow>
                       
                        <FlexRow
                            className='flex-col mt-4'
                        >
                            <label htmlFor="store" className='text-left text-sm'>
                                Branch
                            </label>
                            <SelectInput 
                                options={
                                    stores?.flatMap((item:any) => {
                                        return({
                                            key: item.storeName, keyValue: item?._id
                                        })
                                    })
                                }
                                name='store'
                                handleChange={() => {}} 
                                value={selectedUser?.store?._id}
                            />
                        </FlexRow>
                    </FlexRow>
                    <div
                        className='mt-4'
                    >
                        <Button 
                            type='submit'
                            disable={pending}
                            title={
                                
                                <div
                                    className='flex'
                                >
                                    {
                                        selectedUser ? <PencilSquareIcon className='w-4' />
                                        :<PlusCircleIcon className='w-4' />
                                    }
                                    <p>{selectedUser? 'Edit User' : 'Add User'}</p>
                                    {
                                        pending? <CircularProgress size={20} />: ''
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

export default UserForm