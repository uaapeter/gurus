'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export const getCategories = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/category`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.categories
}

export async function createCategory(prevState:any, formData:FormData
) {

    try {
        const token = formData.get('token')
        const rawFormData = {
            prevState,
            _id: formData.get('_id'),
            categoryName: formData.get('categoryName'), 
        }
       
        const { status } = await api.post('/category', rawFormData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if(status !== 200) {
           return {message: 'Something went wrong'}
        }
        
        
    } catch (error:any) {
       if(error.response.data.message) return {message: error?.response?.data?.message}
       return {message: 'Error: Something went wrong'}
    }

   revalidatePath('/category')
   

}