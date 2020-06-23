import React, { Component, useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import UserDataForm from './UserDataForm';
import M from 'materialize-css/dist/js/materialize.min.js';
import { CookingRecipesAPI as API } from './CookingRecipesAPI.js';

class EditUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount = () => {
    API.getUserById(this.props.match.params._id).then(responseUser =>
      this.setState(() => ({
        user: responseUser
      }))
    ).catch(err => {
      M.toast({ html: err.message, classes: 'rounded' });
    });

    console.log(this.state.user); //User is empty
    setTimeout(() => console.log(this.state.user), 1000); //User is full
  }

  render() {
    return (
      <div>
        <Route render={(props) => <UserDataForm {...props} user_id={this.state.user._id} first_name={this.state.user.first_name} last_name={this.state.user.last_name} username={this.state.user.username} gender={this.state.user.gender} password={this.state.user.password} role={this.state.user.role} about={this.state.user.about} profile_picture={this.state.user.profile_picture} status={this.state.user.status} />} />
      </div>
    )
  }
}

export default EditUserForm;