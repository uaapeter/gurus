import { FaceSmileIcon } from '@heroicons/react/24/outline'
import React from 'react'

function NotFound({title}:{title:any}) {
    return (
        <div
            className='flex flex-1 flex-col items-center justify-center h-full w-full'
        >
            <FaceSmileIcon className='w-6 h-6' />
            <p
                className='text-sm text-red-600'
            > {title} </p>
        </div>
    )
}

export default NotFound