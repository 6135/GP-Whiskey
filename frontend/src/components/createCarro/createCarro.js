import React, { Component } from 'react';

class CarroForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            matricula: '',
            marca: '',
            ano: '',
            seguradora: '',
            data_inicio: '',
            data_fim: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {

        // Descomentar isto

        /*

        event.preventDefault();
        const newCarro = {
            matricula: this.state.matricula,
            marca: this.state.marca,
            ano: this.state.ano,
            seguradora: this.state.seguradora,
            data_inicio: this.state.data_inicio,
            data_fim: this.state.data_fim
        };
        
        // Send newClient data to your server or database
        url = 'http://127.0.0.1:8000/construction/carro'; //postAPI("http://127.0.0.1:8000/filetransfer/relatorio", this.state)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newCarro // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Novo carro registado com sucesso " + newCarro.matricula);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar o novo carro");
            });
            
            */

    }

    render() {
        return (
            <><div><h1>Registar uma nova Viatura</h1></div><form onSubmit={this.handleSubmit}>
                <label>
                    Matrícula:
                    <input type="text" name="matricula" value={this.state.matricula} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    <div>
                        <div><label for="select-choice">Marca:</label>
                            <div><select name="select-choice-publico" id="select-choice-publico">
                                <option value={this.state.marca}>BMW</option>
                                <option value={this.state.marca}>Citroen</option>
                                <option value={this.state.marca}>Dacia</option>
                                <option value={this.state.marca}>Fiat</option>
                                <option value={this.state.marca}>Ford</option>
                                <option value={this.state.marca}>Jaguar</option>
                                <option value={this.state.marca}>Nissan</option>
                                <option value={this.state.marca}>Opel</option>
                                <option value={this.state.marca}>Peugeot</option>
                                <option value={this.state.marca}>Renault</option>
                                <option value={this.state.marca}>Seat</option>
                                <option value={this.state.marca}>Tesla</option>
                                <option value={this.state.marca}>Toyota</option>
                                <option value={this.state.marca}>VW</option>
                                
                                <option value={this.state.marca}>Outra</option>
                            </select></div>
                        </div>
                    </div>
                </label>
                <br />
                <label>
                    Ano:
                    <input type="number" name="ano" min="1900" max="2023" step="1" value={this.state.ano} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Seguradora:
                    <input type="text" name="seguradora" value={this.state.seguradora} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Data inicio:
                    <input type="date" name="data_inicio" value={this.state.data_inicio} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Data fim:
                    <input type="date" name="data_fim" value={this.state.data_fim} onChange={this.handleChange} />
                </label>
                <br />

                <input class="button" type="submit" value="Submit" />
            </form></>
        );
    }
}

export default CarroForm;