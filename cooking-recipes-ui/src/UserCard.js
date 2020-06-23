import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function UserCard(props) {
  function onRemove() {
    if (props.item._id === JSON.parse(window.sessionStorage.getItem('currentUserId'))._id || JSON.parse(window.sessionStorage.getItem('currentUserId')).role === "admin") {
      props.remove && props.remove(props.item._id);
    }
  }

  useEffect(() => {
    if (!window.sessionStorage.getItem('currentUserId') || (props.item._id !== JSON.parse(window.sessionStorage.getItem('currentUserId'))._id && JSON.parse(window.sessionStorage.getItem('currentUserId')).role !== 'admin')) {
      document.getElementById("delete_btn" + props.item._id).classList.add('disabled');
      document.getElementById("edit_btn" + props.item._id).classList.add('disabled');
    }
  });

  return (
    <div className="row">
      <div className="col s9 offset-s1">
        <div className="card horizontal">
          <div className="card-image"><img src={"data:image/png;base64," + props.item.profile_picture} style={{ maxWidth: '200px' }} /></div>
          <div className="card-stacked">
            <div className="card-content">
              <h3>{props.item.first_name} {props.item.last_name}</h3>
              <h4>{props.item.username}</h4>
              <p>{props.item.about}</p>
            </div>
            <div className="row">
              <div className="card-action">
                <ul>
                  <li style={{ display: "inline" }}><Link to={'/users/' + props.item._id} id={"edit_btn"+props.item._id} className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">edit</Link></li>
                  <li style={{ display: "inline" }}><button onClick={onRemove} id={"delete_btn"+props.item._id} className="right waves-effect waves-light btn red lighten-4 red-text text-darken-3">delete</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
