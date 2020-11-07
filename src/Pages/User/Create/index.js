import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class CreateUser extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            user: {
                userName: "",
                salary: "",
                birthday: "",
                active: "true"
            },
            error: null,
            redirect: false
        };
    }
 
    showError() {
        const { error } = this.state;
 
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/users" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Usuário</legend>

                        <div className="user-insert">
                            <label htmlFor="userName"> Nome </label>
                            <br />
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.user.userName}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="user-insert">
                            <label htmlFor="salary"> Salário </label>
                            <br />
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                placeholder="Salário"
                                required
                                value={this.state.user.salary}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="user-insert">
                            <label htmlFor="birthday"> Data de Nascimento </label>
                            <br />
                            <input
                                type="date"
                                id="birthday"
                                name="birthday"
                                placeholder="Data de Nascimento"
                                required
                                value={this.state.user.birthday}
                                onChange={this.handleInputChange}
                            />
                        </div>

                        <div className="user-insert">
                            <label>
                                <input
                                    type="radio"
                                    name="active"
                                    value="true"
                                    checked={this.state.user.active === "true"}
                                    onChange={this.handleInputChange}
                                />
                                Ativo
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="active"
                                    value="false"                                    
                                    checked={this.state.user.active === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                            </label>
                        </div> 
 
                        <button type="submit" className="btn btn-primary">
                            Cadastrar
                        </button>
                    </fieldset>
                </form>
            );
        }
    }
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            user: { ...prevState.user, [name]: value }
        }));
        console.log(value);
    };
 
    handleSubmit = event => {
        fetch(" ${process.env.REACT_APP_API_URL}/main/users", {
            method: "post",
            body: JSON.stringify(this.state.user),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                    if (data.error) {
                            this.setState({ dataError: data.error });
                        }
                    });
                }
            })
            .catch(dataError => this.setState({ dataError: dataError }));
 
        event.preventDefault();
    };
}
 
export default CreateUser;
