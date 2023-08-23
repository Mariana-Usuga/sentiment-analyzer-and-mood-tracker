import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MoodState from './pages/MoodState';
import TrendVisualization from './pages/TrendVisualization';
import Layout from './components/Layout';
import LoginView from './pages/Login';
import Signout from './pages/Signout';
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
        <Route path='signout' element={<Signout />} />
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

/**
 *  <PrivateRoute path='moodState' element={<MoodState />} />
          <PrivateRoute
            path='trendVisualization'
            element={<TrendVisualization />}
          />
 <Route path='moodState' element={<MoodState />} />
          <Route path='trendVisualization' element={<TrendVisualization />} />
 *           <Route path='/' element={<App />} />
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
