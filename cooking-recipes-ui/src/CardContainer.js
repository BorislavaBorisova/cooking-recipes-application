import React, { Component } from 'react';
import UserCard from './UserCard';
import RecipeCard from './RecipeCard';
import M from  'materialize-css/dist/js/materialize.min.js';
import {CookingRecipesAPI as API} from './CookingRecipesAPI.js';

class CardContainer extends Component {
   constructor(props) {
      super(props);

      this.state = {
         items: [],
         log: {},
         contentType: ''
      };

      this.onRemove = this.onRemove.bind(this);
   }

   async componentDidMount() {
      let contentType = this.props.content;

      if (contentType !== this.state.contentType) {

         let log = {};
         log["type"] = contentType;
         
         let respArray = [];
         try{
            if(contentType === "user_"){
               respArray = await API.getAllUsers();
            } else if(this.props.location.pathname.endsWith("my-recipes")){
               respArray = await API.getAllRecipesByUser(JSON.parse(sessionStorage.getItem('currentUserId'))._id);
            } else {
               respArray = await API.getAllRecipes();
            }
         } catch(err) {
            M.toast({html: err.message, classes: 'rounded'});
         }

         this.setState(() => ({
            items: respArray,
            log: log,
            contentType: contentType
         }))
      }
   }

   onRemove(identifier) {
      if(this.state.contentType === "user_"){
         API.deleteUser(identifier).then(
            this.setState(() => {
               const list = this.state.items.filter(element => {
                  return (element._id !== identifier);
               });
      
               return {
                  items: list,
               };
            })
         ).catch(err => {
            M.toast({html: err.message, classes: 'rounded'});
         })
      } else {
         console.log(JSON.parse(window.sessionStorage.getItem('currentUserId'))._id + " " + identifier);
         API.deleteRecipe(JSON.parse(window.sessionStorage.getItem('currentUserId'))._id, identifier).then(
            this.setState(() => {
               const list = this.state.items.filter(element => {
                  return (element._id !== identifier);
               });
      
               return {
                  items: list,
               };
            })
         ).catch(err => {
            M.toast({html: err.message, classes: 'rounded'});
         })
      }
   }

   render() {
      return (
         <div style={{ width: '100%', paddingLeft: '8%' }}>
            <div className="col s11 offset-s1">
               {(this.state.items || []).map(item => {
                  if (this.state.contentType === "user_") {
                     console.log("********");
                     return <UserCard item={item} key={item._id} remove={this.onRemove} />;
                  } else {
                     console.log(item);
                     return <RecipeCard item={item} key={item._id} remove={this.onRemove} />;
                  }
               })
               }
            </div>
         </div>
      )
   }
}

export default CardContainer;