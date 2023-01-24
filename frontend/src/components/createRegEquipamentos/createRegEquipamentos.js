import React, { Component } from 'react';

class RegEquipForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome_equip: ''
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
        const newRegEquip = {
            nome_equip: this.state.nome_equip
        };
        // Send newHotel data to your server or database
        url = 'http://127.0.0.1:8000/construction/regequipamento'; // Temos de ver isto com o Fevereiro!
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newRegEquip // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Novo equipamento registado com sucesso " + newHotel.nome);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar o novo equipamento");
            });
            */

    }

    render() {
        return (
            <><div><h1>Registar um novo Equipamento</h1></div><form onSubmit={this.handleSubmit}>
                <label>
                    Nome do equipamento:
                    <input type="text" name="nome" value={this.state.nome_equip} onChange={this.handleChange} />
                </label>
                <br />
                <input class="button" type="submit" value="Submit" />
            </form></>
        );
    }
}

export default RegEquipForm;