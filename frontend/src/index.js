import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './index.css';
import HomePage from './components/homepage/homepage';
import ReadObra from './components/readObra/readObra';
import CreateObra from './components/createObra/createObra';
import CreateRestaurant from './components/createRestaurant/createRestaurant';
import CreateHotel from './components/createHotel/createHotel';
import CreateClient from './components/createClient/createClient';
import CreateGastos from './components/createGastosExtra/createGastosExtra';
import CreateCarro from './components/createCarro/createCarro';
import CreateEquip from './components/createEquipamentos/createEquipamentos';
import CreateFornecedor from './components/createFornecedor/createFornecedor';
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
        
        {/* ----- OBRA ---- */}
        <Route path="readobra" element={<ReadObra />} /> 
        <Route path="createobra" element={<CreateObra />} /> 
        <Route path="detailsobra" element={<DetailsObra />} /> 
        
        {/* ----- RESTAURANTE ---- */}
        <Route path="createrestaurant" element={<CreateRestaurant />} /> 

        {/* ----- RESTAURANTE ---- */}
        <Route path="createhotel" element={<CreateHotel />} /> 

        {/* ----- CLIENTE ---- */}
        <Route path="createclient" element={<CreateClient />} /> 

        {/* ----- GASTOS_EXTRA ---- */}
        <Route path="creategastos" element={<CreateGastos />} />

        {/* ----- CARRO ---- */}
        <Route path="createcarro" element={<CreateCarro />} />

        {/* ----- REG_EQUIPAMENTOS ---- */}
        <Route path="createequip" element={<CreateEquip />} />

        {/* ----- FORNECEDORES ---- */}
        <Route path="createfornecedor" element={<CreateFornecedor />} />

        {/* ----- FICHEIROS ---- */}
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
