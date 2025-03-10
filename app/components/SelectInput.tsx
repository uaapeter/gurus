'use client'
import React from 'react'

function SelectInput({value, options, noBorder, icon, name, multiple, disabled, handleChange}:{
    name: string,
    icon?:any,
    value?: string,
    options: any,
    disabled?: boolean
    multiple?: boolean
    noBorder?: boolean,
    className?: string
    handleChange: (e:any) => void

}) {
    return (
        <div className={`flex px-2 text-sm justify-between items-end flex-1 border ${ noBorder ? 'border border-gray-100 rounded-none' : 'border-gray-200'} h-8 
            rounded-md hover:ring-0 duration-150 ease-linear`}>
            <select 
                name={name}
                defaultValue={value}
                value={value}
                disabled ={disabled ? disabled : false}
                multiple={multiple ? multiple : false}
                className='outline-none focus:ring-0 appearance-none text-black border-none w-full bg-transparent text-sm h-8'
                onChange={(e) =>handleChange(e)}
            >
               {!multiple &&  <option value=''
                className='bg-none'
               > {noBorder && name == 'search'? 'All Payments' : ''} </option>}
               {
                options?.map((item:any) =>{
                    const { key, keyValue } = item
                    return(
                        <option className='bg-transparent' key={key} value={keyValue}> {key} </option>
                    )
                })
               }
            </select>
            {icon ? icon : icon}
        </div>
    )
}

export default SelectInput