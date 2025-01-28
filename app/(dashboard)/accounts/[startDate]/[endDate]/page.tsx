import PageWrapper from '@/app/components/PageWrapper'
import { getBalanceSheet } from '@/app/server/orderServer'
import { BarChart } from '@mui/icons-material'
import moment from 'moment'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import AccountFeed from '../../AccountFeed'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page({params}:{params:any}) {
    const { startDate, endDate } = await params
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')

    const result = await Promise.allSettled([
        getBalanceSheet(startDate, endDate, session?.value),
    ])

    const balancesheet = result[0].status == 'fulfilled' ? result[0].value : []

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
            <PageWrapper>
                <div
                    className='flex items-center pt-2 sticky top-0'
                >
                    <BarChart fontSize='large' className='text-primary'/>
                    <p className='text-lg font-semibold text-black'>Accounting Report
                        <span className='text-primary hidden'>{
                        `${ moment().format('LL').split(' ')[1]} ${ moment().format('LL').split(' ')[2]}`
                            }
                        </span>
                    </p>
                </div>
                <AccountFeed balancesheet={balancesheet} />
            
            </PageWrapper>
        </Suspense>
    )
}

export default page