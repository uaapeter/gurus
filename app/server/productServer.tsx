'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export const getProducts = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/product`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.products
}

export const getProductsExpiringToday = async (token: any, indays:number) =>{
  
      
    const {data, status} = await api.get(`/product/expired/${indays}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.products
}

export async function createProduct(formData:FormData, token:any) {

    try {
        const rawFormData = {
            _id: formData.get('_id'),
            barcode: formData.get('barcode'),
            productBatch: formData.get('productBatch'),
            productName: formData.get('productName'),
            productDescription: formData.get('productDescription'),
            costPrice: formData.get('costPrice'),
            sellingPrice: formData.get('sellingPrice'),
            cartonQty: formData.get('cartonQty'),
            supplier: formData.get('supplier'),
            category: formData.get('category'),
            store: formData.get('store'),
            mftDate: formData.get('mftDate'),
            expireDate: formData.get('expireDate'),

        }
       

        const { status } = await api.post('/product', rawFormData, {
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

   revalidatePath('/products')
   

}