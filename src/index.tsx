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

/**     
 * 
 * "dependencies": {
    "@date-io/date-fns": "^1.3.13", X
    "@emotion/react": "^11.11.1", X
    "@emotion/styled": "^11.11.0", X
    "@material-ui/core": "^4.12.4", X ESTE ES EL PROBLEMA no la he instalado
    "@material-ui/pickers": "^3.3.10", X ESTE ES EL PROBLEMA no la he instalado
    "@mui/icons-material": "^5.14.3",
    "@mui/lab": "^5.0.0-alpha.140",
    "@mui/material": "^5.14.5", X
    "@mui/styles": "^5.14.5",
    "@mui/x-charts": "^6.0.0-alpha.7",
    "@mui/x-date-pickers-pro": "^6.11.2",
    "@testing-library/jest-dom": "^6.0.1",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "@types/jest": "^29.5.3",
    "@types/node": "^20.5.1",
    "@types/react": "^18.2.20",
    "@types/react-dom": "^18.2.7",
    "axios": "^1.4.0", X
    "bcryptjs": "^2.4.3",
    "crypto-js": "^4.1.1",
    "date-fns": "^2.30.0", X
    "dayjs": "^1.11.9", X
    "eslint": "^8.47.0",
    "firebase": "^10.2.0", X
    "openai": "^4.0.1", X
    "react": "^18.2.0",
    "react-calendar": "^4.6.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "react-scripts": "^5.0.1",
    "recharts": "^2.7.3",
    "styled-components": "^6.0.7",
    "web-vitals": "^3.4.0"
  },

  "devDependencies": {
    "@types/crypto-js": "^4.1.1",
    "@typescript-eslint/eslint-plugin": "^6.4.0",
    "eslint-config-standard": "^17.1.0",
    "eslint-config-standard-with-typescript": "^37.0.0",
    "eslint-plugin-import": "^2.28.1",
    "eslint-plugin-n": "^16.0.1",
    "eslint-plugin-promise": "^6.1.1",
    "eslint-plugin-react": "^7.33.2"
  }
 */
