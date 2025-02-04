import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import ChargesTable from './ChargesTable'
import ChargesForm from './ChargesForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'
import { getCharges } from '@/app/server/chargesServer'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value

    const discounts = await getCharges(session?.value)

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <ChargesForm 
                right={right}
                token={session?.value} 
            />
            <ChargesTable 
                right={right}
                charges={discounts} 
            />
        </PageWrapper>
        </Suspense>
    )
}

export default page