'use client'

import { ReactNode,  } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Paper } from '@mui/material'
import Button from './Button'

export default function AppModalDialog({open, title, children, onClick, btnTitle, className, setOpen}:{open:boolean, className?:string, title:any, btnTitle?: any, onClick: () => void, children: ReactNode, setOpen: () =>void}) {

    return (
        <Dialog open={open} onClose={() =>{}} className="relative z-40">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-fullitems-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className={`relative top-8 transform overflow-hidden rounded-lg bg-white-light shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 
                    data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 ${className} w-full mx-auto sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95`}
                >
                    <DialogTitle
                        className='py-4 text-black font-semibold'
                    > {title} </DialogTitle>
                    <Paper className='overflow-hidden w-full' elevation={0}>
                        {children}
                    </Paper>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 items-center gap-x-4">
                       {
                        btnTitle ? 
                        <Button 
                            title={btnTitle}
                            onClick={() => onClick()} 
                            className='text-red-500 h-8 flex items-center bg-primary'                       
                        />
                        :
                        <></>
                       }
                       <Button 
                            title='Close'
                            onClick={() => setOpen()} 
                            className='text-red-500 h-8 flex items-center bg-white-light'                       
                        />
                    </div>
                </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
