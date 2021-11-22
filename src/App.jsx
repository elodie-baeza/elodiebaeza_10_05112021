import Login from 'pages/Login';
import Profile from 'pages/Profile';
import './App.css';
import React from "react"
import { Provider } from 'react-redux';
import store from './utils/store';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home';

export default function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <Header userText=''/>
          <Routes>
            <Route exact path='/'
            element={ <Home /> }/>
            <Route exact path='/login'
            element={ <Login /> }/>
            <Route exact path='/profile'
            element={ <Profile /> }/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  );
}
