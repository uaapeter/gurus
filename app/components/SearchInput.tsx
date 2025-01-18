'use client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearch } from '../reducers/uiReducer'
type props = {
    search?: string, setSearh:any, placeholder: string
}
function SearchInput({setSearh, placeholder}:props) {
    const dispatch = useDispatch()
    return (
        <div
            className='px-3 border-[0.5px] border-gray rounded-lg
                flex items-center h-9 flex-1
            '
        >
            <MagnifyingGlassIcon className='w-5' />
            <input 
                type="text" 
                name="search" 
                
                onChange={e =>{
                    setSearh(e.target.value)
                    dispatch(setSearch(e.target.value))
                }}
                placeholder={placeholder}
                className='outline-none border-0 focus:ring-0 
                bg-transparent text-xs w-full h-9'
            />
        </div>
    )
}

export default SearchInput