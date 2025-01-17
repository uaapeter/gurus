
export const sumTotal = (data:any[], type:string) => {
        
    if(type === 'amount') {
        const total = data?.reduce((a:number, b:any) => a+b?.amount, 0)
        return total?.toLocaleString()
    }

    if(type === 'total') {
        const total = data?.reduce((a:number, b:any) => a+b.total, 0)
        return total
    }
    if(type === 'quantity') {
        const total = data?.reduce((a:number, b:any) => a+b.quantity, 0)
        return total?.toLocaleString()
    }
   
}