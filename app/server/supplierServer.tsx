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

export async function createSupplier( prevState:any, formData:FormData) {

    try {
        const token =  formData.get('token')
        const rawFormData = {
            prevState,
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
            return {message: 'Something went wrong'}
        }
        // console.log(data)
        // AsyncStorage.setItem('token', data.token)
        // const oneDay = 24 * 60 * 60 * 1000
        
    } catch (error:any) {
       if(error.response.data.message) return {message: error.response.data.message}
        return {message: 'Error'}
    }

   revalidatePath('/suppliers')
   

}