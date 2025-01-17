import PageWrapper from '@/app/components/PageWrapper'
import React from 'react'
import DiscountTable from './DiscountTable'
import DiscountForm from './DiscountForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getDisounts } from '@/app/server/discountServer'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value

    const discounts = await getDisounts(session?.value)

    return (
        <PageWrapper>
            <DiscountForm 
                right={right}
                token={session?.value} 
            />
            <DiscountTable 
                right={right}
                discounts={discounts} 
            />
        </PageWrapper>
    )
}

export default page