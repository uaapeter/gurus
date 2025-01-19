'use server'
import { cookies } from "next/headers"
import { api } from "../apiHooks/api"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export const getUsers = async (token: any) =>{
  
      
    const {data, status} = await api.get(`/user`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data.users
}

export const getUserById = async (id: string, token: any) =>{
  
      
    const {data, status} = await api.get(`/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(status !== 200 ) throw new Error(data.message)
       
    return data
}


export async function hanldeLogIn(prevState:any, formData:FormData) {
    'use server'
    let right
    try {
        const rawFormData = {
            prevState,
            username: formData.get('username'),
            password: formData.get('password')

        }
       

        const { data, status } = await api.post('/user/login', rawFormData)

        if(status !== 200) {
            if(status !== 201 ) throw new Error(data.message)
        }
        // console.log(data)
        // AsyncStorage.setItem('token', data.token)
        // const oneDay = 24 * 60 * 60 * 1000
        
            // console.log(data)
            // AsyncStorage.setItem('token', data.token)
            // const oneDay = 24 * 60 * 60 * 1000 
            
            // console.log(data)
            // AsyncStorage.setItem('token', data.token)
            // const oneDay = 24 * 60 * 60 * 1000
            // console.log(data)
            // AsyncStorage.setItem('token', data.token)
            // const oneDay = 24 * 60 * 60 * 1000
            (await cookies()).set({
                name: 'session',
                value: data.token,
                httpOnly:true,
                expires: new Date().setTime(new Date().getTime() + 8 * 60 * 8000)
            
             });
        (await cookies()).set({
            name: 'right',
            value: data.role,
            httpOnly:true,
            expires: new Date().setTime(new Date().getTime() + 8 * 60 * 8000)
            
        });
        right = data.role
       
        // return {message: 'Success'}
    } catch (error:any) {
       if(error.response.data.message) return {message: error.response.data.message}
       return {message: 'Something went wrong '}
    }

            if(right && right == 'Admin') return redirect('/')
            return redirect('/home')
   

}


export async function handleLogOut() {
    (await cookies()).delete('session');
    (await cookies()).delete('right')

    redirect('/sign-in')
}

export const changePassword = async (formData:FormData) =>{
    'use server'
    try {
        const token = formData.get('token')

        const form = {
            userId: formData.get('userId'),
            password: formData.get('password'),
            oldPassword: formData.get('oldPassword'),
            confirmPassword: formData.get('confirmPassword')
        }
    
        const {data, status} = await api.put(`user/password`, form, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(status !== 201 ) throw new Error(data.message)
        ;(await cookies()).delete('session')
        ;(await cookies()).delete('right')

   } catch (error:any) {
    if(error?.response?.data?.message)  throw new Error(error?.response?.data?.message)
    throw new Error('Error')

   }

   redirect('/sign-in')

}

export const getAuthenticatedUser = async (token:string | undefined) =>{
    if(!token || token ==  undefined ) throw new Error('Session Expired')
    const { data, status } = await api.get('/user/auth', {
    headers: {
        'Authorization': `Bearer ${token}`
    }})

    if(status !== 200) throw new Error(data.message)

    return data.user

}

export const getAllUsers = async (token:string | undefined) =>{
    if(!token || token ==  undefined ) throw new Error('Session Expired')
    const { data, status } = await api.get('/user', {
    headers: {
        'Authorization': `Bearer ${token}`
    }})

    if(status !== 200) throw new Error(data.message)

    return data.users

}


export async function createUser(prevState:any, formData:FormData) {

    try {
        
        const token = formData.get('token')
        const rawFormData = {
            prevState,
            _id: formData.get('_id'),
            username: formData.get('username'),
            fullName: formData.get('fullName'),
            phoneNumber: formData.get('phoneNumber'),
            emailAddress: formData.get('emailAddress'),
            password: formData.get('password'),
            role: formData.get('role'),
            store: formData.get('store'),
        }

        
        const { status} = await api.post(`/user`, rawFormData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if(status !== 200 ) return {message: 'Something went wrong'}

    } catch (error:any) {
        
        if(error?.response?.data?.message)  return {message: error?.response?.data?.message}
       return {message: 'Error: Something went wrong'}
    }

    revalidatePath('/users')
}