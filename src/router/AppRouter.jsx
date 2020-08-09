import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { firebase } from "../firebase/config";
import { Login } from "../components/auth/login/Login";
import { Register } from "../components/auth/register/Register";
import { Main } from "../components/auth/main/Main";
import { Navigation } from "../components/ui/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";

export const AppRouter = () => {
	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const dispatch = useDispatch();

	//Mantiene el usuario autenticado
	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(loginUser(user.uid, user.displayName));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
			setChecking(false);
		});
	}, [dispatch, setIsLoggedIn]);

	if (checking) {
		return <h1>Loading...</h1>;
	}

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
