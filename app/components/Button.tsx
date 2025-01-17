'use client'
import React from 'react'
type props = {
    title?: any,
    noPd?:boolean
    disable?: boolean
    className: string
    type?: 'submit' | 'button'
    onClick?: (e:any) => void
}
function Button({ type, title, onClick, disable, className, noPd}: props) {
    return (
        <>
            <button
                disabled={disable}
                type={type ? type : 'submit'}
                className={`
                    ${className}
                    shadow-md
                    ${!noPd && 'px-4 py-2 '}
                    rounded-md
                    hover:shadow-lg transition-all
                    duration-150 ease-linear
                `}
                onClick={(e:any) =>onClick ? onClick(e) : {}}
            >
               {title}
            </button>
        </>
    )
}

export default Button