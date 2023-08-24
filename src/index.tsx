import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MoodState from './pages/MoodState';
import TrendVisualization from './pages/TrendVisualization';
import LoginView from './pages/Login';
import NavBar from './components/NavBar';
import { createGlobalStyle } from 'styled-components';
import PrivateRoute from './privateRoute';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');

  body {
    font-weight: bolder;
    font-family: 'Poppins', sans-serif;
    margin: 0; /* Resetear márgenes predeterminados */
    padding: 0; /* Resetear rellenos predeterminados */
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView />} />
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<NavBar />}>
            <Route path='moodState' element={<MoodState />} />
            <Route path='trendVisualization' element={<TrendVisualization />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
