import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postAPI } from '../../services/serviceapi';

const CreateRestaurant = () => {
    const [formData, setFormData] = useState({});

    const handleChange = (event) => { //muda o valor
        const { name, value } = event.target;
        setFormData({...formData, [name]: value}); //nÃ£o sei
    }

    const handleSubmit = (event) => {/*
        event.preventDefault();
        fetch('http://localhost:8000/constructions/restaurante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });*/
        
        // Send newHotel data to your server or database
        /*
        url = 'http://127.0.0.1:8000/construction/restaurant'; // Temos de ver isto com o Fevereiro!
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newRestaurant // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Novo restaurante registado com sucesso " + newRestaurant.nome);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar o novo restaurante");
            });*/

    }

    return (
        <><h1>Registar um novo Restaurante</h1><form onSubmit={handleSubmit}>
            <label>
                Nome do restaurante:
                <input type="text" name="nome" onChange={handleChange} />
            </label>
            <br />
            <label>
                Endereço de e-mail:
                <input type="email" name="email" onChange={handleChange} />
            </label>
            <br />
            <label>
                Número de telefone:
                <input type="tel" name="telefone" onChange={handleChange} />
            </label>
            <br />
            <label>
                Morada:
                <input type="text" name="morada" onChange={handleChange} />
            </label>
            <br />
            {/*<button type="submit">Create</button>*/}
        </form></>
    );
}

export default CreateRestaurant;