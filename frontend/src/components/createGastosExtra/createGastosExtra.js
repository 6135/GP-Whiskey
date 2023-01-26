import React, { Component } from 'react';

class GastosExtraForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descricao: '',
            data: '',
            preco: ''
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
        const newGastosExtra = {
            descricao: this.state.descricao,
            data: this.state.data,
            preco: this.state.preco
        };
        */
       /*
        // Send newGastosExtra data to your server or database
        url = 'http://127.0.0.1:8000/construction/gastos'; // Temos de ver isto com o Fevereiro!
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newGastosExtra // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Novo gasto registado com sucesso " + newGastosExtra.preco);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar o novo gasto");
            });
            */

    }

    render() {
        return (
            <><div><h1>Registar um novo Gasto extra</h1></div><form onSubmit={this.handleSubmit}>
                <label>
                    Descrição do gasto:
                    <textarea rows="4" cols="50" name="descricao" form="usrform" value={this.state.descricao} onChange={this.handleChange}></textarea>
                    {/*<input type="text" name="descricao" value={this.state.descricao} onChange={this.handleChange} />*/}
                </label>
                <br />
                <label>
                    Data da ocorrência:
                    <input type="date" name="data" value={this.state.data} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Valor gasto em euros:
                    <input type="number" step="0.01" min="0" max="10000" name="preco" value={this.state.preco} onChange={this.handleChange} />
                    €
                </label>
                <br />
                <input class="button" type="submit" value="Submit" />
            </form></>
        );
    }
}

export default GastosExtraForm;