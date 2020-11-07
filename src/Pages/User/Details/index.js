import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
export default class DetailsUser extends Component {
    state = {
        user: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/main/users/${id}`)
            .then(user =>
                user.json().then(user => this.setState({ user }))
            )
            .catch(error => this.setState({ error }));
    }
 
    render() {
        const { user } = this.state;
 
        if (user.active) {
            user.active = "Ativo";
        } else {
            user.active = "Inativo";
        }
 
        return (
            <div className="user-info">
                <h1> Nome: {user.userName} </h1>
                <h1> Atividade: {user.active} </h1>
                <h1> Salário: R$ {user.salary} </h1>
                <h1> Data de nascimento: {user.birthday} </h1>
                <br />
                <Link to={`/users`}> Voltar </Link> <br />
                <Link to={`/updateuser/${user.id}`}> Editar Usuário </Link> <br />
                <Link to={`/deleteuser/${user.id}`}> Deletar Usuário </Link> <br />
            </div >
        );
    }
}
