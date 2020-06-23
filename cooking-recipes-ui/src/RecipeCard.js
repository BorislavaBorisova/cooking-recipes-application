import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard(props) {
  function onRemove() {//TODO
    if (props.item.author_id === JSON.parse(window.sessionStorage.getItem('currentUserId'))._id || JSON.parse(window.sessionStorage.getItem('currentUserId')).role === "admin"){
      props.remove && props.remove(props.item._id);
    }
  }


  useEffect(() => {
    if(!window.sessionStorage.getItem('currentUserId') || (props.item.author_id !== JSON.parse(window.sessionStorage.getItem('currentUserId'))._id && JSON.parse(window.sessionStorage.getItem('currentUserId')).role !== 'admin')){
      document.getElementById("delete_btn"+props.item._id).classList.add('disabled');
      document.getElementById("edit_btn"+props.item._id).classList.add('disabled');
    }
  });
   
  return (
    <div style={{ width: '30%', float: 'left', paddingLeft: '1%' }}>
      <div className="card medium">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={"data:image/png;base64," + props.item.recipe_picture} />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{props.item.recipe_name}<i className="material-icons right">more_vert</i></span>
          <p>Time needed: {props.item.time_preparation} min</p>
          <div className="row">
            <ul>
              <li style={{ display: "inline" }}><Link to={'users/'+ props.item.author_id +'/recipes/' + props.item._id} id={"edit_btn"+props.item._id} className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">edit</Link></li>
              <li style={{ display: "inline" }}><button onClick={onRemove} id={"delete_btn"+props.item._id} className="right waves-effect waves-light btn red lighten-4 red-text text-darken-3">delete</button></li>
            </ul>
          </div>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{props.item.recipe_name}<i className="material-icons right">close</i></span>
          <p>{props.item.description.substring(0, 150)}</p>
          {/* Here we can use props.item.description.substring(0, 150) to show only 150 characters. */}
        </div>
      </div>
    </div>
  );
}