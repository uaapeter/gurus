import React from 'react'
import { useFormStatus } from "react-dom"
import { Box, CircularProgress } from '@mui/material'

export function SubmitButton ({title}:{title: any}) {
    const { pending } = useFormStatus()
    
    return (
        <button 
            type='submit'
            className='bg-primary text-white-light
                shadow-md
            px-4 py-2 
            rounded-md
            hover:shadow-lg transition-all
            duration-150 ease-linear items-center flex justify-center
            ' 
            disabled={pending}
        >
            
            {title} {pending ? <Box ><CircularProgress size={20}  /></Box>: <></>}
            
        </button>
    )
}