import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import UserTable from './UserTable'
import UserForm from './UserForm'
import { getStores } from '@/app/server/storeServer'
import { getUsers } from '@/app/server/userServer'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
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
    ])

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <UserForm 
                token={session?.value}
                stores={result[0].status == 'fulfilled' ? result[0].value : []}
            />
            <UserTable 
                users={result[1].status == 'fulfilled' ? result[1].value : []}
            />
        </PageWrapper>
        </Suspense>
    )
}

export default page