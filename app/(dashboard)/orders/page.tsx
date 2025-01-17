import PageWrapper from '@/app/components/PageWrapper'
import React from 'react'
import OrderTable from '../../components/OrderTable'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getOrders } from '@/app/server/orderServer'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')

    const result = await Promise.allSettled([   
        getOrders(session?.value),
    ])
    return (
        <PageWrapper>
            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                   Order Lists
                </p>                
            </div>
            <OrderTable orders={result[0].status == 'fulfilled' ? result[0].value : []} />
        </PageWrapper>
    )
}

export default page