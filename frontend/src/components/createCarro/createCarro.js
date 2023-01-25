import React, { Component } from 'react';
import { postAPI } from '../../hooks/serviceapi';

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
        console.log(this.state);
    }

    handleSubmit() {
        console.log(this.state);
        postAPI("http://127.0.0.1:8000/constructions/carro", this.state).then(result => {
            console.log(result.status);
        })
    }

    render() {
        return (
            <><div><h1>Registar uma nova Viatura</h1></div><form>
                <label>
                    Matrícula:
                    <input type="text" name="matricula" value={this.state.matricula} onChange={this.handleChange} />
                </label>
                <br />
                <label>
                    <div>
                        <div><label for="select-choice">Marca:</label>
                            <div><select name="marca" id="marca" onChange={this.handleChange}>
                                <option value={'BMW'}>BMW</option>
                                <option value={'Citroen'}>Citroen</option>
                                <option value={'Dacia'}>Dacia</option>
                                <option value={'Fiat'}>Fiat</option>
                                <option value={'Ford'}>Ford</option>
                                <option value={'Jaguar'}>Jaguar</option>
                                <option value={'Nissan'}>Nissan</option>
                                <option value={'Opel'}>Opel</option>
                                <option value={'Peugeout'}>Peugeot</option>
                                <option value={'Renault'}>Renault</option>
                                <option value={'Seat'}>Seat</option>
                                <option value={'Tesla'}>Tesla</option>
                                <option value={'Toyota'}>Toyota</option>
                                <option value={'VW'}>VW</option>
                                <option value={'Outra'}>Outra</option>
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

                <input class="button" value="Submit" onClick={this.handleSubmit} />
            </form></>
        );
    }
}

export default CarroForm;