import PageWrapper from '@/app/components/PageWrapper'
import React from 'react'
import CategoryTable from './CategoryTable'
import CategoryForm from './CategoryForm'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCategories } from '@/app/server/categoryServer'

async function page() {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value

    const categories = await getCategories(session?.value)

    return (
        <PageWrapper>
            <CategoryForm 
                right={right}
                token={session?.value} 
            />
            <CategoryTable 
                right={right}
                categories={categories} 
            />
        </PageWrapper>
    )
}

export default page