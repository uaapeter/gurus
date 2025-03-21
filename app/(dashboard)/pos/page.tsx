import PageWrapper from '@/app/components/PageWrapper'
import PosForm from './PosForm'
import PosTable from './PosTable'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getProducts } from '@/app/server/productServer'
import { getSavedOrders } from '@/app/server/orderServer'
import { getDisounts } from '@/app/server/discountServer'
import { getUsers } from '@/app/server/userServer'
import { Fragment, Suspense } from 'react'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'
import { getCharges } from '@/app/server/chargesServer'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    // if(right !=='Admin') return redirect('/')

    const result = await Promise.allSettled([   
        getProducts(session?.value),
        getSavedOrders(session?.value),
        getDisounts(session?.value),
        getUsers(session?.value),
        getCharges(session?.value)
    ])
    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <Fragment>
                <PosForm 
                    products={result[0].status == 'fulfilled' ? result[0].value : []}
                />
                <PosTable 
                    users={result[3].status == 'fulfilled'? result[3].value: []}
                    charges={result[4].status == 'fulfilled'? result[4].value: []}
                    discounts={result[2].status == 'fulfilled' ? result[2].value : []}
                    pendingsales={result[1].status == 'fulfilled' ? result[1].value :[]} token={`${session?.value}`}
                />
            </Fragment>
        </PageWrapper>
        </Suspense>
    )
}

export default page