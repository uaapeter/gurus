import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Drawer from "../components/Drawer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Paper } from "@mui/material";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "../components/ErrorComponet";
import AppHeader from "../components/AppHeader";
import Provider from "../provider";
import { getAuthenticatedUser } from "../server/userServer";

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "POS",
  description: "Point of sales",
};


export default async function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    if(!hasCookie) return redirect('/sign-in')
    const session = cookieStore.get('session')
    const right = cookieStore.get('right')?.value

    const user = await getAuthenticatedUser(session?.value)

     
  
        return (
        <html lang="en">
            <head>
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100dvh] bg-white-light text-black/100 font-light`}
            >
                <ErrorBoundary errorComponent={Error}>
                    <Provider>
                        <main
                            className='flex flex-row
                                bg-gray-lightest h-[100%] justify-between
                            '
                        >
                            <Paper
                                className='sticky top-0 h-full overflow-hidden'
                            >
                                <Drawer 
                                    right={`${right}`}
                                />
                            </Paper>
                            
                            <section
                                className='w-full h-[100dvh] grid grid-row-[auto_1fr] overflow-hidden bg-white-light md:pb-0 pb-18'
                            > 
                                <AppHeader  
                                    user={user}  
                                    token={`${session?.value}`}                                 
                                />
                                <ErrorBoundary errorComponent={Error} >
                                <div className='h-[100dvh] sticky top-0 overflow-y-auto scroll-smooth'>
                                    {children}
                                    <div className='h-1/6' />
                                </div>
                                </ErrorBoundary>
                            </section>
                        </main>
                    </Provider>
                </ErrorBoundary>
            </body>

        </html>
    );
}
