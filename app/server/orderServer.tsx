
'use server'
import { revalidatePath } from "next/cache"
import { api } from "../apiHooks/api"

export async function handleSales(formData:any, token:any, save:boolean) {

    let result

    try {
        
        const { data, status } = await api.post('/order', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

        if(status !== 200) {
            throw new Error('Something went wrong')
        }
        result = data
        
    } catch (error:any) {
       if(error.response.data.message) throw new Error(error.response.data.message)
       throw new Error('Error')
    }

    if(save) {
        // callBack(result)
        return revalidatePath('/pos')
    }

  return result


}
export const getBalanceSheet = async (startDate:any, endDate:any, token: any) =>{
  
      
    const {data, status} = await api.get(`/order/balancesheet/${startDate}/${endDate}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.result
}


export const getOrders = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/order`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.orders
}

export const getOrdersOnCredit = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/order/unpaid`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.orders
}

export const getCurrentSales = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/order/current`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.orders
}


export const getSavedOrders = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/order/saved`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.orders
}



