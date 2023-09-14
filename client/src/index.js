import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StylistList } from './components/stylists/StylistList.js';
import { CustomerList } from './components/customers/CustomerList.js';
import { AppointmentList } from './components/appointments/AppointmentList.js';
import { StylistDetails } from './components/stylists/StylistDetails.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<App />}
      >
        <Route path="stylists">
          <Route
            index
            element={<StylistList />}
          />
          <Route
            path=":id"
            element={<StylistDetails />}
          />
        </Route>
        <Route
          path="customers"
          element={<CustomerList />}
        ></Route>
        <Route
          path="appointments"
          element={<AppointmentList />}
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
