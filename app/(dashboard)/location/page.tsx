import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import LocationTable from './LocationTable'
import LocationForm from './LocationForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getLocations } from '@/app/server/locationServer'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value

    const locations = await getLocations(session?.value)

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
            <PageWrapper>
                <LocationForm 
                    right={right}
                    token={session?.value} 
                />
                <LocationTable 
                    right={right}
                    locations={locations} 
                />
            </PageWrapper>
        </Suspense>
    )
}

export default page