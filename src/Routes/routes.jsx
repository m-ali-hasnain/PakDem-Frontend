import { useState } from 'react'
import { useTheme } from '@emotion/react';
import Home from '../Pages/Home'
import { Routes, Route } from "react-router-dom";
import Navbar from '../Components/AppBar';
import { Box } from '@mui/material';
import Footer from '../Components/Footer';
import DataTable from '../Components/Table';
import MainAppFrom from '../Pages/MainAppForm';
import MainAppFormDetails from '../Pages/MainAppFormDetails';
import CashPayment from '../Pages/CashPayments';
import CAPayment from '../Pages/CAPayment';
import OnlinePayment from '../Pages/OnlinePayment';
import FileSelector from '../Components/fileselector';
import PaymentSchedule from '../Pages/PaymentSchedule';
import RegularReceipt from '../Pages/RegularReceipt';
import TransferReceipt from '../Pages/TransferReceipt';
import DevelopmentReceipt from '../Pages/DevelopmentReceipt';
import ReceiptDetails from '../Pages/ReceiptDetails'
import Expenditure from '../Pages/Expenditure';
import ExpenditureDetails from '../Pages/ExpenditureDetails';
import MonthlyReport from '../Pages/MonthlyReport';
import DailyReport from '../Pages/DailyRecoveryReport';
import AllPlots from '../Pages/AllPlots';
import PlotDetails from '../Pages/PlotDetials';
import PlotPrices from '../Pages/PlotPrices';
import PlotPriceDetails from '../Pages/PlotPriceDetails';
import PlotAllotments from '../Pages/PlotAllotments';
import PlotAllotmentDetails from '../Pages/PlotAllotmentDetials';
import PlotCancellation from '../Pages/PlotCancellation';
import PlotCancelDetails from '../Pages/CancelDetails';
import AllAgents from '../Pages/AllAgents';
import AgentDetails from '../Pages/AgentDetials';
import AgentCommission from '../Pages/AgentCommission';
import RefundSchedule from '../Pages/RefundSchedule';
import LedgerReport from '../Pages/LedgerReport';
import AgentVouchers from '../Pages/AgentVouchers';
import AgentPaymentList from '../Pages/AgentPaymentList';
import AgentPaymentDetails from '../Pages/AgentPaymentDetails';
import ApplicationFormRecord from '../Pages/AplicationFinder';
import ReceiptFinder from '../Pages/ReceiptFinder';
import AgentWiseFile from '../Pages/AgentWiseFile';
import ErrorScreen from '../Components/Error';
import ScrollToTopButton from '../Components/ScrollToTop';
import Create from './routesForCreate';
import AllInvestors from '../Pages/Investors';
import InvestorDetails from '../Pages/InvestorDetails';
import TransferFiles from '../Pages/TransferFile';
import CashFiles from '../Pages/CashFiles';
import InstallmentFiles from '../Pages/InstallmentFiles';
import RegistryInteqal from '../Pages/RegistryInteqal';
import MainFormTracking from '../Components/MainFromTracking';
import ReceiptTracking from '../Components/ReceiptTracking';
import TokenMoney from '../Pages/TokenMoney';
import TokenDetails from '../Pages/TokenDetails';
import SignInCustomer from '../SignInCustomer';
import CustomerHome from '../Screens/CustomerHome';
import RefundDetails from '../Pages/RefundDetials';
import PrintMainAppForm from '../Pages/Print/PrintMainForm';
import PrintRecipt from '../Pages/Print/PrintRecipt';
import FileFolder from '../Pages/FileFolder';
import UploadImage from '../Pages/UploadImage';

