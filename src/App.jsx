import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignInSide from './signIn'
import Body from './Routes/routes'
import { Routes, Route } from "react-router-dom";
import SignInCustomer from './SignInCustomer'
import CustomerHome from './Screens/CustomerHome'
import CustomerFormDetails from './Screens/Customer/CustomerFormDetails'
import CustomerReceipt from './Screens/Customer/CustomerReceipts'
import AgentHome from './Screens/AgentHome'
import AgentCommissionPage from './Screens/Agent/AgentCommissionP'
import AgentFiles from './Screens/Agent/AgentFile'
import Test from './test'

function App() {

  return (
    <>

    <Routes>
        <Route path="/" element={ <SignInSide /> } />

        {/* Customer */}
        <Route path='SignInCustomer' element={<SignInCustomer />} />
        <Route path="CustomerHome" element={<CustomerHome />} />
        <Route path='CustomerFormDetails' element={<CustomerFormDetails />} />
        <Route path='CustomerReceipt' element={<CustomerReceipt />}/>

        {/* Agent */}
        <Route path='AgentHome' element={<AgentHome />} />
        <Route path='AgentFiles' element={<AgentFiles />}/>
        <Route path='AgentCommissionPage' element={<AgentCommissionPage/>} />

        

        <Route path="/*" element={ <Body /> } />
    </Routes>
    </>
  )
}

export default App
