import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";

export const AuthRouter = () => {
	return (
		<Switch>
			<Route exact path="/auth/login" component={Login} />
			<Route exact path="/auth/register" component={Register} />
			<Redirect to="/login" />
		</Switch>
	);
};
