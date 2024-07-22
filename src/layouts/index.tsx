import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
   <Fragment>
    <Navbar/>
    <main>
      <Outlet></Outlet>
    </main>
    <Footer />
   </Fragment>
  )
}

export default Layout
