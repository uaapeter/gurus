import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import SupplierTable from './SupplierTable'
import SupplierForm from './SupplierForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSuppliers } from '@/app/server/supplierServer'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value
    // if(right !=='Admin') return redirect('/')

    const suppliers = await getSuppliers(session?.value)
    return (
        <Suspense fallback={<AppLoadingIndicator />}>
            <PageWrapper>
                <SupplierForm token={session?.value} />
                <SupplierTable suppliers={suppliers} />
            </PageWrapper>
        </Suspense>
    )
}

export default page