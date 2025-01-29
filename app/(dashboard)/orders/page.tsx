import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import OrderTable from '../../components/OrderTable'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getOrders } from '@/app/server/orderServer'
import OrderHeader from './OrderHeader'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')

    const result = await Promise.allSettled([   
        getOrders(session?.value),
    ])
    return (
        <Suspense fallback={<AppLoadingIndicator />}>
            <PageWrapper>
                <OrderHeader />
                <OrderTable orders={result[0].status == 'fulfilled' ? result[0].value : []} />
            </PageWrapper>
        </Suspense>
    )
}

export default page