import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import TextArea from './form-elements/TextArea';
import UploadFile from './form-elements/UploadFile';
import Input from './form-elements/Input';
import { v4 as uuidv4 } from 'uuid';
import List from './form-elements/List';
import { CookingRecipesAPI as API } from './CookingRecipesAPI.js';

class RecipeDataForm extends Component {
  constructor(props) {
    super(props);

    if (props.recipe_name) {
      this.state = {
        newItem: "",
        recipe: {
          _id: this.props._id,
          author_id: this.props.author_id,
          recipe_name: this.props.recipe_name,
          description: this.props.description,
          time_preparation: this.props.time_preparation,
          ingredients: this.props.ingredients,//array
          recipe_picture: this.props.recipe_picture,
          detailed_description: this.props.detailed_description,
          tags: this.props.tags,//array
          time_registration: this.props.time_registration,
          time_last_modification: this.props.time_last_modification
        }
      }
    } else {
      this.state = {
        newItem: '',
        newTag: '',
        recipe: {
          _id: '',
          author_id: '',
          recipe_name: '',
          description: '',
          time_preparation: '',
          ingredients: [],//array
          recipe_picture: '',
          detailed_description: '',
          tags: [],//array
          time_registration: '',
          time_last_modification: ''
        }
      }
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handlePictureUpload = this.handlePictureUpload.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.updateTag = this.updateTag.bind(this);
  }

  componentDidMount() {
    var array_of_dom_elements = document.querySelectorAll("input[type=range]");
    M.Range.init(array_of_dom_elements);

    console.log("from recipe");
    if (this.props.match.params._id && this.props.match.params.author_id && !this.state.recipe._id) {
      API.getRecipeById(this.props.match.params.author_id ,this.props.match.params._id).then(recipe => {
        this.setState(() => ({
          recipe: recipe
        }))
      })
    }
  }

  handleInput(e) {
    const value = e.target.value;
    const key = e.target.getAttribute('name');
    this.setState(
      prevState => {
        const recipe = prevState.recipe;
        recipe[key] = value;
        return { recipe: recipe };
      }
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
          prevState => ({ recipe: { ...prevState.recipe, recipe_picture: imageBase64 } })
        )
      }
      reader.readAsDataURL(file);
    } else {
      self.setState(
        prevState => ({ recipe: { ...prevState.recipe, recipe_picture: '' } })
      )
    }
  }

  getCurrentDateTime() {
    const today = new Date();
    const dateRegistered = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    return dateRegistered;
  }

  storeRecipeData(isUpdate) {
    const { history } = this.props;
    if(isUpdate){
      API.updateRecipe(this.state.recipe, JSON.parse(sessionStorage.getItem('currentUserId'))._id, this.state.recipe._id).then(() =>
        M.toast({html: `Recipe ${this.state.recipe.recipe_name} successfullly updated.`, classes: 'rounded'})
      );
      
    } else {
      API.addRecipe(this.state.recipe, JSON.parse(sessionStorage.getItem('currentUserId'))._id).then(() =>
        M.toast({html: `Recipe ${this.state.recipe.recipe_name} successfullly added.`, classes: 'rounded'})
      );
    }
    //window.localStorage.setItem(`recipe_${this.state.recipe._id}`, JSON.stringify(this.state.recipe));
    history.push('/');
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const currentDate = this.getCurrentDateTime();

    if (this.state.recipe.recipe_picture) {
      if (this.state.recipe.time_registration !== '') {
        this.setState(
          prevState => ({ recipe: { ...prevState.recipe, time_last_modification: currentDate } }), this.storeRecipeData.bind(this, true)
        )
      } else {
        const currentUserId = JSON.parse(sessionStorage.getItem('currentUserId'))._id;
        this.setState(
          prevState => ({ recipe: { ...prevState.recipe, _id: uuidv4(), author_id: currentUserId, time_registration: currentDate } }), this.storeRecipeData.bind(this, false)
        )
      }
    }
  }

  addItem() {
    if (this.state.newItem) {
      const newItem = this.state.newItem.slice();
      const list = [...this.state.recipe.ingredients, newItem];

      this.setState(
        () => ({ recipe: { ...this.state.recipe, ingredients: list }, newItem: '' })
      );
    }
  }

  deleteItem(valueToBeDeleted) {
    const list = [...this.state.recipe.ingredients];
    const updatedList = list.filter(item => item !== valueToBeDeleted);

    this.setState(
      () => ({ recipe: { ...this.state.recipe, ingredients: updatedList } })
    );
  }

  updateItem(e) {
    const item = e.target.value;
    this.setState(() => ({ newItem: item }));
  }

  addTag() {
    if (this.state.newTag) {
      const newTag = this.state.newTag.slice();
      const list = [...this.state.recipe.tags, newTag];

      this.setState(
        () => ({ recipe: { ...this.state.recipe, tags: list }, newTag: '' })
      );
    }
  }

  deleteTag(valueToBeDeleted) {
    const list = [...this.state.recipe.tags];
    const updatedList = list.filter(tag => tag !== valueToBeDeleted);

    this.setState(
      () => ({ recipe: { ...this.state.recipe, tags: updatedList } })
    );
  }

  updateTag(e) {
    const tag = e.target.value;
    this.setState(() => ({ newTag: tag }));
  }

  render() {

    return (
      <div className="container section">
        <form className="col s10" onSubmit={this.handleFormSubmit}>
          {/* Recipe name */}
          <Input id={"recipe_name"} name={"recipe_name"} title={"Recipe name"} type={"text"} className={"validate"} handleChange={this.handleInput} placeholder={"Enter recipe name"} value={this.state.recipe.recipe_name} />

          {/* Description */}
          <TextArea id={"description"} name={"description"} length={"256"} title={"Short description"} placeholder={"Enter short description"} handleChange={this.handleInput} value={this.state.recipe.description} />

          {/* Time */}
          <p className="range-field">
            <label htmlFor={"time_preparation"}>Time for preparation:</label>
            <input type={"range"} name={"time_preparation"} id={"time_preparation"} min={0} max={120} onChange={this.handleInput} value={this.state.recipe.time_preparation} />
          </p>

          {/* Ingredients */}
          <List id={"ingredients"} newItem={this.state.newItem} name={"ingredients"} title={"Ingredients"} type={"text"} placeholder={"Enter ingredient"} list={this.state.recipe.ingredients} onAdd={this.addItem} onDelete={this.deleteItem} onUpdate={this.updateItem} />

          {/* Recipe picture upload */}
          <UploadFile id={"recipe_picture"} name={"recipe_picture"} handleChange={this.handlePictureUpload} value={this.state.recipe.recipe_picture} />

          {/* Detailed description */}
          <TextArea id={"detailed_description"} name={"detailed_description"} length={2048} title={"Detailed description"} placeholder={"Enter the detailed recipe description"} handleChange={this.handleInput} value={this.state.recipe.detailed_description} />

          {/* Tags */}
          <List id={"tags"} newTag={this.state.newTag} name={"tags"} title={"Tags"} type={"text"} placeholder={"Enter tags"} list={this.state.recipe.tags} onAdd={this.addTag} onDelete={this.deleteTag} onUpdate={this.updateTag} />

          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.handleFormSubmit} >Submit
              <i className="material-icons right">send</i>
          </button>

        </form>
      </div>
    );
  }
}

export default RecipeDataForm;
