import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
 
class UpdateUser extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            user: {
                userName: "",
                salary: "",
                birthday: ""
            },
            showError: null,
            redirect: false
        };
    }
 
    showingError() {
        const { showError } = this.state;
 
        if (showError) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/main/users/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ showError: data.error });
                    } else {
                        this.setState({ user: data });
                    }
                });
            })
            .catch(showError => this.setState({ showError: showError }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/users" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend> Atualizar Usuário </legend>
                        <div className="user-update">
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
                        <div className="user-update">
                            <label htmlFor="salary"> Salário </label>
                            <br />
                            <input
                                type="text"
                                id="salary"
                                name="salary"
                                placeholder="Salário"
                                min="1"
                                max="99999"
                                required
                                value={this.state.user.salary}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="user-update">
                            <label htmlFor="birthday"> Data de Nascimento </label>
                            <br />
                            <input
                                type="text"
                                id="birthday"
                                name="birthday"
                                placeholder="Data de Nascimento"
                                required
                                value={this.state.user.birthday}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
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
    };
 
    handleSubmit = event => {
        const { id } = this.state.user;
 
        fetch(`${process.env.REACT_APP_API_URL}/main/users/${id}`, {
            method: "put",
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
                            this.setState({ showError: data.error });
                        }
                    });
                }
            })
            .catch(showError => this.setState({ showError: showError }));
 
        event.preventDefault();
    };
}
 
export default UpdateUser;
