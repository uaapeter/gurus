import React from 'react'
import LineThrough from './LineThrough'
import Link from 'next/link'

type gridTabType = {
    title: string, icon?:any, subTitle:any, url?:string, className:string, leftIcon?:any
}

const GridTab = ({title, icon, subTitle, url, className, leftIcon}:gridTabType) => {
    return (
         <div
            className={`w-full px-3 py-2 ${className} rounded-md dark:text-black/50`}
        >
            <div
                className='flex items-center space-x-4'
            >
               {icon}
                <div
                    className='flex w-full items-center justify-between'
                >
                    <div>
                        <p className='text-sm'>{title}</p>
                        <p className='text-xs'> {title.includes('Sales')?<LineThrough /> : ''} {subTitle}</p>
                    </div>
                    {leftIcon}
                </div>
            </div>

            {
                url ?
                    <div
                        className='flex items-center justify-center'
                    >
                        <Link href={url} className='text-xs'>View</Link>
                    </div>
                : 
                
                <></>
            }
        </div>
    )
}

export default GridTab