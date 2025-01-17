'use client'
import React, { useEffect, useState } from 'react'
import TodayMoment from './TodayMoment'
import { CogIcon } from '@heroicons/react/24/solid'
import { Avatar, IconButton } from '@mui/material'
import AppModalDialog from './AppModalDialog'
import { Security } from '@mui/icons-material'
import FlexRow from './FlexRow'
import InputFied from './InputField'
import Button from './Button'
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary'
import ErrorComponent from './ErrorComponet'
import { changePassword } from '../server/userServer'
import { useDispatch } from 'react-redux'
import { setStaff } from '../reducers/userReducer'

function AppHeader({user, token}:{user: any, token:string}) {
    const dispatch = useDispatch()
    const [change, setChange] = useState(false)

    useEffect(() => {

        dispatch(setStaff(user))
    }, [user])

    return (
        <nav
            className='flex max-w-6xl w-full mx-auto justify-between items-center sticky top-0 z-20'
        >
            <ErrorBoundaryHandler pathname={''} errorComponent={ErrorComponent}>
                <AppModalDialog 
                    open={change}
                    setOpen={() => setChange(!change)}
                    title={<div className='flex flex-col items-center justify-center text-sm text-red-500'>
                        <Security fontSize='large' />
                        <p className='text-black font-semibold'>Change Password</p>
                    </div>} 
                    onClick={() =>{}}            >
                    <form action={changePassword} className='p-4 w-full'>

                        <FlexRow className={'flex flex-col items-start w-full'}>
                            <label htmlFor="oldPassword">
                                Old Password
                            </label>
                            <InputFied 
                                type='password'
                                name='oldPassword'  
                                placeholder='Old password'
                                // value={form.oldPassword}
                                handleChange={() =>{}}
                                
                            />
                        </FlexRow>
                        <FlexRow className='flex space-x-4 py-4'>
                            <FlexRow className={'flex-col items-start'}>
                                <label htmlFor="password">
                                    New Password
                                </label>
                                <input hidden name='userId' value={user._id} />
                                <input hidden name='token' value={token} />

                                <InputFied 
                                    name='password' 
                                    type='password'
                                    placeholder='password'
                                    // value={form.password}
                                    handleChange={() =>{}}

                                />
                            </FlexRow>
                            <FlexRow className={'flex-col items-start'}>
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <InputFied 
                                    type='password'
                                    name='confirmPassword'  
                                    // value={form.confirmPassword}
                                    placeholder='Confirm password'
                                    handleChange={() =>{}}

                                />
                            </FlexRow>
                        </FlexRow>
                        <div>
                            <Button 
                                type='submit'
                                title='Change'
                                className='bg-primary text-white-light'
                                
                            />
                        </div>
                    </form>
                </AppModalDialog>
            </ErrorBoundaryHandler>
            <div
                className='flex-1'
            >
                <div
                    className='flex-1 bg-orange-100 w-[50%] px-4 dark:text-black/50'
                >
                    <p
                        className='text-lg py-1 hidden md:block'
                    >POS (Point Of Sales) v3.0</p>

                    <p
                        className='text-xs py-1 flex md:hidden'
                    >POS v3.0</p>
                </div>
            </div>
            <div
            
                className='flex flex-row space-x-2 items-center'
            >
                <div>
                    <p>
                       
                        <TodayMoment splice className='bg-primary text-white-light py-0 px-1 uppercase text-sm' />
                    </p>
                </div>
                <div
                    className='w-6 h-6 border flex items-center justify-center rounded-full'
                >
                    <IconButton size='small'
                        onClick={() =>setChange(!change)}

                    >
                        <CogIcon className='w-4 text-black' />
                    </IconButton>
                    
                </div>

                <div
                    className='flex items-center'
                >
                    <div>
                        <p
                                className='text-xs text-black line-clamp-1'
                        > {user?.fullName}</p>
                        <p
                            className='text-[9px] text-primary'
                        >{user?.role == 'Admin' ? 'Administrator' : user?.role}</p>
                    </div>

                    <Avatar 
                        sx={{ width: 40, height: 40 }} 
                        sizes='small' src='/logo.png' 
                    />
                </div>
            </div>
        </nav>
    )
}

export default AppHeader