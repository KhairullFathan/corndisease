import { useState } from 'react'

import Navbarsm from '../components/Navbarsm'
import Hero from '../components/Hero'
import Disease from '../components/Disease'
import Footer from '../components/Footer'

const Index = () => {
  const [isOpen, setOpen] = useState(false)

  return(
    <>
      <Navbarsm/>
      <Hero/>
      <Disease/>
      <Footer/>
    </>
  )
}

export default Index