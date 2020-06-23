import M from 'materialize-css/dist/js/materialize.min.js';
import React, { useEffect } from "react";
import { Link, withRouter, Route } from 'react-router-dom';

export const NavBar = (props) => {
  useEffect(() => {
    let sidenav = document.querySelector('.sidenav');
    M.Sidenav.init(sidenav, {});
  }
  );

  function handleLogOut(e) {
    window.sessionStorage.removeItem('currentUserId');
    let { history } = props;
    history.push('/');
  }


  return (
    <div>
      <div className="navbar-fixed">
        <nav className="red darken-1">
          <div className="nav-wrapper" >
            <Link to="/" href="#!" className="brand-logo center">Cooking Recipes</Link>
            <Link to="/" href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
            <ul className="left hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/users">Users</Link></li>
            </ul>
            <ul className="right hide-on-med-and-down">
              {
                !window.sessionStorage.getItem("currentUserId") ?
                  [<li key={"login_main"}><Link to="/login" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">Log in</Link></li>,
                  <li key={"register_main"}><Link to="/users/new" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">Sign in</Link></li>]
                  :
                  [<li key={"my_recies_side"}><Link to="/my-recipes" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">My recipes</Link></li>,
                  <li key={"add_main"}><Link to="/recipes/new" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">+</Link></li>,
                  <li key={"logout_main"}><Route><button onClick={handleLogOut} className="waves-effect waves-light btn red lighten-4 red-text text-darken-3" type={"button"}>Log Out</button></Route></li>]
              }
            </ul>
          </div>
        </nav>
      </div>
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recipes">Recipes</Link></li>
        <li><Link to="/users">Users</Link></li>
        {
          !window.sessionStorage.getItem("currentUserId") ?
            [<li key={"login_main"}><Link to="/login" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">Log in</Link></li>,
            <li key={"register_main"}><Link to="/users/new" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">Sign in</Link></li>]
            :
            [<li key={"my_recies_side"}><Link to="/recipes" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">My recipes</Link></li>,
            <li key={"add_main"}><Link to="/recipes/new" className="waves-effect waves-light btn red lighten-4 red-text text-darken-3">+</Link></li>,
            <li key={"logout_main"}><Route><button onClick={handleLogOut} className="waves-effect waves-light btn red lighten-4 red-text text-darken-3" type={"button"}>Log Out</button></Route></li>]
        }
      </ul>
    </div>
  );
}

export default withRouter(NavBar);
