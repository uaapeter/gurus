'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export const getStores = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/store`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.stores
}

export async function createStore( prevState:any, formData:FormData) {

    try {
        const token = formData.get('token')
        const rawFormData = {
            prevState,
            _id: formData.get('_id'),
            storeName: formData.get('storeName'),
            manager: formData.get('manager'),
            location: formData.get('location'),
            storePhone: formData.get('storePhone'),
            status: formData.get('status'),
            storeEmail: formData.get('storeEmail'),

            storeAddress: formData.get('storeAddress'),
        }
       

        const { status } = await api.post('/store', rawFormData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(status !== 200) {
            return {message: 'Something went wrong'}
        }
        
    } catch (error:any) {
       if(error.response.data.message) return {message: error.response.data.message}
       return {message: 'Error: Something went wrong'}
    }

   revalidatePath('/stores')
   

}