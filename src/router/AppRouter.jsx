import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";
import { Main } from "../components/auth/main/Main";
import { Navigation } from "../components/ui/Navigation/Navigation";

export const AppRouter = () => {
	return (
		<Router>
			<div>
				<Navigation />
				<Switch>
					<Route exact path="/auth/login">
						<Login />
					</Route>
					<Route exact path="/auth/register">
						<Register />
					</Route>
					<Route exact path="/main">
						<Main />
					</Route>

					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};
