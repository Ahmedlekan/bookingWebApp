import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        
        <div className="">
          {children}
        </div>
        
        <Footer />
    </div>
  )
}

export default Layout