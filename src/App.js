import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNavigation from './Component/SideNavigation';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Component/Home';


function App() {
  return (
    <div className="App">
      <SideNavigation />
      <Header />
      <div class="body-content">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
