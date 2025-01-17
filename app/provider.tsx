'use client'
import axios from 'axios'
import React, { ReactNode } from 'react'
import { Provider as Provder, } from 'react-redux'
import {ProSidebarProvider} from 'react-pro-sidebar'
import { STORE } from './reducers'

export default function Provider({children}:{children: ReactNode}) {
    axios.defaults.baseURL = 'http://192.168.31.185:4000/v1/'
    return (
        <Provder store={STORE}>
            <ProSidebarProvider>
            {children}
            </ProSidebarProvider>
        </Provder>
           
    )
}