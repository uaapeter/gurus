'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export const getSuppliers = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/supplier`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.suppliers
}

export async function createSupplier(formData:FormData, token:any) {

    try {
        const rawFormData = {
            _id: formData.get('_id'),
            supplierName: formData.get('supplierName'),
            companyName: formData.get('companyName'),
            supplierEmail: formData.get('supplierEmail'),
            supplierPhone: formData.get('supplierPhone'),
            supplierAddress: formData.get('supplierAddress')
        }
       

        const { status } = await api.post('supplier', rawFormData, {
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

   revalidatePath('/suppliers')
   

}