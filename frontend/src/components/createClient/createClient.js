import React, { Component } from 'react';

class ClientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            mail: '',
            telefone: '',
            publico: '',
            morada: '',
            arquivado: '' // O cliente diz que quer 'fechado' em vez de 'arquivado'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onChangeValuePublico = this.onChangeValuePublico.bind(this);
        this.onChangeValueArquivado = this.onChangeValueArquivado.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {

        /*
        event.preventDefault();
        const newClient = {
            nome: this.state.nome,
            mail: this.state.mail,
            telefone: this.state.telefone,
            publico: this.state.publico,
            morada: this.state.morada,
            arquivado: this.state.arquivado
        };

        // Send newClient data to your server or database
        url = 'http://127.0.0.1:8000/construction/client'; // Temos de ver isto com o Fevereiro!
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newClient // the data you want to send in the request body
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Novo cliente registado com sucesso " + newClient.nome);
                // handle the response from the server
            })
            .catch(error => {
                // handle any errors that occur
                console.error("Nao foi possivel registar o novo cliente");
            });

        */
    }

    /* Verificar se e' publico ou privado */
    onChangeValuePublico(event) {
        console.log(event.target.value);
    }
    /* Verificar se e' publico ou privado */
    onChangeValueArquivado(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <><div><h1>Registar Cliente</h1></div><form onSubmit={this.handleSubmit}>
                <label>
                    Nome do cliente:
                    <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    Endereço de e-mail:
                    <input type="email" name="mail" value={this.state.mail} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    <div>
                        <div><label for="select-choice">Público ou privado:</label>
                            <div><select name="select-choice-publico" id="select-choice-publico">
                                <option value={this.state.publico}>Público</option>
                                <option value={!this.state.publico}>Privado</option>
                            </select></div>
                        </div>
                    </div>
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
                <label>
                    <div>
                        <div><label for="select-choice">Fechado:</label>
                            <div><select name="select-choice-arquivado" id="select-choice-arquivado">
                                <option value={this.state.arquivado}>Sim</option>
                                <option value={this.state.arquivado}>Não</option>
                            </select></div>
                        </div>
                    </div>
                </label>
                <br />
                <input class="button" type="submit" value="Submit" />
            </form></>
        );
    }
}

export default ClientForm;