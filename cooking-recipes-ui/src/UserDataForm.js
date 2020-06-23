import React, { Component } from 'react';
import RadioButtons from './form-elements/RadioButtons';
import SmallInput from './form-elements/SmallInput';
import TextArea from './form-elements/TextArea';
import UploadFile from './form-elements/UploadFile';
import { v4 as uuidv4 } from 'uuid';
import { CookingRecipesAPI as API } from './CookingRecipesAPI.js';
import M from 'materialize-css/dist/js/materialize.min.js';

class UserDataForm extends Component {
    constructor(props) {
        super(props);
        console.log(props, " &*************& ")

        this.state = {
            newUser: {
                _id: '',
                first_name: '',
                last_name: '',
                username: '',
                gender: 'other',
                role: 'user',
                about: '',
                password: '',
                profile_picture: '',
                time_registration: '',
                time_last_modification: '',
                status: ''
            },

            genderOptions: ['male', 'female', 'other'],
            roleOptions: ['user', 'admin']
        }


        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePictureUpload = this.handlePictureUpload.bind(this);
    }

    componentDidMount(){
        console.log("from user");
        if (this.props.match.params._id && !this.state.newUser._id) {
            API.getUserById(this.props.match.params._id).then(user => {
                this.setState(() => ({
                    newUser: user
                }))
            })
        }
    }

    handleInput(e) {
        const value = e.target.value;
        const key = e.target.getAttribute('name');
        this.setState(
            prevState => {
                const newUser = prevState.newUser;
                newUser[key] = value;
                return { newUser: newUser };
            }
        )
        setTimeout(() => console.log(this.state), 1000);
    }

    handlePassword(e) {
        const value = e.target.value;
        if (value.match(/(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/gm)) {
            document.getElementById("password").classList.remove('invalid');
            document.getElementById("password").classList.add('valid');
        } else {
            document.getElementById("password").classList.remove('valid');
            document.getElementById("password").classList.add('invalid');
        }
        this.setState(
            prevState => ({ newUser: { ...prevState.newUser, password: value } })
        )
    }

    handlePictureUpload(e) {
        const self = this;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function (e) {
                const imageBase64 = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                self.setState(
                    prevState => ({ newUser: { ...prevState.newUser, profile_picture: imageBase64 } })
                )
            }
            reader.readAsDataURL(file);
        } else {
            self.setState(
                prevState => ({ newUser: { ...prevState.newUser, profile_picture: '' } })
            )
        }
    }

    setDefaultImage() {
        if (this.state.newUser.profile_picture === '') {
            let defaultPicture;
            if (this.state.newUser.gender === "male") {
                defaultPicture = "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";
            } else if (this.state.newUser.gender === "female") {
                defaultPicture = "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";
            } else {
                defaultPicture = "iVBORw0KGgoAAAANSUhEUgAAAOIAAADiCAYAAABTEBvXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADFWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMwMTQgNzkuMTU2Nzk3LCAyMDE0LzA4LzIwLTA5OjUzOjAyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBJbWFnZVJlYWR5IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNDQxRjg3MEZERjExRTZBQjZGRDc1MTlCMDdEQkJEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCNDQxRjg4MEZERjExRTZBQjZGRDc1MTlCMDdEQkJEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI0NDFGODUwRkRGMTFFNkFCNkZENzUxOUIwN0RCQkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI0NDFGODYwRkRGMTFFNkFCNkZENzUxOUIwN0RCQkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/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";
            }

            this.setState(
                prevState => ({ newUser: { ...prevState.newUser, profile_picture: defaultPicture } })
            )
        }
    }

    getCurrentDateTime() {
        const today = new Date();
        const dateRegistered = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
        return dateRegistered;
    }

    storeUserData(isUpdate) {
        const { history } = this.props;
        console.log(this.state.newUser);
        if (isUpdate) {
            API.updateUser(this.state.newUser).then(() =>
                M.toast({html: `User ${this.state.newUser.username} successfullly updated.`, classes: 'rounded'})
            );
        } else {
            API.registerUser(this.state.newUser).then(() =>
                M.toast({html: `User ${this.state.newUser.username} successfullly registered.`, classes: 'rounded'})
            );
        }

        //window.localStorage.setItem('user_'.concat('', this.state.newUser._id), JSON.stringify(this.state.newUser));
        history.push('/');
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const currentDate = this.getCurrentDateTime();
        this.setDefaultImage();

        if (!this.state.newUser.password) {
            document.getElementById("password").classList.remove('valid');
            document.getElementById("password").classList.add('invalid');
        } else if (!this.state.newUser.username) {
            document.getElementById("username").classList.remove('valid');
            document.getElementById("username").classList.add('invalid');
        } else if (this.state.newUser.username && this.state.newUser.password && this.state.newUser.password.match(/(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}/gm)) {
            if (this.state.newUser.time_registration !== '') {
                this.setState(
                    prevState => ({ newUser: { ...prevState.newUser, time_last_modification: currentDate } }), this.storeUserData.bind(this, true)
                )
            } else {
                this.setState(
                    prevState => ({ newUser: { ...prevState.newUser, _id: uuidv4(), time_registration: currentDate, status: 'active' } }), this.storeUserData.bind(this, false)
                )
            }
        } else {
            document.getElementById("password").classList.remove('valid');
            document.getElementById("password").classList.add('invalid');
            document.getElementById("username").classList.remove('valid');
            document.getElementById("username").classList.add('invalid');
        }
    }

    render() {

        return (
            <div className="container section">
                <form className="col s10" onSubmit={this.handleFormSubmit}>
                    <div className="row">
                        {/* First name */}
                        <SmallInput id={"first_name"} name={"first_name"} title={"First Name"} type={"text"} className={"validate"} handleChange={this.handleInput} placeholder={"Enter first name"} value={this.state.newUser.first_name} />
                        {/* Last name */}
                        <SmallInput id={"last_name"} name={"last_name"} title={"Last Name"} type={"text"} className={"validate"} handleChange={this.handleInput} placeholder={"Enter last name"} value={this.state.newUser.last_name} />
                    </div>
                    <div className="row">
                        {/* Username */}
                        <SmallInput id={"username"} name={"username"} title={"Username *"} type={"text"} className={"validate"} handleChange={this.handleInput} placeholder={"Enter username"} value={this.state.newUser.username} />
                        {/* Password */}
                        <SmallInput id={"password"} name={"password"} title={"Password *"} type={"password"} className={"validate"} handleChange={this.handlePassword} placeholder={"Enter password"} value={this.state.newUser.password} />
                    </div>
                    <div className="row">
                        <div className="col s6">
                            {/* Gender */}
                            <RadioButtons id={"gender"} name={"gender"} title={"Gender"} options={this.state.genderOptions} handleChange={this.handleInput} selectedOption={this.state.newUser.gender} />
                        </div>
                        <div className="col s6">
                            {/* User or Admin */}
                            <RadioButtons id={"role"} name={"role"} title={"Role"} options={this.state.roleOptions} handleChange={this.handleInput} selectedOption={this.state.newUser.role} />
                        </div>
                    </div>
                    {/* About you */}
                    <TextArea id={"about"} name={"about"} length={"512"} title={"About you"} placeholder={"Share something about yourself"} handleChange={this.handleInput} value={this.state.newUser.about} />
                    {/* Profile picture upload */}
                    <UploadFile id={"profile_picture"} handleChange={this.handlePictureUpload} value={this.state.newUser.profile_picture} />
                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleFormSubmit} >Submit
                    <i className="material-icons right">send</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default UserDataForm;
