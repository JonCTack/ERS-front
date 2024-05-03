import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Reimbursements } from './components/Reimbursements/Reimbursements';
import { Login } from './components/Login/Login';
import { Register } from './components/Login/Register';
import { MakeReimbursement } from './components/Reimbursements/MakeReimbursement';
import { Users } from './components/Users/Users';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/reimbursements' element={<Reimbursements/>} />
          <Route path='/reimbursements/new' element={<MakeReimbursement/>} />
          <Route path='/users' element={<Users/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
