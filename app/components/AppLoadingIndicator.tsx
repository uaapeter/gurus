import { CircularProgress } from '@mui/material'
import React from 'react'

function AppLoadingIndicator() {
    return (
        <main
            className='w-full flex-col h-[100dvh] flex items-center justify-center'
        >
            <CircularProgress size='large' color='warning' />
            <p className='text-sm text-success'>Loading...</p>
        </main>
    )
}

export default AppLoadingIndicator