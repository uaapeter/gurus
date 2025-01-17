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

export async function createCategory(formData:FormData, token:any) {

    try {
        const rawFormData = {
            _id: formData.get('_id'),
            categoryName: formData.get('categoryName'),
          
        }
       
        const { status } = await api.post('/category', rawFormData, {
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
        
    } catch (error:any) {
       if(error.response.data.message) throw new Error(error.response.data.message)
       throw new Error('Error')
    }

   revalidatePath('/category')
   

}