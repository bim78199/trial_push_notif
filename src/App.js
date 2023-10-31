import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Home';
import Print from './Print';

import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path={'/'} element={<Home/>}/>
  <Route path={'/Print'} element={<Print/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
