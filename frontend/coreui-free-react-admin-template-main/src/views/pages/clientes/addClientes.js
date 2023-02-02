import React, { useState } from 'react';
import { postAPI } from 'src/services/serviceapi';
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CFormSelect,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone, cilDollar, cilHome, cilHouse } from '@coreui/icons'
import { useNavigate } from 'react-router-dom';

function AddClientes() {
    const navigate = useNavigate();
    let [data, setData] = useState({
        nome: '',
        mail: '',
        publico: '',
        morada: '',
        arquivado: '' // O cliente diz que quer 'fechado' em vez de 'arquivado'
    });

    function handleChange(event) {
        setData(item => ({
            ...item,
            [event.target.name]: event.target.value
        }))
        // console.log(data);
    }

    async function handleSubmit() {

        data.arquivado = data.arquivado === "Sim" ? "true" : data.arquivado === "Não" ? "false" : data.arquivado;
        data.publico = data.publico === "Sim" ? "true" : data.publico === "Não" ? "false" : data.publico;
        console.log("arq: " +  data.arquivado);
        console.log("pub: " +  data.publico);
        if (data.nome.trim() !== "" &&  data.arquivado !== "Fechado?" &&  data.publico !== "Público?" && data.mail.trim() !== "" && data.morada.trim() !== "") {

            const { response, err, authenticated } = await postAPI("http://127.0.0.1:8000/administration/cliente", data);
            if (!authenticated)
                navigate("/login");
            if (response.status === 201)
                navigate("/clientes");
        }
    }



    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-top">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} >
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm>
                                    <h1>Registar Cliente</h1>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormInput name="nome" placeholder="Nome" autoComplete="nome" value={data.nome} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            @
                                        </CInputGroupText>
                                        <CFormInput name='mail' placeholder="Email" autoComplete="email" value={data.mail} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilUser} />
                                        </CInputGroupText>
                                        <CFormSelect name='publico' options={['Público?',
                                            { label: 'Sim', value: true },
                                            { label: 'Não', value: false },
                                        ]} onChange={handleChange} ></CFormSelect>
                                    </CInputGroup>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText>
                                            <CIcon icon={cilHome} />
                                        </CInputGroupText>
                                        <CFormInput name="morada" placeholder="Morada" autoComplete="morada" value={data.morada} onChange={handleChange} />
                                    </CInputGroup>
                                    <CInputGroup label="Fechado" className='mb-3'>
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormSelect name="arquivado" options={['Fechado?',
                                            { label: 'Sim', value: true },
                                            { label: 'Não', value: false },
                                        ]}  onChange={handleChange}></CFormSelect>
                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="dark" onClick={handleSubmit} >Guardar</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
        // <div><div><h1>Registar Cliente</h1></div><form>
        //     <label>
        //         Nome do cliente:
        //         <input type="text" name="nome" value={data.nome} onChange={handleChange} />
        //     </label>
        //     <br />
        //     <label>
        //         Endereço de e-mail:
        //         <input type="email" name="mail" value={data.mail} onChange={handleChange} />
        //     </label>
        //     <br />
        //     <label>
        //         <div>
        //             <div><label for="select-choice">Público ou privado:</label>
        //                 <div><select name="publico" id="publico" onChange={handleChange}>
        //                     <option value={"True"}>Público</option>
        //                     <option value={"False"}>Privado</option>
        //                 </select></div>
        //             </div>
        //         </div>
        //     </label>
        //     <br />
        //     <label>
        //         Número de telefone:
        //         <input type="tel" name="telefone" value={data.telefone} onChange={handleChange} />
        //     </label>
        //     <br />
        //     <label>
        //         Morada:
        //         <input type="text" name="morada" value={data.morada} onChange={handleChange} />
        //     </label>
        //     <br />
        //     <label>
        //         <div>
        //             <div><label for="select-choice">Fechado:</label>
        //                 <div><select name="arquivado" id="arquivado" onChange={handleChange}>
        //                     <option value={"True"}>Sim</option>
        //                     <option value={"False"}>Não</option>
        //                 </select></div>
        //             </div>
        //         </div>
        //     </label>
        //     <br />
        //     <input class="button" type="submit" value="Submit" onClick={handleSubmit} />
        // </form></div>
    );

}

export default AddClientes;