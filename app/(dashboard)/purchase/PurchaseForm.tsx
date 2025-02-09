'use client'
import FlexRow from '@/app/components/FlexRow'
import { setSelectedProduct } from '@/app/reducers/productReducer'
import { setSelectedSupplier } from '@/app/reducers/supplierReducer'
import { Autocomplete, Stack, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function PosForm({products, suppliers}: {products:any[], suppliers:any[]}) {
    const dispatch = useDispatch()
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
                {/* <FlexRow
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
                </FlexRow> */}
                {/* <FlexRow
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
                </FlexRow> */}

                {/* <FlexRow
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
                </FlexRow> */}
                 <FlexRow
                    className='flex-col '
                >
                    {/* <label htmlFor="customer" className='text-left text-sm'>
                        Select Supplier
                    </label> */}
                    
                    <Stack
                        className='p-0'
                    >
                        <Autocomplete
                            id='supplier'
                            onChange={(_e, value) =>{
                                const supplier = suppliers?.find(item => item.supplierName?.trim() === value?.trim())
                                
                                dispatch(setSelectedSupplier(supplier))
                            }}
                            options={suppliers.map((option) => `${option.supplierName}`)}
                            renderInput={(params) => <TextField {...params} 
                            label=' Select Supplier' 
                            size='small'
                            className='hover:ring-0 border-none ring-0 outline-none'
                            
                        />}
                        
                        />
                        
                    </Stack>
                </FlexRow>

                <FlexRow
                    className='flex-col '
                >
                    {/* <label htmlFor="customer" className='text-left text-sm'>
                        Select Product {`>>`} Category
                    </label> */}
                    
                    <Stack
                        className='p-0'
                    >
                        <Autocomplete
                            id='product'
                            onChange={(_e, value) =>{
                                const product = products?.find(item => item.productName?.trim() === value?.split('-')[0].trim())
                                dispatch(setSelectedProduct(product))
                            }}
                            options={products.map((option) => `${option.productName} - ${option.category?.categoryName} (N${option.costPrice})`)}
                            renderInput={(params) => <TextField {...params} 
                            label='Select Product' 
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