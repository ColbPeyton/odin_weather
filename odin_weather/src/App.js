import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Weather from './components/Weather';
import './App.css';

function App() {
  return (
    <div id='app'>
        <Header />
        <Weather />
        <Footer />
    </div>
  );
}

export default App;
