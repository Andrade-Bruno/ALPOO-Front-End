import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

 
export default class MainUser extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            user: [],
            error: null
        };
    }
 
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/main/users`)
            .then(user =>
                user.json().then(user => this.setState({ user }))
            )
            .catch(error => this.setState({ error }));
    }
 
    render() {
        const { user } = this.state;
        
        return (
            <div className="user-list">
                <Link to={`/createuser`}>
                    <button type="button" class="btn btn-success"> Novo Usuário </button>
                </Link>
                <br /><br />
 
                <table class="table table-hover">
                    
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Salário</th>
                            <th scope="col">Data de Nascimento</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {user.map((user, index) => (
                            <tr>
                                <th scope="row">
                                    {user.id}
                                </th>
                                <td>
                                    {user.userName}
                                </td>
                                <td>
                                    {user.salary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </td>
                                <td>
                                    {new Date(user.birthday).toLocaleDateString('pt-BR', { timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' })}
                                </td>
                                <td>
                                    {user.active ? "Sim" : "Não"}
                                </td>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        <button type="button" class="btn btn-primary"> Detalhes </button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/updateuser/${user.id}`}>
                                        <button type="button" class="btn btn-warning"> Atualizar </button>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/deleteuser/${user.id}`}>
                                        <button type="button" class="btn btn-danger"> Delete </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
