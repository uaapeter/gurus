export const toTitleCase = (str:string) => {
    if(!str?.trim() || str == undefined) return 
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

export function slipCapitalLetters (l:string) {
    // const letter = l.match(/[A-Z][a-z]+/g)
    const camelcase = l.replace(/([a-z](?=[A-Z]))/g, '$1 ')
    // console.log(letter)
    return camelcase
}
