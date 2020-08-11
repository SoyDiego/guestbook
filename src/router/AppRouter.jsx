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
import { Main } from "../components/main/Main";
import { Navigation } from "../components/ui/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";
import { Loading } from "../components/ui/loading/Loading";

export const AppRouter = () => {
	const [checking, setChecking] = useState(true);
	const dispatch = useDispatch();

	//Mantiene el usuario autenticado
	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user?.uid) {
				dispatch(loginUser(user.uid, user.displayName));
			}

			setChecking(false);
		});
	}, [dispatch]);

	if (checking) {
		return <Loading />;
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

					<Redirect to="/login" />
				</Switch>
			</div>
		</Router>
	);
};
