import { useState } from 'react'
import { useTheme } from '@emotion/react';
import MainAppFrom from '../Pages/MainAppForm';
import { Routes, Route } from "react-router-dom";
import ErrorScreen from '../Components/Error';
import CreateMainAppForm from '../CreateForms/MainAppFormC';
import CreateReceipt from '../CreateForms/ReceiptFormC';
import CreateVoucher from '../CreateForms/VoucherC';
import CreatePlot from '../CreateForms/PlotC';
import CreatPlotPrice from '../CreateForms/PlotPriceC';
import CreateExpenditure from '../CreateForms/ExpenditureC';
import CreatePlotAllotment from '../CreateForms/PlotAllotmentC';
import CreateCancellationLetter from '../CreateForms/PlotCancellationC';
import CreateInvestor from '../CreateForms/InvestorC';
import CreateAgent from '../CreateForms/AgentC';
import CreateTransferFile from '../CreateForms/TransferFileC';
import CreateRefund from '../CreateForms/RefundC';
import CreateRegistryInteqal from '../CreateForms/RegistryInteqalC';
import CreateTokenMoney from '../CreateForms/TokenC';
import CreateMonthlyReport from '../CreateForms/MonthlyReportC';
import CreateUser from '../CreateForms/UserC';

function Create() {
    const theme = useTheme();

  return (
    <>
      
        <Routes>
            <Route path='/'>
                { /* Create Forms */ }
                <Route path='Main' element = {<CreateMainAppForm />} />
                <Route path='Receipt' element = {<CreateReceipt />} />
                <Route path='Voucher' element= {<CreateVoucher />} />
                <Route path='Plot' element= {<CreatePlot />} />
                <Route path='PlotPrice' element= {<CreatPlotPrice />} />
                <Route path='Expenditure' element= {<CreateExpenditure />}/>
                <Route path='Investor' element = {<CreateInvestor/>} />
                <Route path='PlotAllotment' element={<CreatePlotAllotment/>} />
                <Route path='Agent' element={<CreateAgent />} />
                <Route path='Transfer' element={<CreateTransferFile/>} />
                <Route path='RegistryInteqal' element={<CreateRegistryInteqal />} />
                <Route path='Refund' element = {<CreateRefund />} /> 
                <Route path='User' element={<CreateUser />}/>
                <Route path='MonthlyReport' element={<CreateMonthlyReport />} />
                <Route path='TokenMoney' element={<CreateTokenMoney />} />
                <Route path='CancellationLetter' element = {<CreateCancellationLetter/>} />


                { /* Error Screen */}
                <Route path='*' element = {<ErrorScreen />} />

            </Route>
        </Routes>
        
      
    </>
  )
}

export default Create