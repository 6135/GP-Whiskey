import React, { Component } from 'react';
import './createObra.css';

class ObraForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // numero do processo (TEM DE APARECER)
            // chamar ao cliente -> dono da obra
            // transportadora

            n_processo: '',
            transportadora: '',

            nome: '',
            data_inicio: '',
            data_conclusao: ''
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
        const newObra = {
            n_processo: this.state.nome,
            transportadora: this.state.transportadora,
            nome: this.state.nome,
            data_inicio: this.state.data_inicio,
            data_conclusao: this.state.data_conclusao
        };
        // Send newObra data to your server or database
        url = 'http://127.0.0.1:8000/construction/obra'; // Temos de ver isto com o Fevereiro!
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newObra // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Nova obra registada com sucesso " + newObra.nome);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar a nova obra");
            });
*/

    }

    render() {
        return (
            <><div><h1>Criar obra</h1></div><form onSubmit={this.handleSubmit}>
                <label>
                    Número de processo:
                    <input type="number" name="n_processo" min="0" max="10000" value={this.state.n_processo} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Nome da obra:
                    <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Transportadora:
                    <input type="text" name="transportadora" min="0" max="10000" value={this.state.transportadora} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Data de inicio:
                    <input type="date" name="data_inicio" value={this.state.data_inicio} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Data de conclusão:
                    <input type="date" name="data_conclusao" value={this.state.data_conclusao} onChange={this.handleChange} />
                </label>
                <br />
                <input class="button" type="submit" value="Submit" />
            </form></>
        );
    }
}

export default ObraForm;