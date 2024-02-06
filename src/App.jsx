import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './assets/css/tailwind.css'
// import './assets/libs/@mdi/font/css/materialdesignicons.min.css'
// import './assets/libs/@iconscout/unicons/css/line.css'
// import './assets/libs/tobii/css/tobii.min.css'
// import './assets/images/favicon.ico'

import Index from "./page/index"

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />}/>
      </Routes>
    </BrowserRouter>
  )
} 

export default App