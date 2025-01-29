'use client'
import Button from '@/app/components/Button'
import InputFied from '@/app/components/InputField'
import SelectInput from '@/app/components/SelectInput'
import { addToCart, removeFromCart, selectCart, selectCartQuantity, selectData, 
    selectOrderType, selectSelectedProduct, setCart, setCartQuantity, setData, setOrderType, setSaleForm, setSelectedProduct 
} from '@/app/reducers/productReducer'
import { MinusCircleIcon, PlusCircleIcon, PrinterIcon, TrashIcon } from '@heroicons/react/24/solid'
import { CircularProgress, IconButton, TextField } from '@mui/material'
import React, { Fragment, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'
import { sumTotal } from '../actions/sumTotalAction'
import LineThrough from '@/app/components/LineThrough'
import { selectError, selectIsLoading, selectSuccess, setError, setIsLoading, setSuccess } from '@/app/reducers/uiReducer'
import AppSnackbar from '@/app/components/AppSnackbar'
import { handleSales } from '@/app/server/orderServer'
import AppModalDialog from '@/app/components/AppModalDialog'
import Invoice from '@/app/components/Invoice'
import { useReactToPrint } from 'react-to-print'
import { selectSelectedOrder, setSelectedOrder } from '@/app/reducers/orderReducer'
import BackDrop from '@/app/components/BackDrop'
import AppChip from '@/app/components/AppChip'
import { toTitleCase } from '@/app/actions/textAction'
import {amtToWords} from '@/app/actions/amountTowords'

function PosTable({ users, token, discounts, pendingsales}: { users: any[], discounts:any[], pendingsales:any[], token:string}) {
    const dispatch = useDispatch()
    const cart = useSelector(selectCart)
    const data: any = useSelector(selectData)
    const error = useSelector(selectError)
    const success = useSelector(selectSuccess)
    const orderType = useSelector(selectOrderType)
    const product = useSelector(selectSelectedProduct)
    const quantity = useSelector(selectCartQuantity)
    const isLoading = useSelector(selectIsLoading)
    const [isPrint, setPrint] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const callover = useSelector(selectSelectedOrder)


    // useEffect(() => {
       
    // }, [product])
    const isErrors: any[] = []
    let isLow:boolean
    const handleValidation = (val:any) => {
        
        val?.map((item:any) => {
            if(item.quantity > item.Qty) {
                isLow = item?.product  
                return isErrors.push(true)
            }
            isLow = true
           isErrors.push(false)
        })
        
    }

    const handlePrint = useReactToPrint({contentRef: contentRef})  

    const handleClear = () => {
        
            dispatch(setCart([]))
            dispatch(setSelectedOrder(null))
            dispatch(setData({name:'customerName', value: ''}))
            dispatch(setData({name:'customerPhone', value: ''}))
            dispatch(setData({name:'customerEmail', value: ''}))
            dispatch(setData({name:'totalPaid', value: 0}))
            dispatch(setData({name:'customerEmail', value: ''}))
            dispatch(setData({name:'paymentMethod', value: 'Pending'}))
            dispatch(setIsLoading(false))
    }

    const handlePost = async (postType:string) => {
        // alert('hello')
        
        // try {
            dispatch(setIsLoading(true))
            const id =  v4()
            const orderId = data?.orderId ? data?.orderId :  `INV-${id?.toString()?.substring(0,6).toUpperCase()}`
            // return alert(orderId)


            const VALUES = cart?.flatMap((item: any) => {
                return ({
                    ...item,
                    orderId: orderId
                })
            })
        //    return console.log(VALUES)
            const body = {
                ...data,
                orderType: 'SALE',
                orderId,
                amountInWords: amtToWords(sumTotal(cart, 'words')),
                amount: data?.discount > 0 ? sumTotal(cart, 'total') - (sumTotal(cart, 'total')/100) * data.discount : sumTotal(cart, 'total') ,
                customer: {
                    customerName: data?.customerName,
                    customerPhone: data?.customerPhone,
                    customerEmail: data?.customerEmail
                },
                paymentMethod: data?.paymentMethod,
                status:  sumTotal(cart, 'total') - (sumTotal(cart, 'total')/100) * data.discount > parseInt(data.totalPaid) ? 'Open': 'Paid' ,
                VALUES
            }
            handleValidation(body.VALUES)
            //  dispatch(setIsLoading(false))

            // return alert( `${sumTotal(cart, 'total')} ${ data.totalPaid}2`)
            if(isErrors.includes(true) && orderType =='SALE') return (dispatch(setError(`${isLow} Quantity is too low`)))
            
            if(!data.totalPaid && postType !=='Save') {
                dispatch(setError('Please enter amount paid'))
                return dispatch(setIsLoading(false))
            }
        
           const save = postType == 'Save' ? true : false

     
           const result =  await handleSales(body, token, save)

           if(result?.status) {
            dispatch(setSelectedOrder(result?.order))
            dispatch(setSuccess(result?.message))
            dispatch(setCart([]))
            dispatch(setData({name:'customerName', value: ''}))
            dispatch(setData({name:'customerPhone', value: ''}))
            dispatch(setData({name:'customerEmail', value: ''}))
            dispatch(setData({name:'totalPaid', value: 0}))
            dispatch(setData({name:'customerEmail', value: ''}))
            dispatch(setData({name:'paymentMethod', value: 'Pending'}))
            dispatch(setIsLoading(false))
            setPrint(true)
           }



    }

    const handleAddToCart = () => {
        if(product) {
            const { _id, productBatch, productName, cartonQty, sellingPrice, costPrice, barcode } = product

            const exist = cart?.find((c:any) => c?.product == _id)

            const qty = quantity > 0 ? quantity : 1

            if(exist) return
            dispatch(setSaleForm({
                orderRow: v4(),
                orderId: '',
                orderType: orderType,
                productBatch,
                barcode,
                productName,
                product: _id,
                attendance: '',
                quantity: quantity > 0 ? quantity : 1,
                sellingPrice,
                costPrice,
                amount: orderType == 'PURCHASE' ? costPrice : sellingPrice,
                discount: 0,
                total: orderType == 'PURCHASE' ? costPrice * qty : sellingPrice * qty,
                cartonQty
            }))
            dispatch(setCartQuantity(null))
            dispatch(setSelectedProduct(null))
        }
    }

    useMemo(() =>{
        const unsubscribe = () => {
         
            if(!callover) return
            // dispatch(setData({
            //      name: 'totalPaid',
            //      value: 0
            // }))
           
 
            //  dispatch(setCalloverData({
            //      userRef: order?.userRef?._id,
            //      orderId: order?.orderId,
            //      // tx_date: "",
            //      amount: order?.amount,
            //      orderOn: order?.orderOn,
            //      sale_date: order?.createdAt,
            //      customerRef: order?.customerRef?._id,
            //      orderType: order?.orderType,
            //      totalPaid: order?.totalPaid,
            //      payMethod: order?.payMethod
            //  }))

            // Object.entries(callover).flatMap(item =>console.log(item))
            for (const [key, value] of Object.entries(callover)) {
                if(typeof(value) !== 'object' || key !== '_id'){
                    dispatch(setData({name:key, value}))
                }
            //    console.log(typeof(value))
              }

            dispatch(setOrderType(callover?.orderType))
            const customer = callover?.customer
            dispatch(setData({name: 'customerName', value: customer?.customerName }))
            const itemForm = callover?.orderItems?.map((item:any) =>{
                const {orderRow, orderId, amount, discount, total, barcode, orderType, product, productBatch, costPrice} = item
              
                return ({
                    orderRow,
                    orderId,
                    orderType,
                    productBatch,
                    barcode,
                    productName: product?.productName,
                    product: product?._id,
                    quantity,
                    sellingPrice: amount,
                    costPrice,
                    amount,
                    discount,
                    total,
                    cartonQty: product?.cartonQty
 
                })
            })
            //  setPay(true)
            // itemForm?.flatMap((item:any) =>dispatch(setCart(item)))
            return dispatch(setCart(itemForm))
        }
            unsubscribe()
     }, [callover])


    return (
        <div className="relative overflow-x-auto py-4">
            {
                isLoading ? <BackDrop open={isLoading} handleClear={handleClear} /> : <></>
            }
            <div
                className='flex w-full justify-end mb-4 space-x-4'
            >
                <AppModalDialog
                    open={isPrint}
                    title='Invoice'
                    setOpen={() =>{
                        setPrint(!isPrint)
                        dispatch(setSelectedOrder(null))
                        dispatch(selectCart([]))

                    }}
                    className='md:max-w-3xl max-w-7xl'
                    onClick={() =>handlePrint()}
                    btnTitle={
                        <div
                            className='flex items-center text-white-light'
                        >
                            <PrinterIcon className='w-4' />
                            <p>Print</p>
                        </div>
                    }
                >
                    <Invoice ref={contentRef} />
                </AppModalDialog>
                {
                    error ?
                    <AppSnackbar 
                        open={error ? true : false}
                        severity='error' message={error} position={'bottom'}                    
                    />
                    :
                    <></>
                }
                 {
                    success ?
                    <AppSnackbar 
                        open={success ? true : false}
                        severity='success' message={success} position={'bottom'}                    
                    />
                    :
                    <></>
                }
                <TextField variant='outlined' 
                    size='small' 
                    label='Quantity'
                    value={quantity}
                    name='quantity'
                    type='number'
                    className='border-none outline-none'
                    onChange={e =>dispatch(setCartQuantity(parseInt(e.target.value)))}
                />
                <Button 
                    className='bg-primary'
                    onClick={handleAddToCart}
                    title={
                        <div
                            className='flex items-center gap-x-2 text-sm text-white-light'
                        >
                            <PlusCircleIcon className='w-4' />
                            <p>Add To Cart</p>
                        </div>
                    }
                />
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white-light">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='text-xs'>
                       
                        <th scope="col" className="px-6 text-xs py-2">
                            Product Name
                        </th>
                        <th scope="col" className="px-6 text-xs py-2">
                            Attendance
                        </th>
                    
                        <th scope="col" className="px-6 text-xs text-center">
                           Stock Qty
                        </th>
                        
                        <th scope="col" className="px-6 text-xs">
                            Unit Price
                        </th>
                        <th scope="col" className="px-6 text-xs">
                            Qty
                        </th>
                        <th scope="col" className="px-6 text-xs">
                           Subtotal
                        </th>
                        <th scope="col" className="px-6 text-xs">
                           
                        </th>
                        
                       
                    </tr>
                </thead>
                
                <tbody>

                    {
                        cart?.flatMap((form:any, index:number) => {
                            const {cartonQty, sellingPrice, quantity, productName, total, product } = form
                            return (
                                <Fragment
                                    key={index+1*9876}
                                >

                                    
                                    <tr 
                                        // onMouseOver={() =>setMore(index+1)}
                                        // onMouseOut={() =>setMore('false')}
                                        className='text-sm border-b bg-gray-50 text-black'>
                                        
                                        
                                        <td className='w-[50%] text-right  bg-gray-50'>
                                            <div
                                                className='bg-white-light mr-2 flex justify-between items-center  px-2 py-2'
                                            >
                                               {toTitleCase(productName)}
                                            </div>
                                        </td>
                                        <td className=' bg-gray-50'>
                                            <SelectInput name='attendance' 
                                                options={
                                                    users?.flatMap(att => {
                                                        return({
                                                            key: `${toTitleCase(att?.fullName)}`, keyValue: att?._id
                                                        })
                                                    })
                                                } 
                                                handleChange={function (e: any): void {
                                                    const {name, value} = e?.target
                                                    dispatch(addToCart({name, id: product, value}))
                                            } }                                                
                                            />
                                        </td>
                                        <td className=' bg-gray-50'>
                                           <div>
                                                <span className='bg-primary rounded text-white-light px-2 py-1 cursor-pointer'>{cartonQty} In Stock </span>
                                           </div>
                                        </td>
                                        <td className=' text-right'>
                                            <div
                                                className='bg-white-light mr-2 flex justify-between items-center  px-2 py-2'
                                            >
                                                <LineThrough />
                                                <p> {sellingPrice?.toLocaleString()}</p>
                                            </div>
                                        </td>
                                        <td className=' text-right'
                                            
                                        >
                                            <div
                                                className='bg-white-light mr-2 flex justify-between items-center  px-1'
                                            >
                                                <div>
                                                    <p> {quantity}</p>
                                                </div>

                                                <div
                                                    className='flex flex-col gap-y-1'
                                                >
                                                    <PlusCircleIcon className='w-4 text-primary' 
                                                        onClick={() =>dispatch(addToCart({name: 'quantity', id: product, minus:false}))}
                                                    />
                                                    <MinusCircleIcon className='w-4 text-red-500' 
                                                        onClick={() =>dispatch(addToCart({name: 'quantity', id: product, minus:true}))}
                                                    />
                                                </div>

                                            </div>
                                        </td>
                                        <td className=' text-right'>
                                            <div
                                                className='bg-white-light mr-2 flex justify-between items-center  px-2 py-2'
                                            >
                                                <LineThrough />
                                                <p> {total?.toLocaleString()}</p>
                                            </div>
                                           
                                        </td>
                                        
                                        <td className='text-right'>
                                            <div className='flex items-center justify-center'>
                                                <IconButton size='medium'
                                                    onClick={() =>dispatch(removeFromCart(index))}
                                                >
                                                    <TrashIcon className='w-5 texts-red-500' />
                                                </IconButton>
                                            </div>
                                        </td>
                                        {/* <td className='text-center border-l bg-gray-50'>
                                            {
                                                index+1 === expenseCell?.length ?
                                                <div className='flex items-center justify-center'
                                                    onClick={() => handleAddCell()}
                                                >
                                                    <PlusCircleIcon 
                                                        className='w-5 text-success hover:scale-105 transition-all  ease-linear'
                                                    />
                                                </div>
                                                : null
                                            }
                                        </td> */}
                                    </tr>
                                </Fragment>
                            )
                        })


                    }
                    
                    <tr className='text-xs border-b'>
                        <td colSpan={1} className='px-1 py-2 bg-white flex items-center justify-center'>
                            <p
                                className='text-sm mt-3'
                            >
                                Discount (%)
                            </p>
                        </td>
                        <td colSpan={3} className='px-1 py-2 bg-white text-right'>
                           
                        </td>
                        
                        
                        <td colSpan={2} className=' text-black'>
                            {/* <div
                                className='py-4 mt-4 border flex items-center space-x-1 border-gray-200  sm:h-12 lg:h-8 md:h-8 px-2 rounded mb-3'
                            >
                                <LineThrough />
                                <p>{sumTotal(cart, 'total')?.toLocaleString()}</p>
                               
                            </div> */}
                             <div
                                className='py-4'
                            >
                                <SelectInput 
                                    name={'paymentMethod'} 
                                    value={data.paymentMethod}
                                    options={
                                        discounts?.filter(item =>item?.status)?.flatMap(item =>{
                                            return ({
                                                key: `${item?.discountName} (${item.discountValue})`,
                                                keyValue: item?.discountValue
                                            })
                                        })
                                    } 
                                    handleChange={ (e:any) =>dispatch(setData({name:'discount', value: e.target.value}))}                     
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='text-xs border-b'>
                        <td colSpan={1} className='px-1 py-2 bg-white flex items-center justify-center'>
                            <p
                                className='text-sm mt-3'
                            >
                                Grand Total
                            </p>
                        </td>
                        <td colSpan={3} className='px-1 py-2 bg-white text-right'>
                           
                        </td>
                        {/* <td className='text-right text-black'>
                            <p className='text-lg font-semibold'><LineThrough/> 0</p>
                        </td> */}
                        
                        <td colSpan={2} className=' text-black'>
                            <div
                                className='py-4 mt-4 border flex items-center space-x-1 border-gray-200  sm:h-12 lg:h-8 md:h-8 px-2 rounded mb-3'
                            >
                                <LineThrough />
                                <p>{ cart?.lenght > 0 ? ( sumTotal(cart, 'total') - (sumTotal(cart, 'total')/100) * data.discount)?.toLocaleString() : 0}</p>
                               
                            </div>
                        </td>
                    </tr>
                    <tr className='text-xs border-b'>
                        <td colSpan={1} className='px-1 py-2 bg-white'>
                            <p
                                className=''
                            >
                                Payment Method
                            </p>
                        </td>
                        <td colSpan={3} className='px-1 py-2 bg-white text-right'>
                           
                        </td>
                        {/* <td className='text-right text-black'>
                            <p className='text-lg font-semibold'><LineThrough/> 0</p>
                        </td> */}
                        
                        <td colSpan={2} className=' text-black'>
                            <div
                                className='py-4'
                            >
                                <SelectInput 
                                    name={'paymentMethod'} 
                                    value={data.paymentMethod}
                                    options={[
                                        {key: 'POS', keyValue: 'POS'},
                                        {key: 'Cash', keyValue: 'Cash'},
                                        {key: 'Transfer', keyValue: 'Transfer'}
                                    ]} 
                                    handleChange={ (e:any) =>dispatch(setData({name:'paymentMethod', value: e.target.value}))}                     
                                />
                            </div>
                        </td>
                    </tr>
                    <tr className='text-xs border-b'>
                        <td colSpan={1} className='px-1 py-2 bg-white'>
                            <p
                                className=''
                            >
                               Amount Tender
                            </p>
                        </td>
                        <td colSpan={3} className='px-1 py-2 bg-white text-right'>
                           
                        </td>
                        
                        <td colSpan={2} className=' text-black'>
                           <div
                                className='py-4'
                           >
                                <InputFied 
                                    currency
                                    name='totalPaid'
                                    type='number'
                                    value={data?.totalPaid}
                                    placeholder='Enter amount paid'
                                    handleChange={ (e:any) =>dispatch(setData({name:'totalPaid', value: parseInt(e.target.value)}))}
                                /> 
                           </div>
                                                          
                        </td>
                    </tr>
                    <tr className='text-xs'>
                        <td colSpan={1} className='px-1 py-2 bg-white'>
                        <div className='flex-1 justify-start '>
                            <p className='text-primary text-lg'>
                                { cart?.length > 0 ?  amtToWords(sumTotal(cart, 'words')) : <></>}
                            </p>
                        </div>
                        </td>
                                              
                        <td colSpan={5} className=' text-black text-right'>
                            <div
                                className='py-4 space-x-4 flex w-full justify-end'   
                            >
                                
                                <Button 
                                    title={
                                        <div
                                            className='flex items-center'
                                        >
                                            {isLoading ? <CircularProgress size='small' /> :<></>}
                                            <p>Save</p>
                                        </div>
                                    }
                                    className='text-white-light bg-primary'
                                    onClick={() =>handlePost('Save')}
                                    disable={isLoading}
                                />
                                <Button 
                                    title={
                                        <div
                                            className='flex items-center'
                                        >
                                            {isLoading ? <CircularProgress size='small' /> :<></>}
                                            <p>Generate Invoice</p>
                                        </div>
                                    }
                                    className='text-white-light bg-black'
                                    onClick={()=>handlePost('Post')}
                                    disable={isLoading}
                                />
                            </div>
                                                          
                        </td>
                    </tr>
                </tbody>
                
            </table>

            <section>
                <div
                    className='flex flex-wrap gap-x-4 gap-y-4 items-center justify-center'
                >
                    {
                        pendingsales.flatMap((item, index:number) => {
                            return(
                                <div
                                    key={(index+3)*7}
                                    className='flex-shrink-0'
                                >
                                    <AppChip 
                                        label={
                                            <div className='flex space-x-2'>
                                                <p> {item?.customer?.customerName ? item?.customer?.customerName : 'Guest'}</p>
                                                <p className='text-red-500/50'>
                                                    <LineThrough />{item?.amount?.toLocaleString()}
                                                </p>
                                            </div>
                                        }
                                        color={item?._id == callover?._id ? 'warning' : 'default'}
                                        onClick={() =>dispatch(setSelectedOrder(item))}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            
                
            
        </div>
    )
}

export default PosTable