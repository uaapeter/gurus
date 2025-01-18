import React, { Suspense } from 'react'
import { CreditCardIcon } from '@heroicons/react/16/solid'
import { FaceSmileIcon, ShoppingBagIcon, StarIcon, UserIcon } from '@heroicons/react/24/solid'
import { ShoppingCart } from '@mui/icons-material'
import { CalculatorIcon } from '@heroicons/react/20/solid'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '@/app/server/userServer'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'
import PageWrapper from '@/app/components/PageWrapper'
import GridTab from '@/app/components/GridTab'
import LineThrough from '@/app/components/LineThrough'
import SalesTable from '@/app/components/SalesTable'
import { toTitleCase } from '@/app/actions/textAction'
import { getCurrentSales, getOrders } from '@/app/server/orderServer'
import { getProducts } from '@/app/server/productServer'
import { sumTotal } from '../actions/sumTotalAction'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')

    const result = await Promise.allSettled([
        getAuthenticatedUser(session?.value),
        getCurrentSales(session?.value),
        getProducts(session?.value),
        getOrders(session?.value)
    ])

    const invoices = result[3].status == 'fulfilled' ? result[3].value : []
    const products = result[2].status == 'fulfilled' ? result[2].value : []
    const user = result[0].status == 'fulfilled' ? result[0].value : {}
    const currentSales = result[1].status == 'fulfilled' ? result[1].value :[]

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <div 
                className='mt-4'
            >
                <p className='md:text-lg text-xs'>Welcom to <span className='text-black font-semibold'>WHASTCOM POS, {toTitleCase(user?.fullName)}</span></p>
            </div>
            <section
                className='grid sm:grid-cols-2 md:grid-cols-4 mb-6 gap-x-4'
            >
                <GridTab 
                    title='Daily Sales' 
                    icon={
                        <div
                            className='bg-primary text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                        >
                            <LineThrough/>
                        </div>
                       
                    } 
                    subTitle={sumTotal(currentSales, 'amount')} 
                    url={'/orders'}      
                    className=' bg-primary/35'          
                
                />
                
                <GridTab 
                    title='Weekly Sales' 
                    icon={
                        <div
                            className='bg-red-500 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                        >
                            <CreditCardIcon className='w-4 text-white-light'/>
                        </div>
                    } 
                   
                   subTitle={sumTotal(currentSales, 'amount')} 
                    url={'/reports'}      
                    className=' bg-red-100'          
                
                />

                <GridTab 
                    title='Monthly Sales Records' 
                    icon={
                        <div
                            className='bg-orange-400 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                        >
                            <FaceSmileIcon className='w-4 text-white-light'/>
                        </div>
                    } 
                   
                    subTitle={sumTotal(invoices, 'amount')} 
                    url={'/reports'}      
                    className=' bg-orange-100'          
                
                />
                <GridTab 
                    title='Yearly Sales Records' 
                    icon={
                        <div
                            className='bg-blue-dark text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                        >
                            <ShoppingBagIcon className='w-4 text-white-light'/>
                        </div>
                    } 
                   
                    subTitle={0} 
                    url={'/reports'}      
                    className=' bg-blue-light'          
                
                />
            </section>
            
            <section
                className='grid sm:grid-cols-2 md:grid-cols-2 my-6 gap-x-4 gap-y-4'
            >
                <GridTab 
                    title='Today Invoice' 
                    subTitle={currentSales?.length} 
                    className='bg-white-light text-gray-400 shadow'          
                    leftIcon={
                        <UserIcon className='w-6 text-orange-200' />
                    }
                />

                <GridTab 
                    title='Total Invoices' 
                    subTitle={invoices?.length} 
                    className='bg-white-light text-gray-400 shadow'          
                    leftIcon={
                        <ShoppingCart fontSize='small' className='text-purple-600' />
                    }
                />



                <GridTab 
                    title='Available Products' 
                    subTitle={products?.length} 
                    className='bg-white-light text-gray-400 shadow'          
                    leftIcon={
                        <CalculatorIcon className='w-6 text-purple-400/50' />
                    }
                />
                
                <GridTab 
                    title='Revenue' 
                    subTitle={0.00} 
                    className='bg-white-light text-gray-400 shadow'          
                    leftIcon={
                        <StarIcon  className='text-yellow-600 w-6' />
                    }
                />   

            </section>

            <section
                className='py-2 px-2 w-full shadow rounded'
            >

                <p
                    className='text-primary text-lg font-semibold'
                >
                    {`Today's`} Transactions
                </p>

                <SalesTable sales={currentSales} />

            </section>
        </PageWrapper>
        </Suspense>
    )
}

export default page