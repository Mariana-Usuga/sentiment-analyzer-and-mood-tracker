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
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0', // Cambia este color al que desees
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginView />} />
        <Route path='signout' element={<Signout />} />
        <Route path='/' element={<NavBar />}>
          <Route path='moodState' element={<MoodState />} />
          <Route path='trendVisualization' element={<TrendVisualization />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

/**
 *           <Route path='/' element={<App />} />
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
