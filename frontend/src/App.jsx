import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './components/CreateListing';

function App() {
  return (
    <div>
       <BrowserRouter>
       <Header/>

       <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/about' element={<About/>} ></Route>
        <Route path='/signin' element={<Signin/>} ></Route>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
        </Route>



       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
