'use client'
import { setError, setSuccess } from '../reducers/uiReducer'
import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'

function AppSnackbar({open, message, severity, position}: {
    open:boolean,
    message:string,
    severity?:'success' | 'error',
    position: 'top' | 'bottom'
}) {
    const dispatch = useDispatch()
    return (
        <Snackbar 
            anchorOrigin={{vertical: position,
            horizontal: 'center',}}
            open={open} autoHideDuration={6000} onClose={() => {
                dispatch(setError(null))
                dispatch(setSuccess(null))
            }}>
            <Alert onClose={() =>{
                dispatch(setError(null))
                dispatch(setSuccess(null))
            }} severity={severity} sx={{ width: '100%' }}
                className='bg-red-default'
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default AppSnackbar