import BannerHome from '@/components/Banners/BannerHome'
import Navbar from '@/components/Navbar/Navbar'
import NavbarSite from '@/components/NavbarSite/NavbarSite'
import React from 'react'

export default function MainPage() {
  return (
    <div className='h-[3000px]'>
      <NavbarSite />
      <Navbar />
      <BannerHome />
    </div>
  )
}