function Body() {
    const theme = useTheme();

  return (
    <>
      
      <Navbar />
      <ScrollToTopButton />
      <Box height={50} sx={{backgroundColor :theme.palette.secondary.background }} />
        <Routes>
            <Route path='/'>
                { /* Tables */ }
                <Route path="Home" element={ <Home /> } />
                <Route path='MainAppForm' element = { <MainAppFrom />} />
                <Route path='CashFiles' element={<CashFiles />}/>
                <Route path='TokenMoney' element={<TokenMoney />} />
                <Route path='InstallmentFiles' element= { <InstallmentFiles />} />
                <Route path='MultipleFiles' element = {<ApplicationFormRecord />} />
                <Route path='ReceiptFinder' element = {<ReceiptFinder />} />
                <Route path='CashPayments' element = {<CashPayment />} />
                <Route path='CAPayments' element= {<CAPayment />} />
                <Route path='OnlinePayments' element= {<OnlinePayment />} />
                <Route path='PaymentSchedule' element= {<PaymentSchedule />} />
                <Route path='RegularReceipt' element= {<RegularReceipt />} />
                <Route path='TransferReceipt' element= {<TransferReceipt/>} />
                <Route path='Expenditure' element={<Expenditure />} />
                <Route path='MonthlyReport' element={<MonthlyReport />} />
                <Route path='DailyReport' element={<DailyReport />} />
                <Route path='AllPlots' element={<AllPlots />} />
                <Route path='Agents' element={<AllAgents />} />
                <Route path='Investors' element = {<AllInvestors />} />
                <Route path='PlotPrices' element={<PlotPrices />} />
                <Route path='PlotAllotment' element={<PlotAllotments />} />
                <Route path='LedgerReport' element={<LedgerReport />} />
                <Route path='AgentVouchers' element={<AgentVouchers />} />
                <Route path='AgentPaymentList' element={<AgentPaymentList />} />
                <Route path='PlotCancellation' element={<PlotCancellation />} />
                <Route path='DevelopmentReciept' element = {<DevelopmentReceipt/>} />
                <Route path='AgentCommission' element = {<AgentCommission />} />
                <Route path='AgentWiseFile' element = {<AgentWiseFile />} />
                <Route path='TransferFiles' element={<TransferFiles/>} />
                <Route path='MainFormTracking' element={<MainFormTracking />}/>
                <Route path='ReceiptTracking' element = { <ReceiptTracking />} />
                <Route path='RegistryInteqal' element= {<RegistryInteqal />} />
                <Route path='Folder' element={<FileFolder />} />
                <Route path='UploadImage' element = {<UploadImage />} />

                {/* Print  */}
                <Route path='PrintMainForm' element={<PrintMainAppForm />} />
                <Route path='PrintRecipt' element={<PrintRecipt />} />
                
                <Route path='RefundSchedule' element = {<RefundSchedule />} />

                { /* Details */ }
                <Route path='ReceiptDetails/:id' element = {<ReceiptDetails />} />
                <Route path='TokenDetails/:id' element = {<TokenDetails />} />
                <Route path='Plot/details/:id' element = {<PlotDetails />} />
                <Route path='PlotPrice/details/:id' element = {<PlotPriceDetails />} />
                <Route path='PlotAllotment/details/:id' element = {<PlotAllotmentDetails />} />
                <Route path='PlotCancellation/details/:id' element = {<PlotCancelDetails />} />
                <Route path='Expenditure/Details/:id' element = {<ExpenditureDetails />} />
                <Route path='AgentPayment/details/:id' element = {<AgentPaymentDetails />} />
                <Route path='Agent/details/:id' element = {<AgentDetails />} />
                <Route path='Investor/details/:id' element = {<InvestorDetails />} />
                <Route path='MainAppFormDetails/:id' element = {<MainAppFormDetails />} />
                <Route path='RefundDetails/:id' element={<RefundDetails />} />

                { /* Create */ }
                <Route path='Create/*' element = {<Create />} />

               

                { /* Error Screen */}
                <Route path='*' element = {<ErrorScreen />} />

            </Route>
        </Routes>
        
      <Footer />
    </>
  )
}

export default Body
