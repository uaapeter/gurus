import { createSlice } from "@reduxjs/toolkit";

const renderAmount = (pro, qty, orderType) => {
    // const reducer = (acc:number, currVal) => acc + (isNaN(currVal.amount) ? 0 : currVal?.amount)
    // const total = pro?.reduce(reducer,0)
    const total = pro && orderType == 'PURCHASE' ? parseInt(pro?.costPrice) * parseInt(qty) : parseInt(pro.sellingPrice) * parseInt(qty);
    return total;
}

// type typeProduct = {
//     quantity:number
//     amount: number
//     cartonQty:number
// }

// type productType = {
//     product: {
//         selected,
//         orderType: string
//         saleForm: object[],
//         quantity: number,
//         data: object
//     }
// }
const initialState = {
    quantity: 1,
    selected: null,
    saleForm: [],
    orderType: 'SALE',
    data: {
        userRef: '',
        orderId: "",
        tx_date: "",
        VALUES: [],
        amount: "",
        charge: 0,
        discount:0,
        orderOn: "",
        sale_date: "",
        customerRef: '',
        orderType: 'SALE',
        totalPaid: 0,
        paymentMethod: 'Pending'
    }
}

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selected = action.payload
        },

        setSaleForm: (state, action) => {
            const array = [...state.saleForm, action.payload]
            state.saleForm = array
        },
        setClearSaleForm: (state) => {
            state.saleForm = []
        },

        addToCart: (state, action) => {


            const {name, value, id, minus, input} = action.payload;

            const product = state.saleForm.find((item) =>item?.product == id)
            const index = state?.saleForm?.indexOf(product);


            // state.saleForm.flatMap(item =>state.saleForm.push(item))
            // const quantity = state.saleForm[index].quantity
            const qty = parseInt(state.saleForm[index].quantity)
            const cartonQty = state.saleForm[index]?.cartonQty
            const stockqty = parseInt(cartonQty)

            if(qty == 1 && minus ) return
            if(!minus && qty == stockqty ) return
            if(!input) {

                const value = !minus ? state.saleForm[index].quantity + 1 : state.saleForm[index].quantity - 1

                const updatedsaleform = state.saleForm?.flatMap((salef, i) => index == i ? Object.assign(salef, {[name]: value}): salef
                );
                state.saleForm = updatedsaleform;
            } else {
                    const value = !minus && parseInt(input) > 0 ? parseInt(input) + state.saleForm[index].quantity : state.saleForm[index].quantity - parseInt(input);
                    const updatedsaleform = state.saleForm?.flatMap((salef, i) => index == i ? Object.assign(salef, {[name]: value}) : salef
                );

                state.saleForm = updatedsaleform;
            }


            if(name == 'attendance') {
              
                const updatedsaleform = state.saleForm?.flatMap((salef, i) => index == i ? Object.assign(salef, {[name]: value}): salef
            );
                state.saleForm = updatedsaleform;


            }

            state.saleForm.flatMap((salef, i) => 
                index == i 
                ? Object.assign(salef, {

                    total: renderAmount(
                        state.saleForm[index], 
                        state.saleForm[index].quantity, 
                        state.orderType
                    ) }) 
                : salef
            )

            console.log(state.saleForm)
            
        },
        
        setData: (state, action) => {
            const {name, value} = action.payload

            state.data = {
                ...state.data,
                [name]: value
            }
        },

        removeFromCart: (state, action) => {
            const items = [...state.saleForm];

            items.splice(action.payload, 1)
            state.saleForm = items
        },

        setCart: (state, action) => {
            state.saleForm = action.payload
        },
        setCartQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setOrderType: (state, action) => {
            state.orderType = action.payload
        }
    }
    
})


export const { setCart, addToCart, setData, setSaleForm, setOrderType, setCartQuantity, removeFromCart, setSelectedProduct } = productSlice.actions

export const selectCart = (state) => state.product.saleForm
export const selectData = (state) => state.product.data

export const selectOrderType = (state) => state.product.orderType
export const selectCartQuantity = (state) => state.product.quantity


export const selectSelectedProduct = (state) => state.product.selected

export default productSlice.reducer