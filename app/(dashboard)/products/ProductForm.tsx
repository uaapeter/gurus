'use client'
import AppModalDialog from '@/app/components/AppModalDialog'
import Button from '@/app/components/Button'
import FlexRow from '@/app/components/FlexRow'
import InputFied from '@/app/components/InputField'
import SelectInput from '@/app/components/SelectInput'
import { selectSelectedProduct, setSelectedProduct } from '@/app/reducers/productReducer'
import { selectIsLoading, selectIsOpen, setIsLoading, setIsOpen } from '@/app/reducers/uiReducer'
import { createProduct } from '@/app/server/productServer'
import { PencilSquareIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { CircularProgress } from '@mui/material'

type productType = {
    token: any,
    right: any,
    stores: any[], 
    categories: any[], suppliers: any[]
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ProductForm({token, stores, categories, suppliers, right} : productType) {
    const dispatch = useDispatch()
    const open = useSelector(selectIsOpen)
    const isLoading = useSelector(selectIsLoading) 
    const selectedProduct = useSelector(selectSelectedProduct)
    return (
        <section>

           

            <div
                className='py-4 flex items-center w-full justify-between border-b-[0.1px] border-b-gray-200' 
            >
                <p
                    className='text-lg font-semibold text-black'
                >
                    Stock Inventory
                </p>

                {
                    right == 'Admin' ?
                    <Button 
                        title={
                            <div
                                className='flex space-x-2'
                            >
                                <PlusCircleIcon className='w-4' />
                                <p className='text-sm'>Add New Product</p>
                            </div>
                        }
                        onClick={() => {
                            dispatch(setSelectedProduct(null))
                            dispatch(setIsOpen(!open))
                        }}
                        className='bg-primary text-white-light'
                    />
                    :
                    <></>
                }
            </div>
            <AppModalDialog
                open={open}
                setOpen={() => dispatch(setIsOpen(!open))} 
                title='Add New Product' 
                className='md:max-w-1xl'
                onClick={() =>{}}
            >
                <form action={(formData: FormData) => {
                    dispatch(setIsLoading(true))
                    createProduct(formData, token)

                    setTimeout(() => {
                        dispatch(setIsLoading(false))
                        dispatch(setIsOpen(!open))
                    }, 2000);
                }}
                    className='px-4 py-6'
                >
                    <FlexRow
                        className='flex-col'
                    >
                        <label htmlFor="barcode" className='text-left text-sm'>
                            Barcode
                        </label>
                        <InputFied 
                            height='h-12'
                            name='barcode'
                            placeholder='e.g 156000261201'
                            value={selectedProduct?.barcode}
                        />
                        <input hidden value={selectedProduct?._id} name="_id" />
                    </FlexRow>
                    <FlexRow
                        className='md:flex-row flex-col md:space-x-2 mt-4'
                    >
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="productBatch" className='text-left text-sm'>
                                Product Batch
                            </label>
                            <InputFied 
                                height='h-12'
                                name='productBatch'
                                placeholder='e.g jan-2024 Batch'
                                value={selectedProduct?.productBatch}
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="productName" className='text-left text-sm'>
                                Product Name
                            </label>
                            <InputFied 
                                height='h-12'
                                name='productName'
                                placeholder='e.g T-shirt'
                                value={selectedProduct?.productName}
                            />
                        </FlexRow>
                    </FlexRow>
                    <FlexRow
                        className='flex-col mt-4'
                    >
                        <label htmlFor="productDescription" className='text-left text-sm'>
                            Product Description
                        </label>
                        <InputFied 
                            height='h-12'
                            name='productDescription'
                            placeholder='Men T-shirt'
                            value={selectedProduct?.productDescription}
                        />
                    </FlexRow>

                    <FlexRow
                        className='md:flex-row flex-col md:space-x-2 mt-4'
                    >
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="costPrice" className='text-left text-sm'>
                                Cost Price
                            </label>
                            <InputFied 
                                height='h-12'
                                name='costPrice'
                                placeholder='N2000'
                                type='number'
                                value={selectedProduct?.costPrice}
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="sellingPrice" className='text-left text-sm'>
                                Selling Price
                            </label>
                            <InputFied 
                                height='h-12'
                                name='sellingPrice'
                                placeholder='N2500'
                                type='number'
                                value={selectedProduct?.sellingPrice}
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="cartonQty" className='text-left text-sm'>
                               Qty (Cartons)
                            </label>
                            <InputFied 
                                height='h-12'
                                name='cartonQty'
                                type='number'
                                value={selectedProduct?.cartonQty}
                            />
                        </FlexRow>
                    </FlexRow>

                    <FlexRow
                        className='md:flex-row flex-col md:space-x-2 mt-4'
                    >
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="supplier" className='text-left'>
                                Supplier
                            </label>
                            <SelectInput 
                                options={
                                    suppliers.flatMap(item => {
                                        return ({
                                            key: item?.supplierName, keyValue: item?._id
                                        })
                                    })
                                }
                                name='supplier'
                                handleChange={() => {}} 
                                value={selectedProduct?.supplier?._id}
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="category" className='text-left'>
                                Category
                            </label>
                            <SelectInput 
                                options={
                                    categories.flatMap(item => {
                                        return ({
                                            key: item?.categoryName, keyValue: item?._id
                                        })
                                    })
                                }
                                name='category'
                                handleChange={() => {}}
                                value={selectedProduct?.category?._id}                     
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="store" className='text-left'>
                                Shop
                            </label>
                            <SelectInput 
                                options={
                                    stores.flatMap(item => {
                                        return ({
                                            key: item?.storeName, keyValue: item?._id
                                        })
                                    })
                                }
                                name='store'
                                handleChange={() => {}}
                                value={selectedProduct?.store?._id}
                            />
                        </FlexRow>
                    </FlexRow>

                    <FlexRow
                        className='md:flex-row flex-col md:space-x-2 mt-4'
                    >
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="mftDate" className='text-left text-sm'>
                                MFT Date
                            </label>
                            <InputFied 
                                height='h-12'
                                name='mftDate'
                                type='date'
                                value={selectedProduct?.mftDate}
                            />
                        </FlexRow>
                        <FlexRow
                            className='flex-col'
                        >
                            <label htmlFor="expireDate" className='text-left text-sm'>
                               Expire Date
                            </label>
                            <InputFied 
                                height='h-12'
                                name='expireDate'
                                type='date'
                                value={selectedProduct?.expireDate}
                            />
                        </FlexRow>
                    </FlexRow>

                    <div
                        className='mt-4'
                    >
                        <Button 
                        
                        title={
                            <div
                                className='flex'
                            >
                                {
                                        selectedProduct ? <PencilSquareIcon className='w-4' />
                                        :<PlusCircleIcon className='w-4' />
                                    }
                                    <p>{selectedProduct? 'Edit' : 'Submit'}</p>
                                    {
                                        isLoading? <CircularProgress size={20} />: <></>
                                    }
                                </div>
                            }
                            className='bg-primary text-white-light'
                        />
                    </div>
                </form>
            </AppModalDialog>
        </section>
    )
}

export default ProductForm