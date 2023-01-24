import React, { Component } from 'react';

class FornecedorForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      telefone: '',
      email: '',
      tipo: 'Recursos Humanos',
      morada: '',
      localizacao: '',

      especializacao: '',
      extraField: 'true'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChangeValueTipo = this.onChangeValueTipo.bind(this); // tipo

    // Parte da heranca do Fornecedor
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleExtraFieldChange = this.handleExtraFieldChange.bind(this); // especializacao
  }

  handleOptionChange(event) {
    this.setState({ tipo: event.target.value });
    if (event.target.value === 'Recursos Humanos') {
      this.setState({ extraField: true });
    } else {
      this.setState({ extraField: false });
    }
  }

  handleExtraFieldChange(event) {
    this.setState({ especializacao: event.target.value });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {

    /*
    event.preventDefault();
    const newFornecedor = {
        nome: this.state.nome,
        telefone: this.state.telefone,
        email: this.state.email,
        tipo: this.state.tipo,
        morada: this.state.morada,
        localizacao: this.state.localizacao
    };

    // Send newClient data to your server or database
    url = 'http://127.0.0.1:8000/construction/fornecedor'; // Temos de ver isto com o Fevereiro!
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            newFornecedor // the data you want to send in the request body
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log("Novo fornecedor registado com sucesso " + newClient.nome);
            // handle the response from the server
        })
        .catch(error => {
            // handle any errors that occur
            console.error("Nao foi possivel registar o novo fornecedor");
        });

    */
  }

  /* Verificar a especializacao */
  onChangeValueTipo(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <><div><h1>Registar Fornecedor</h1></div><form onSubmit={this.handleSubmit}>
        <label>
          Nome do fornecedor:
          <input type="text" name="nome" value={this.state.nome} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Número de telefone:
          <input type="tel" name="telefone" maxlength="9" value={this.state.telefone} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Morada:
          <input type="text" name="morada" value={this.state.morada} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Localização:
          <input type="text" name="localizacao" value={this.state.localizacao} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Endereço de e-mail:
          <input type="email" name="mail" value={this.state.email} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          <div>
            <div><label for="select-choice">Tipo de fornecedor:</label>
              <div><select name="select-choice-publico" id="select-choice-publico" onChange={this.handleOptionChange}>
                <option value={'Recursos Humanos'}>Recursos humanos</option>
                <option value={'Equipamentos'}>Equipamentos</option>
              </select></div>
            </div>
          </div>
        </label>
        {this.state.extraField && (
          <div>
            <label>
              Especialização do fornecedor:
              <input type="text" value={this.state.especializacao} onChange={this.handleExtraFieldChange} />
            </label>
          </div>
        )}
        <br />
        <input class="button" type="submit" value="Submeter" />
      </form></>
    );
  }
}

export default FornecedorForm;

