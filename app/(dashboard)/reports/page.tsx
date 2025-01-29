import Button from '@/app/components/Button'
import GridTab from '@/app/components/GridTab'
import InputFied from '@/app/components/InputField'
import LineThrough from '@/app/components/LineThrough'
import OrderTable from '@/app/components/OrderTable'
import PageWrapper from '@/app/components/PageWrapper'
import { getCurrentSales } from '@/app/server/orderServer'
import { getProducts } from '@/app/server/productServer'
import { CreditCardIcon, FaceSmileIcon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import { BarChart } from '@mui/icons-material'
import moment from 'moment'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { sumTotal } from '../actions/sumTotalAction'
import AppLoadingIndicator from '@/app/components/AppLoadingIndicator'

async function page() {
     const cookieStore = await cookies()
        const hasCookie = cookieStore.has('session')
        if(!hasCookie) return redirect('/sign-in')
        const session = cookieStore.get('session')
    
        const result = await Promise.allSettled([
            getProducts(session?.value),
            getCurrentSales(session?.value)
        ])
    
        const products = result[0].status == 'fulfilled' ? result[0].value : []
        const currentSales = result[1].status == 'fulfilled' ? result[1].value :[]

    return (
        <Suspense fallback={<AppLoadingIndicator />}>
        <PageWrapper>
            <div
                className='flex items-center my-6'
            >
                <BarChart fontSize='large' className='text-primary'/>
                <p className='text-lg font-semibold text-black'>Sales Report For The Month Of <span className='text-primary'>{
               `${ moment().format('LL').split(' ')[1]} ${ moment().format('LL').split(' ')[2]}`
                
                }</span></p>
            </div>
            <section
                className='grid sm:grid-cols-2 md:grid-cols-4 my-6 gap-x-4'
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
                    url={'/'}      
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
                   
                    subTitle={0} 
                    url={'/'}      
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
                   
                    subTitle={currentSales.length} 
                    url={'/'}      
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
                    url={'/'}      
                    className=' bg-blue-light'          
                
                />
            </section>

            <section>
                <div
                    className='pb-4 flex flex-col'
                >
                    <p
                        className='text-gray-400 text-lg'
                    >You can filter sales record y date range</p>

                    <div
                        className='text-sm items-center grid md:grid-cols-3 w-full mt-2'
                    >
                        <div
                            className='flex items-center w-full bg-gray-200 dark:text-black'
                        >
                            <p
                                className='uppercase px-2'
                            >
                                From
                            </p>
                            <div
                                className='bg-white-light flex-1'
                            >
                                <InputFied  
                                    type='date'
                                    noRadus
                                   
                                />
                            </div>
                        </div>

                        <div
                            className='flex items-center w-full bg-gray-200 dark:text-black'
                        >
                            <p
                                className='uppercase px-2'
                            >
                                From
                            </p>
                            <div
                                className='bg-white-light flex-1'
                            >
                                <InputFied  
                                    type='date'
                                    noRadus
                                />
                            </div>
                        </div>
                        <div
                            className='flex items-center w-full bg-gray-200 ml-2'
                        >
                           
                            <div
                                className='bg-white-light flex-1 flex flex-row items-center'
                            >
                               {/* <SelectInput 
                                    name={'search'}   
                                    handleChange={() => { } }
                                    options={[
                                        {key: 'All Payment', keyValue: 'All'}
                                    ]}  
                                    noBorder                           
                                /> */}
                                <Button 
                                    title={
                                        <div
                                            className='flex  items-center'
                                        >
                                            <MagnifyingGlassIcon className='w-4' />
                                            <p>Search Record</p>
                                        </div>
                                    }
                                    className='bg-black text-white-light p-0'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <OrderTable orders={currentSales} />
            </section>
        </PageWrapper>
        </Suspense>
    )
}

export default page