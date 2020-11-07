import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css';
 
class DeleteUser extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            user: {},
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
 
        fetch(`http://localhost:3003/main/users/${id}`)
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
                <fieldset>
                    <legend> Deletar Usuário </legend>
                    <div className="user-delete">
                        <label htmlFor="nome">{this.state.user.userName} </label>
                        <p> Confirme a sua requisição </p>
 
                        <button
                            onClick={this.handleClick}
                        >
                            Deletar
                        </button>
                        <br /><br />
                        <Link to={`/users`}> Voltar </Link>
                    </div>
                </fieldset>
            );
        }
    }
 
    handleClick = event => {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/main/users/${id}`, {
            method: "delete"
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
 
export default DeleteUser;
