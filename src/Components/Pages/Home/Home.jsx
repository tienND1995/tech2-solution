import React from 'react'
import About from './Components/Abouts/About'
import Brand from './Components/Brands/Brand'
import Facts from './Components/Facts/Facts'
import Feature from './Components/Features/Feature'
import Footer from './Components/Footers/Footer'
import Header from './Components/Headers/Header'
import Preloader from './Components/Preloader'

function Home(props) {
  return (
    <>
      <Preloader />
      {/*====== PRELOADER PART ENDS ======*/}
      {/*====== HEADER PART START ======*/}
      <Header />
      {/*====== HEADER PART ENDS ======*/}
      {/*====== BRAND PART START ======*/}
      <Brand />
      {/*====== BRAND PART ENDS ======*/}
      {/*====== SERVICES PART START ======*/}
      <Feature />
      {/*====== SERVICES PART ENDS ======*/}
      <About />
      {/*====== VIDEO COUNTER PART START ======*/}
      <Facts />
      {/*====== VIDEO COUNTER PART ENDS ======*/}
      {/*====== FOOTER PART START ======*/}
      <Footer/>
      {/*====== FOOTER PART ENDS ======*/}
      {/*====== BACK TOP TOP PART START ======*/}
    </>
  )
}

export default Home
