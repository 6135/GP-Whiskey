import React, { Component } from 'react';
import { postAPI } from '../../services/serviceapi';

class ClientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            mail: '',
            telefone: '',
            publico: 'True',
            morada: '',
            arquivado: 'True' // O cliente diz que quer 'fechado' em vez de 'arquivado'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    }

    handleSubmit() {
        console.log(this.state);
        postAPI("http://127.0.0.1:8000/administration/cliente", this.state).then(result => {
            console.log(result.status);
        })
    }

    render() {
        return (
            <><div><h1>Registar Cliente</h1></div><form>
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
                            <div><select name="publico" id="publico" onChange={this.handleChange}>
                                <option value={"True"}>Público</option>
                                <option value={"False"}>Privado</option>
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
                            <div><select name="arquivado" id="arquivado" onChange={this.handleChange}>
                                <option value={"True"}>Sim</option>
                                <option value={"False"}>Não</option>
                            </select></div>
                        </div>
                    </div>
                </label>
                <br />
                <input class="button" type="submit" value="Submit" onClick={this.handleSubmit}/>
            </form></>
        );
    }
}

export default ClientForm;