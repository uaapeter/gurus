

import GridTab from '@/app/components/GridTab'
import PageWrapper from '@/app/components/PageWrapper'
import { CheckIcon, CreditCardIcon, FaceSmileIcon, } from '@heroicons/react/24/solid'
import { ShoppingCart } from '@mui/icons-material'
import React, { Suspense } from 'react'
import ExpiredTable from '../ExpiredTable'
import { getProductsExpiringToday } from '@/app/server/productServer'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'



async function page({params}:{params:any}) {

     const cookieStore = await cookies()
        const hasCookie = cookieStore.has('session')
        if(!hasCookie) return redirect('/sign-in')
        const session = cookieStore.get('session')
        const right = cookieStore.get('right')?.value
        if(right !=='Admin') return redirect('/')

        const { slug } = await params

    const result = await Promise.allSettled([
        getProductsExpiringToday(session?.value, slug),
    ])

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
            <PageWrapper>
                <div
                    className='flex items-center my-6'
                >
                    <p className='text-lg font-semibold text-red-500'>Expiration Notification </p>
                </div>
                <section
                    className='grid sm:grid-cols-2 md:grid-cols-4 my-6 gap-x-4'
                >

                    <GridTab 
                        title='Expires Today' 
                        icon={
                            <div
                                className='bg-red-500 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <ShoppingCart className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={result[0].status == 'fulfilled' ? result[0].value?.length : 0} 
                        url={`/expired/${0}`}      
                        className=' bg-red-100'          
                    
                    />
                    
                    <GridTab 
                        title='Expires In 7 Days' 
                        icon={
                            <div
                                className='bg-red-500 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <CreditCardIcon className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={0} 
                        url={`/expired/${1}`}   
                        className=' bg-red-100'          
                    
                    />

                    <GridTab 
                        title='Expires In 3 Month Time' 
                        icon={
                            <div
                                className='bg-orange-400 text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <FaceSmileIcon className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={0} 
                        url={`/expired/${2}`}     
                        className=' bg-orange-100'          
                    
                    />
                    <GridTab 
                        title='Expires In 6 Month' 
                        icon={
                            <div
                                className='bg-blue-dark text-white-light text-sm h-7 w-8 flex items-center justify-center rounded-md'
                            >
                                <CheckIcon className='w-4 text-white-light'/>
                            </div>
                        } 
                    
                        subTitle={0} 
                        url={`/expired/${3}`}     
                        className=' bg-blue-light'          
                    
                    />
                </section>

                <section>
                    <div
                        className='pb-4 flex flex-col'
                    >
                        <p
                            className='text-black font-semibold text-sm'
                        >Expiration Details</p>

                    
                    </div>
                    <ExpiredTable 
                        products={result[0].status == 'fulfilled' ? result[0].value : []} right={right}/>
                </section>
            </PageWrapper>
        </Suspense>
    )
}

export default page