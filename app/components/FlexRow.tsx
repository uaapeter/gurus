import React, { ReactNode } from 'react'

function FlexRow({children, className}: {
    children: ReactNode,
    className: string
}) {
    return (
        <div
            className={`flex flex-row w-full ${className}`}
        >{children}</div>
    )
}

export default FlexRow