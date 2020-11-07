import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import MainUser from './Pages/User/Main';
import DetailsUser from './Pages/User/Details';
import CreateUser from './Pages/User/Create';
import UpdateUser from './Pages/User/Update';
import DeleteUser from './Pages/User/Delete';

const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/users" component={MainUser} />
            <Route path="/users/:id" component={DetailsUser} />
            <Route path="/createuser" component={CreateUser} />
            <Route path="/updateuser/:id" component={UpdateUser} />
            <Route path="/deleteuser/:id" component={DeleteUser} />
        </Switch>
    </BrowserRouter>
)
 
export default Routes;