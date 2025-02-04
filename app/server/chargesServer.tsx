'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export const getCharges = async (token: any) =>{
      
    const {data, status} = await api.get(`/charges`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.charges
}

export async function createCharge(prevState:any, formData:FormData) {
    let result
    try {
        
        const rawFormData = {
            prevState,
            _id: formData.get('_id'),
            status: formData.get('status'),
            chargeValue: formData.get('chargeValue'),
            chargeName: formData.get('chargeName'),
        }

        const token = formData.get('token')
       
        const { data, status } = await api.post('/charges', rawFormData, {
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

   revalidatePath('/charges')
    return {message: result}
}