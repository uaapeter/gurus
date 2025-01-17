'use client'
import React from 'react'
import InputFied from '../components/InputField'
import { hanldeLogIn } from '../server/userServer'
import ErrorComponent from '../components/ErrorComponet'
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary'


function LogInForm() {
    return (
        <ErrorBoundaryHandler errorComponent={ErrorComponent} pathname={''}>
        <form
            className='mt-0  md:mt-2 w-full'
            action={hanldeLogIn}
            hidden
        >
            <p className='text-lg'>Company Setup</p>
            <div
                className='flex flex-col
                    py-2 w-full
                '
            >
                <label htmlFor='companyName' className='text-sm'>Company Name</label>
                <InputFied 
                    name='companyName'
                    placeholder='Name'
                    height='h-12'  
                />
            </div>

            <div
                className='flex flex-col
                    py-2 w-full
                '
            >
                <label htmlFor='companyPhone' className='text-sm'>Phone</label>
                <InputFied 
                    name='companyPhone'
                    type='name'
                    height='h-12'  
                    placeholder='07030901628'
                />
            </div>

            <div
                className='flex flex-col
                    py-2 w-full
                '
            >
                <label htmlFor='companyEmail' className='text-sm'>Email</label>
                <InputFied 
                    name='companyEmail'
                    type='email'
                    height='h-12'  
                    placeholder='name@jotec.com'
                />
            </div>
            <div
                className='flex flex-col
                    py-2 w-full
                '
            >
                <label htmlFor='companyLocation' className='text-sm'>Location</label>
                <InputFied 
                    name='companyLocation'
                    type='name'
                    height='h-12'  
                    placeholder='Address'
                />
            </div>

            <div className='pb-2'>
                <label className='text-sm' htmlFor="logo">Logo</label>
                <input type="file" name="" id="" />
            </div>

            <div
                className='w-full mt-2'
            >
                {/* <Link href='/'> */}

                
                <button 
                    type='submit'
                    className='bg-primary w-full text-white-light
                     shadow-md
                    px-4 py-2 
                    rounded-md
                    hover:shadow-lg transition-all
                    duration-150 ease-linear items-center flex justify-center
                    ' 
                    
                >
                   
                   Submit & Continue
                    
                </button>
                {/* </Link> */}

            </div>
            <div
                className='w-full flex justify-center items-center mt-2 text-xs flex-col'
            >
                <p
                    className=' text-primary'
                >
                    Copyright &copy; {new Date().getFullYear()}  POS (Point of Sales) v3.0
                </p>
                <p className='text-red-500'>
                    Designed & Developed by Joctech.com
                </p>
            </div>

        </form>

        <form
            className='mt-0  md:mt-16 w-full'
            action={hanldeLogIn}
            // hidden
        >
            <div
                className='flex flex-col
                    py-4 w-full
                '
            >
                <span>User name</span>
                <InputFied 
                    name='username'
                    placeholder='Username'
                    height='h-12'  
                />
            </div>

            <div
                className='flex flex-col
                    py-4 w-full
                '
            >
                <span>Password</span>
                <InputFied 
                    name='password'
                    type='password'
                    placeholder='Password'  
                    height='h-12'  
                />
            </div>

            <div
                className='w-full mt-4'
            >
                {/* <Link href='/'> */}
                
                <button 
                    type='submit'
                    className='bg-primary w-full text-white-light
                     shadow-md
                    px-4 py-2 
                    rounded-md
                    hover:shadow-lg transition-all
                    duration-150 ease-linear items-center flex justify-center
                    ' 
                    
                >
                    
                    Log In
                    
                </button>
                {/* </Link> */}

            </div>
            <div
                className='w-full flex justify-center items-center mt-5 text-xs'
            >
                <p
                    className='mb-4'
                >Forgot Password?
                    <span
                        className='text-secondary
                            mx-1 cursor-pointer
                        '
                    >Reset</span>    
                </p>
            </div>
            <div
                className='w-full flex justify-center items-center mt-2 text-xs flex-col'
            >
                <p
                    className=' text-primary'
                >
                    Copyright &copy; {new Date().getFullYear()}  POS (Point of Sales) v3.0
                </p>
                <p className='text-red-500'>
                    Designed & Developed by whastcom.com
                </p>
            </div>

        </form>

        </ErrorBoundaryHandler>
    )
}

export default LogInForm