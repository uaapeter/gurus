import React, { Suspense } from 'react'
import PageWrapper from '../components/PageWrapper'
import LineThrough from '../components/LineThrough'
import { CreditCardIcon } from '@heroicons/react/16/solid'
import { BuildingStorefrontIcon, CalendarDateRangeIcon, FaceSmileIcon, PercentBadgeIcon, ShoppingBagIcon, StarIcon, UserIcon, UsersIcon } from '@heroicons/react/24/solid'
import { ShoppingCart } from '@mui/icons-material'
import { CalculatorIcon } from '@heroicons/react/20/solid'
import TodayMoment from '../components/TodayMoment'
import SalesTable from '../components/SalesTable'
import GridTab from '../components/GridTab'
import AppLoadingIndicator from '../components/AppLoadingIndicator'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getAuthenticatedUser, getUsers } from '../server/userServer'
import { toTitleCase } from '../actions/textAction'
import { getCurrentSales, getOrders } from '../server/orderServer'
import { sumTotal } from './actions/sumTotalAction'
import { getStores } from '../server/storeServer'
import { getSuppliers } from '../server/supplierServer'
import { getProducts, getProductsExpiringToday } from '../server/productServer'

async function page() {

    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')

    const result = await Promise.allSettled([
        getAuthenticatedUser(session?.value),
        getCurrentSales(session?.value),
        getUsers(session?.value),
        getStores(session?.value),
        getSuppliers(session?.value),
        getOrders(session?.value),
        getProducts(session?.value),      
        getProductsExpiringToday(session?.value, 0)
        
    ])

    
    const products = result[6].status == 'fulfilled' ? result[6].value : []
    const invoices = result[5].status == 'fulfilled' ? result[5].value : []
    const suppliers = result[4].status == 'fulfilled' ? result[4].value : []
    const stores = result[3].status == 'fulfilled' ? result[3].value : []
    const users = result[2].status == 'fulfilled' ? result[2].value : []
    const user = result[0].status == 'fulfilled' ? result[0].value : {}
    const currentSales = result[1].status == 'fulfilled' ? result[1].value :[]

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
            <PageWrapper>
                <div 
                    className='mt-4'
                >
                    <p className='md:text-lg text-xs dark:text-black/50'>Welcom to <span className='text-black/50 font-semibold'>WHASTCOM POS, {toTitleCase(user?.fullName)}</span></p>
                </div>
                <section
                    className='grid sm:grid-cols-2 md:grid-cols-4 mb-6 gap-x-4'
                >
                    <GridTab 
                        title='Today Sales' 
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
                        title='Expired' 
                        icon={
                            <div
                                className='bg-red-500 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <CreditCardIcon className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={result[7].status == 'fulfilled' ? result[7].value?.length : 0} 
                        url={`/expired/${0}`}      
                        className=' bg-red-100'          
                    />

                    <GridTab 
                        title='Today Invoice' 
                        icon={
                            <div
                                className='bg-orange-400 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <FaceSmileIcon className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={currentSales?.length} 
                        url={'/orders'}      
                        className=' bg-orange-100'          
                    
                    />
                    <GridTab 
                        title='New Products' 
                        icon={
                            <div
                                className='bg-blue-dark text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <ShoppingBagIcon className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={products.length} 
                        url={'/products'}      
                        className=' bg-blue-light'          
                    
                    />
                </section>
                
                <section
                    className='grid sm:grid-cols-2 md:grid-cols-3 my-6 gap-x-4 gap-y-4'
                >
                    <GridTab 
                        title='Suppliers' 
                        subTitle={suppliers?.length} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <UserIcon className='w-6 text-orange-200' />
                        }
                    />

                    <GridTab 
                        title='Invoices' 
                        subTitle={invoices.length} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <ShoppingCart fontSize='small' className='text-purple-600' />
                        }
                    />

                    <GridTab 
                        title='Current Month Sales' 
                        subTitle={sumTotal(currentSales, 'amount')} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <PercentBadgeIcon className='w-6 text-brown-400' />
                        }
                    />

                    <GridTab 
                        title='Last 3 Month Record' 
                        subTitle={0.00} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <CalculatorIcon className='w-6 text-purple-400' />
                        }
                    />

                    <GridTab 
                        title='Last 6 Month Record Sales' 
                        subTitle={0.00} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <CalendarDateRangeIcon className='text-blue-light w-6' />
                        }
                    />

                    <GridTab 
                        title='Users' 
                        subTitle={users?.length} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <UsersIcon className='w-6 text-success' />
                        }
                    />  


                    <GridTab 
                        title='Available Products' 
                        subTitle={products.length} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <ShoppingBagIcon className='w-6 text-orange-500' />
                        }
                    />

                    <GridTab 
                        title='Current Year Revenue' 
                        subTitle={0.00} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <StarIcon  className='text-yellow-600 w-6' />
                        }
                    />

                    <GridTab 
                        title='Stores' 
                        subTitle={stores?.length} 
                        className='bg-white-light text-gray-400 shadow'          
                        leftIcon={
                            <BuildingStorefrontIcon className='w-6 text-purple-400' />
                        }
                    />      

                </section>

                <section
                    className='py-2 px-2 w-full shadow rounded'
                >
                    <p
                        className='text-primary text-lg font-semibold'
                    >
                        {`Today's`} <span className='text-red-500'>(<TodayMoment className='bg-transparent shadow-none' />)</span> Transactions
                    </p>

                    <SalesTable sales={currentSales} />

                </section>
            </PageWrapper>
        </Suspense>
    )
}

export default page