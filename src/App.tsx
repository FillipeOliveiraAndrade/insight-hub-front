import { Route, Routes } from 'react-router';

import SignInUser from './pages/user/SignIn';
import SignUpUser from './pages/user/SignUp';

import SignInCompany from './pages/company/SignIn';
import SignUpCompany from './pages/company/SignUp';
import CatalogProducts from './pages/user/CatalogProducts';
import Dashboard from './pages/company/Dashboard';

import './App.css'

function App() {

  return (
    <Routes>
      <Route path='/user/signin' element={<SignInUser />} />
      <Route path='/user/signup' element={<SignUpUser />} />
      <Route path='/company/signin' element={<SignInCompany />} />
      <Route path='/company/signup' element={<SignUpCompany />} />
      <Route path='/catalog' element={<CatalogProducts />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default App
