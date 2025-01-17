'use client'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import { selectData, setData, setSelectedProduct } from '@/app/reducers/productReducer'
import { Autocomplete, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function PosForm({products}: {products:any[]}) {
    const dispatch = useDispatch()
    const data:any = useSelector(selectData)
    const barCodeScanner = () => {
        document.addEventListener('keydown keyup keypress', function(evt:any) {
            evt.preventDefault()
        })
    }

    useEffect(() => barCodeScanner(), [])
    
     
    return (
        <form
            className='mt-6'
        >
            <div
                className='md:grid grid-cols-2 md:gap-y-4 gap-x-4'
            >
                <FlexRow
                    className='flex-col'
                >
                    <label htmlFor="customerName" className='text-left text-sm'>
                        Customer Name:
                    </label>
                    <InputFied 
                        name='customerName'
                        value={data?.customerName}
                        placeholder='Optional [Required for credit sales]'
                        handleChange={(e) =>dispatch(setData({name:'customerName', value: e.target.value}))}
                    />
                </FlexRow>
                <FlexRow
                    className='flex-col'
                >
                    <label htmlFor="customerPhone" className='text-left text-sm'>
                       Phone
                    </label>
                    <InputFied 
                        name='customerPhone'
                        placeholder='Optional [Required for credit sales]'
                        handleChange={(e) =>dispatch(setData({name:'customerPhone', value: e.target.value}))}
                    />
                </FlexRow>

                <FlexRow
                    className='flex-col'
                >
                    <label htmlFor="customerEmail" className='text-left text-sm'>
                        Email:
                    </label>
                    <InputFied 
                        name='customerEmail'
                        height='h-14'
                        placeholder='Optional [Required for credit sales]'
                        handleChange={(e) =>dispatch(setData({name:'customerEmail', value: e.target.value}))}

                    />
                </FlexRow>

                <FlexRow
                    className='flex-col '
                >
                    <label htmlFor="customer" className='text-left text-sm'>
                        Select Product {`>>`} Category
                    </label>
                    
                    <Stack
                        className='p-0'
                    >
                        <Autocomplete
                            id='product'
                            onChange={(_e, value) =>{
                                const product = products?.find(item => item.productName === value?.split('-')[0].trim())
                                dispatch(setSelectedProduct(product))
                            }}
                            options={products.map((option) => `${option.productName} - ${option.category?.categoryName} (N${option.sellingPrice})`)}
                            renderInput={(params) => <TextField {...params} 
                            label='Search...' 
                            size='small'
                            className='hover:ring-0 border-none ring-0 outline-none'
                            
                        />}
                        
                        />
                        
                    </Stack>
                </FlexRow>
                
            </div>
            
        </form>
    )
} 

export default PosForm