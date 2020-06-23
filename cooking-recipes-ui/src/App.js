import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from './NavBar.js';
import CardContainer from './CardContainer.js';
import PrivateRoute from './PrivateRoute.js';
import UserDataForm from './UserDataForm.js';
import LoginForm from './LoginForm.js';
import EditUserForm from './EditUserForm.js';
import EditRecipeForm from './EditRecipeForm.js';
import RecipeDataForm from './RecipeDataForm.js';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Route path='/' component={NavBar} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginForm} />

        <PrivateRoute path='/users/:author_id/recipes/:_id' component={RecipeDataForm} />
        <Route exact path="/users/new" component={UserDataForm} />
        <PrivateRoute path='/users/:_id' component={UserDataForm} />
        <PrivateRoute path='/my-recipes' content={"recipe_"} key={"recipe_"} component={CardContainer} />
        <Route exact path="/users" render={(props) => <CardContainer {...props} content={"user_"} key={"user_"} />} />
        <PrivateRoute exact path="/recipes/new" component={RecipeDataForm} />
        <Route exact path="/recipes" render={(props) => <CardContainer {...props} content={"recipe_"} key={"recipe_"} />} />

        {/* <a href="https://www.freepik.com/free-photos-vectors/people">People vector created by freepik - www.freepik.com</a> */}
        
        {/* <Route path='/users/:_id'>
          <EditUserForm/>
        </Route>
        <Route exact path="/users/new">
          <UserDataForm/>
        </Route>
        <Route exact path="/users" content={"user_"}>
          <CardContainer key={"user_"}/>
        </Route>
        <Route exact path="/recipes/new">
          <RecipeDataForm/>
        </Route>
        <Route exact path="/recipe" content={"recipe_"}>
          <CardContainer key={"recipe_"}/>
        </Route>
        <Route path='/recipes/:_id'>
          <EditRecipeForm/>
        </Route> */}

        {/* <PrivateRouter path="/protected">
          <ProtectedPage />
        </PrivateRouter> */}
      </Switch>
    </Router>

  );
}

export default App;
