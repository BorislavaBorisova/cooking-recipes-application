import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Comp, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                window.sessionStorage.getItem("currentUserId") ? (
                    <Comp {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login", state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoute;