'use client'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../reducers/uiReducer';

export default function BackDrop({open, handleClear}:{open:boolean, handleClear: () =>void}) {
    const dispatch = useDispatch()
    React.useEffect(() => {
        setTimeout(() => {
            handleClear()
            dispatch(setIsLoading(false))
        }, 2000);
    }, [])
    return (
        <div>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
                
            >
                <CircularProgress color="success" />
            </Backdrop>
        </div>
    );
}
