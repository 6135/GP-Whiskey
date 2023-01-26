import React, { Component } from 'react';

class HotelForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            telefone: '',
            morada: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        /*
        event.preventDefault();
        const newHotel = {
            name: this.state.nome,
            email: this.state.email,
            telefone: this.state.telefone,
            morada: this.state.morada
        };
        // Send newHotel data to your server or database
        url = 'http://127.0.0.1:8000/construction/hotel'; // Temos de ver isto com o Fevereiro!
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newHotel // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Novo hotel registado com sucesso " + newHotel.nome);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar o novo hotel");
            });
            */

    }

    render() {
        return (
            <><div><h1>Registar um novo Hotel</h1></div><form onSubmit={this.handleSubmit}>
                <label>
                    Nome do hotel:
                    <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Endereço de e-mail:
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Número de telefone:
                    <input type="tel" name="telefone" value={this.state.telefone} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Morada:
                    <input type="text" name="morada" value={this.state.morada} onChange={this.handleChange} />
                </label>
                <br />
                <input class="button" type="submit" value="Submit" />
            </form></>
        );
    }
}

export default HotelForm;