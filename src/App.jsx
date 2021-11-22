import Login from 'pages/Login';
import Profile from 'pages/Profile';
import './App.css';
import React, { useState } from "react"
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';

export default function App() {
  const [token, updateToken] = useState()

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header userText=''/>
        <Routes>
          <Route exact path='/'
          element={ <Home /> }/>
          <Route exact path='/login'
          element={ <Login token={token} updateToken={updateToken}/> }/>
          <Route exact path='/profile'
          element={ <Profile token={token} /> }/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}
