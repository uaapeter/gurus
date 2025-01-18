'use client'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { BuildingStorefrontIcon, ChartPieIcon, CubeIcon, GiftTopIcon, HomeIcon,  MapPinIcon,  NoSymbolIcon,  PowerIcon,  PresentationChartLineIcon,  
    PuzzlePieceIcon,  TruckIcon,  UserGroupIcon,  UserIcon,} from '@heroicons/react/24/solid'
import { Menu, Sidebar, MenuItem, useProSidebar, sidebarClasses} from 'react-pro-sidebar'
import { usePathname } from 'next/navigation'
import {  ShoppingCart } from '@mui/icons-material'
import { handleLogOut } from '../server/userServer'
import Image from 'next/image'

function Drawer({right}: 
    {right: string}) {
    const path = usePathname()?.split('/')[1]


    const { collapseSidebar } = useProSidebar();

    // const handleLogOut = async() => {
    //     router.push('/sign-in')
            
    // }

  return (
    <Sidebar
        rootStyles={{
            [`.${sidebarClasses.container}`]: {
            backgroundColor: '#02b3b7',
            height: '100vh',
            flexDirection: 'column',
            justifyItems: 'space-between'
            },
        }}
        // className='bg-primary'
    >
        
        
        <Menu className='flex flex-col flex-1 text-white-light'>
            <MenuItem
                // component={<Link href={right == 'Admin' ? '/' : '/home'} />}
                className='text-sm hover:text-primary'
                icon={
                    <Image 
                        width={100}
                        height={100}
                        src='/logo.png'
                        onClick={() => collapseSidebar()}
                        className='h-auto w-auto' alt={'logo'}                    
                    />
                }
            >
                <button onClick={() => collapseSidebar()}>
                    POS SYSTEM
                </button>
            </MenuItem>
            {
                right == 'Admin' ?
                <MenuItem
                    className={`text-sm hover:text-primary ${path ==='' && 'bg-gray-100 text-primary'}`}
                    component={<Link href={right == 'Admin' ? '/' : '/home'}  />}
                    icon={<HomeIcon className='w-5' />}
                >
                    Dashboard
                </MenuItem>
                :
                <MenuItem
                    className={`text-sm hover:text-primary ${path ==='home' && 'bg-gray-100 text-primary'}`}
                    component={<Link href="/home" />}
                    icon={<HomeIcon className='w-5' />}
                >
                    Home
                </MenuItem>
                
            }
            {
                right == 'Admin' || 'Manager' ? 
                <Fragment>
                    <MenuItem
                        className={`text-sm hover:text-primary ${path ==='location' && 'bg-gray-100 text-primary'}`}
                        component={<Link href={`/location`} />}
                        icon={<MapPinIcon className='w-5' />}
                        title='Location'
                    >
                        Location
                    </MenuItem>
                    <MenuItem
                        className={`text-sm hover:text-primary ${path ==='stores' && 'bg-gray-100 text-primary'}`}
                        component={<Link href={`/stores`} />}
                        icon={<BuildingStorefrontIcon className='w-5' />}
                        title='Stores'
                    >
                        Stores
                    </MenuItem>
                    <MenuItem
                        className={`text-sm hover:text-primary ${path ==='users' && 'bg-gray-100 text-primary'}`}
                        component={<Link href={`/users`} />}
                        icon={<UserGroupIcon className='w-5' />}
                        title='Users'
                    >
                        Users
                    </MenuItem>
                    <MenuItem
                        className={`text-sm hover:text-primary ${path ==='suppliers' && 'bg-gray-100 text-primary'}`}
                        component={<Link href={`/suppliers`} />}
                        icon={<UserIcon className='w-5' />}
                        title='Supplier'
                    >
                        Suppliers
                    </MenuItem>
                    
                </Fragment>
                :
                <></>
            }
            <MenuItem
                className={`text-sm hover:text-primary ${path ==='category' && 'bg-gray-100 text-primary'}`}
                component={<Link href={`/category`} />}
                icon={<PuzzlePieceIcon className='w-5' />}
                title='Category'
            >
                Category
            </MenuItem>
            <MenuItem
                className={`text-sm hover:text-primary ${path ==='products' && 'bg-gray-100 text-primary'}`}
                component={<Link href={`/products`} />}
                icon={<PresentationChartLineIcon className='w-5' />}
                title='Products'
            >
                Products
            </MenuItem>
            <MenuItem
                className={`text-sm hover:text-primary ${path ==='discount' && 'bg-gray-100 text-primary'}`}
                component={<Link href={`/discount`} />}
                icon={<GiftTopIcon className='w-5' />}
                title='Discount'
            >
                Discount
            </MenuItem>
            {
                right !== 'Cashier' ?
                    <MenuItem
                    className={`text-sm hover:text-primary ${path ==='pos' && 'bg-gray-100 text-primary'}`}
                    component={<Link href={`/pos`} />}
                    icon={<ShoppingCart fontSize='small' />}
                    title='Point of sales'
                >
                    POS
                </MenuItem>
            :
            <></>
            }
            <MenuItem
                className={`text-sm hover:text-primary ${path ==='orders' && 'bg-gray-100 text-primary'}`}
                component={<Link href={`/orders`} />}
                icon={<TruckIcon className='w-5' />}
                title='Orders'
            >
                Orders
            </MenuItem>
            
            <MenuItem
                className={`text-sm hover:text-primary ${path ==='reports' && 'bg-gray-100 text-primary'}`}
                component={<Link href={`/reports`} />}
                icon={<ChartPieIcon className='w-5' />}
                title='Reports'
            >
                Reports
            </MenuItem>
            <MenuItem
                className={`text-sm hover:text-primary ${path ==='creditors' && 'bg-gray-100 text-primary'}`}
                component={<Link href={`/creditors`} />}
                icon={<CubeIcon className='w-5' />}
                title='Creditors'
            >
                Creditors
            </MenuItem>
            {
                right ==  'Admin' ?
                <MenuItem
                    className={`text-sm text-red-500 hover:text-primary ${path ==='expired' && 'bg-gray-100 text-primary'}`}
                    component={<Link href={`/expired/${0}`} />}
                    icon={<NoSymbolIcon className='w-5 text-red-500' />}
                    title='Expired'
                >
                    Expired
                </MenuItem>
                :
                <></>
            }
       
            <MenuItem
                className={`text-sm text-red-500 hover:text-primary ${path ==='#' && 'bg-gray-100 text-primary'}`}
                component={<Link href="/#" />}
                icon={<PowerIcon className='w-5' />}
                onClick={handleLogOut}
            >
                Sign Out
            </MenuItem>
        </Menu>
    </Sidebar>
  )
}

export default Drawer



