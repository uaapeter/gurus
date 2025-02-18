'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export const getDisounts = async (token: any) =>{
      
    const {data, status} = await api.get(`/discount`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.discounts
}

export async function createDiscount(prevState:any, formData:FormData) {
    let result
    try {
        const rawFormData = {
            prevState,
            _id: formData.get('_id'),
            status: formData.get('status'),
            discountValue: formData.get('discountValue'),
            discountName: formData.get('discountName'),
        }

        const token = formData.get('token')
       
        const { data, status } = await api.post('/discount', rawFormData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if(status !== 200) {
            throw new Error('Something went wrong')
        }
        // console.log(data)
        // AsyncStorage.setItem('token', data.token)
        // const oneDay = 24 * 60 * 60 * 1000
        result = data
    } catch (error:any) {
       if(error.response.data.message) return {message: error.response.data.message}
       return {message: 'Error'}
    }

   revalidatePath('/discount')
    return {message: result}
}