'use client'
import React from 'react'
import LineThrough from './LineThrough'

function FlatInput({value, type, name, disabled, currency, className, placeholder, handleChange}:{
    value:string, type?:any, name:string, disabled?: boolean, currency?:boolean, className?:string, placeholder?:string, handleChange?: (e:any) => void
}) {
    return (
        <div className={`flex px-2 text-sm justify-between flex-1 border-gray-200 h-8 
            border-0 hover:ring-0 hover:ring-primary duration-150 ease-linear ${className} flex items-center space-x-1`}>
            {currency ?<LineThrough /> :<></>}
            <input 
                disabled={disabled}
                name={name}
                defaultValue={value}
                min={type =='number' ? 1: ''}
                placeholder={placeholder}
                type={type ? type : "text"}
                className={`outline-none focus:ring-0 border-none bg-none w-full bg-transparent text-sm
                 ${name =='quantity' && 'text-center'} ${name =='unitPrice' && 'text-right'}`}
               onChange={handleChange}
            />
        </div>
    )
}

export default FlatInput