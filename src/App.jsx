import Login from 'pages/Login';
import Profile from 'pages/Profile';
import './App.css';
import React from "react"
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';
import PrivateRoute from 'router/PrivateRoute';
import Error from 'pages/Error';

export default function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header userText=''/>
        <Routes>
          <Route exact path='/' element={ <Home /> }/>
          <Route exact path='/login' element={ <Login /> }/>
          <Route exact path='/error' element={ <Error /> }/>
          <Route exact path='/profile' element={ <PrivateRoute> <Profile /> </PrivateRoute>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}
