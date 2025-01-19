
export const sumTotal = (data:any[], type:string) => {
        
    if(type === 'amount') {
        const reducer = (acc:number, currVal:any) => acc + (isNaN(currVal.amount) ? 0 : currVal?.amount)

        const total = data?.reduce(reducer,0)
       
        return total?.toLocaleString()
    }

    if(type === 'total') {
        // const total = data?.reduce((a:number, b:any) => a+b.total, 0)

        const reducer = (acc:number, currVal:any) => acc + (isNaN(currVal.total) ? 0 : currVal?.total)

        const total = data?.reduce(reducer,0)
       
        return total
    }

    if(type === 'words') {


        const reducer = (acc:number, currVal:any) => acc + (isNaN(currVal.total) ? 0 : currVal?.total)

        const total = data?.reduce(reducer,0)
       
        return total
    }
    
    if(type === 'quantity') {
        const total = data?.reduce((a:number, b:any) => a+b.quantity, 0)
        return total?.toLocaleString()
    }
   
}