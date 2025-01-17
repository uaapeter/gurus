'use client'

import React from 'react'
import LineThrough from './LineThrough'

type props = {
    value?: string
    currency?:boolean
    icon?: React.ReactNode
    type?: string
    name?: string
    lb?: string
    height?: string
    disabled?: boolean
    placeholder?: string
    noRadus?: boolean
    handleChange?: (e:any) => void
}

function InputFied({value, icon, type, name, lb, height, disabled, placeholder, noRadus, currency, handleChange}:props) {
    return (
        <div className={`flex text-sm justify-between flex-1 border border-gray-200  ${height ? height : 'h-8'} sm:h-12 lg:h-8 md:h-8 px-2 flex items-center
            ${noRadus ? 'border border-gray-100' : 'rounded-md'} ${lb && 'border-l-0'} hover:ring-1 hover:ring-offset-secondary duration-150 ease-linear w-full`}>
                {
                    currency ?<LineThrough /> : <></>
                }
            <input 
                name={name}
                disabled={disabled}
                defaultValue={value}
                placeholder={placeholder}
                type={type ? type : "text"}
                className={`outline-none focus:ring-0 border-none ${height ? height : 'h-8'} sm:h-12 lg:h-8 md:h-8 bg-none w-full bg-transparent text-sm`}
                onChange={handleChange}
            />
            {icon ? icon : icon}
        </div>
    )
}

export default InputFied