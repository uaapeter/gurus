import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import StoreTable from './StoreTable'
import StoreForm from './StoreForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUsers } from '@/app/server/userServer'
import { getLocations } from '@/app/server/locationServer'
import { getStores } from '@/app/server/storeServer'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page() {

    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value
    if(right !=='Admin') return redirect('/')

    const result = await Promise.allSettled([
        getStores(session?.value),
        getUsers(session?.value),
        getLocations(session?.value)
    ])
    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <StoreForm 
                users={result[1].status == 'fulfilled' ? result[1].value : []}
                locations={result[2].status == 'fulfilled' ? result[2].value : []}

            />
            <StoreTable 
                stores={result[0].status == 'fulfilled' ? result[0].value : []} 
            />
        </PageWrapper>
        </Suspense>
    )
}

export default page