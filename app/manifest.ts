import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Point of Sales (POS)',
        short_name: 'POS',
        description: 'Inventory & Point of Sales (POS), Easy With User Friendly Interface ',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#02b3b7',
        icons: [
        {
            src: '/applogo.png',
            sizes: 'any',
            type: 'image/png',
        },
        {
            src: '/applogo.png',
            sizes: 'any',
            type: 'image/png',
        },
        ],
    }
}