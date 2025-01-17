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

export async function createStore(formData:FormData) {

    try {
        const rawFormData = {
            _id: formData.get('_id'),
            storeName: formData.get('storeName'),
            manager: formData.get('manager'),
            location: formData.get('location'),
            storePhone: formData.get('storePhone'),
            status: formData.get('status'),
            storeEmail: formData.get('storeEmail'),

            storeAddress: formData.get('storeAddress'),
        }
       

        const { status } = await api.post('/store', rawFormData)

        if(status !== 200) {
            throw new Error('Something went wrong')
        }
        // console.log(data)
        // AsyncStorage.setItem('token', data.token)
        // const oneDay = 24 * 60 * 60 * 1000
        
    } catch (error:any) {
       if(error.response.data.message) throw new Error(error.response.data.message)
       throw new Error('Error')
    }

   revalidatePath('/stores')
   

}