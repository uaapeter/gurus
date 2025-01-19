'use client'
import React, { useActionState } from 'react'
import InputFied from '../components/InputField'
import { hanldeLogIn } from '../server/userServer'
import ErrorComponent from '../components/ErrorComponet'
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary'
import { useFormStatus } from 'react-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function SubmitButton () {
    const { pending } = useFormStatus()
    
    return (
        <button 
            type='submit'
            className='bg-primary w-full text-white-light
                shadow-md
            px-4 py-2 
            rounded-md
            hover:shadow-lg transition-all
            duration-150 ease-linear items-center flex justify-center
            ' 
            disabled={pending}
        >
            
            Log In {pending ? <Box ><CircularProgress size={20}  /></Box>: <></>}
            
        </button>
    )
}

const initialState = {
    isLoading: false,
    message: ''
}

function LogInForm() {
    const [state, formAction] = useActionState(hanldeLogIn, initialState)
    return (
        <ErrorBoundaryHandler errorComponent={ErrorComponent} pathname={''}>
      
        
        <form
            className='mt-0  md:mt-16 w-full'
            action={formAction}
            // hidden
        >
            {
                <p className='text-red-500'> {state.message} </p>
            }
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
                <SubmitButton />
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