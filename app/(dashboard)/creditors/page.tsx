import PageWrapper from '@/app/components/PageWrapper'
import React from 'react'
import OrderTable from '../../components/OrderTable'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getOrdersOnCredit } from '@/app/server/orderServer'
import CreditorsHeader from './CreditorsHeader'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')

    const result = await Promise.allSettled([   
        getOrdersOnCredit(session?.value),
    ])
    return (
        <PageWrapper>
            <CreditorsHeader />
            <OrderTable orders={result[0].status == 'fulfilled' ? result[0].value : []} />
        </PageWrapper>
    )
}

export default page