

import React from 'react'
import LogInForm from './LogInForm'

import { Paper } from '@mui/material'
import { UserIcon } from '@heroicons/react/24/outline'
async function SignIn() {

    return (
        <main
            className='w-full h-[100dvh] max-w-4xl m-auto flex justify-center items-center bg-white-light'
        >

        <Paper
            className='
                h-[80dvh] mx-auto w-[90%]
                flex lg:max-w-2xl xs:max-w-full
                rounded-md p-3 items-center justify-center md:flex-row flex-col bg-[#d4d4dd]
            '
        >
            <div
                className='h-full
                    rounded-md flex justify-center 
                    flex-1 bg-white px-5 flex-col md:w-full w-full sm:w-full
                '
            >

                
                <div className='w-full flex items-center justify-center'>
                    <img
                        width={100}
                        height={100}
                        src='/logo.png' 
                        alt='logo'
                        // className='h-auto w-auto'
                    />
                </div>
               
                <div
                    className='flex-col items-center px-4 md:py-6 md:mb-0 py-1'
                >
                    <h1
                        className='text-black text-center uppercase
                        '
                    >POS SYSTEM</h1>
                    {/* <p
                        className='text-sm font-light'
                    >
                        With us, each client is much more than just a face, 
                        but our passport to show the world that great service can 
                        be provided in Nigeria. This is why we hold ourselves to high values.
                    </p> */}
                </div>

                <div
                    className='bg-black flex-col
                        rounded-md px-4 py-4 hidden 
                    '
                >
                    <div 
                        className='text-white-light
                            text-sm py-4 
                        '
                    >
                        <p>
                        A top service, really very great. I was
                        particularly impressed with their understanding 
                        of our request, and the way we were kept abreast of the process every step of the way
                        </p>

                    </div>

                    <div
                        className='flex flex-row gap-4
                            justify-between items-center
                        '
                    >
                        <img 
                            width={60}
                            height={60}
                            alt='logo'
                            src='/favatar.jpg'
                            className='rounded-full'
                        />


                        <div
                            className='flex-1'
                        >
                            <p
                                className='text-white-light'
                            >
                                Mary Abdullahi 
                            </p>
                            <span
                                className='text-xs
                                    text-gray-300
                                '
                            >Chief Executive Officer</span>
                        </div>

                    </div>
                </div>
            </div>

            <div
                className='
                    flex flex-1 w-full px-4
                '
            >
               
                <div
                    className=' w-full mt-2 md:mt-4'
                >
                    <div
                        className='flex items-center flex-col'
                    >
                        <UserIcon className='w-20' />
                        <h1
                            className='text-black
                                text-xl font-bold
                            '
                        >Welcome back !</h1>
                        <span
                            className='text-sm
                                text-gray-dark
                            '
                        >
                            Provide your account details
                        </span>
                    </div>
                       
                    
                    <LogInForm  />


                </div>

            </div>
        </Paper>
        </main>
    )
}

export default SignIn