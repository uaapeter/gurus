import PageWrapper from '@/app/components/PageWrapper'
import React, { Suspense } from 'react'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCategories } from '@/app/server/categoryServer'
import { getProducts } from '@/app/server/productServer'
import { getSuppliers } from '@/app/server/supplierServer'
import { getStores } from '@/app/server/storeServer'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value
    // if(right !=='Admin') return redirect('/')

    const result = await Promise.allSettled([
        getStores(session?.value),
        getCategories(session?.value),
        getProducts(session?.value),
        getSuppliers(session?.value)
    ])


    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <ProductForm 
                right={right}
                token={session?.value}
                stores={result[0].status == 'fulfilled' ? result[0].value : []}
                categories={result[1].status == 'fulfilled' ? result[1].value : []}
                suppliers={result[3].status == 'fulfilled' ? result[3].value : []} 
            />
            <ProductTable 
                right={right}
                products={result[2].status == 'fulfilled' ? result[2].value  : []} 
            />
        </PageWrapper>
        </Suspense>
    )
}

export default page