import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import HomePage from './components/homepage/homepage';
import ReadObra from './components/readObra/readObra';
import UploadFile from './components/uploadFile/uploadFile';
import DownloadFile from './components/downloadFile/downloadFile';
import reportWebVitals from './tests/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="readobra" element={<ReadObra />} />
        <Route path="uploadFile" element={<UploadFile />} /> 
        <Route path="downloadFile" element={<DownloadFile />} />  
      </Routes>
    </BrowserRouter>
  );
}

root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
