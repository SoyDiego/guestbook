import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { firebase } from "../firebase/config";
import { Main } from "../components/main/Main";
import { Navigation } from "../components/ui/Navigation/Navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/auth";
import { Loading } from "../components/ui/loading/Loading";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";

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
	}, [dispatch]);

	if (checking) {
		return <Loading />;
	}

	return (
		<Router>
			<div>
				<Navigation />
				<Switch>
					<PublicRoute
						path="/auth"
						isAuthenticated={isLoggedIn}
						component={AuthRouter}
					/>

					<PrivateRoute
						exact
						path="/"
						isAuthenticated={isLoggedIn}
						component={Main}
					/>
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
};
