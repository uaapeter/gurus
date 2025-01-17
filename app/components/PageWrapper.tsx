import React, { ReactNode } from 'react'

function PageWrapper({children}:{children: ReactNode}) {
    return (
        <main className='max-w-6xl w-full mx-auto'>
            {children}
        </main>
    )
}

export default PageWrapper