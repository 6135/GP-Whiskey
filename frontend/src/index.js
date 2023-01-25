import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './index.css';
import HomePage from './components/homepage/homepage';
import ReadObra from './components/readObra/readObra';
import UploadFile from './components/uploadFile/uploadFile';
import DownloadFile from './components/downloadFile/downloadFile';
import DetailsObra from './components/detailsObra/detailsObra';
import reportWebVitals from './tests/reportWebVitals';
import LoginPage from './components/Login/login';


const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="readobra" element={<ReadObra />}>
        </Route>
        <Route path="detailsobra" element={<DetailsObra />} /> 
        <Route path="uploadFile" element={<UploadFile />} />
        <Route path="downloadFile" element={<DownloadFile />} />
        <Route path="*" element={<Navigate replace to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
