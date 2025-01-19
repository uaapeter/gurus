import convert from "@amirsanni/number-to-words";

export const amtToWords = (amt) => {
    const amount = convert(amt, 'NGN')

    return amount
}