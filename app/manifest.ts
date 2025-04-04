import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Brecorm',
        short_name: 'Brecorm',
        description: "Brecorm is a Software Tech Company, Specialize in  Business Record Management System Development",
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
