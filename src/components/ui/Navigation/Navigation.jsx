import React from "react";
import { Nav, NavItem, WelcomeMessage, Button } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../../actions/auth";
import { startNewCommentOrEdit } from "../../../actions/comments";
import { useLocation } from "react-router-dom";

export const Navigation = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { username } = useSelector((state) => state?.auth);

	const handleLogout = () => {
		dispatch(startLogout());
	};

	const handleNewComment = () => {
		dispatch(startNewCommentOrEdit("add"));
	};
	console.log(location.pathname);
	return (
		<Nav className="animate__animated animate__fadeIn">
			<ul>
				{!username ? (
					<li>
						<NavItem activeClassName="selected" to="/auth/register">
							Register
						</NavItem>
					</li>
				) : (
					<li>
						<NavItem exact activeClassName="selected" to="/">
							Main
						</NavItem>
					</li>
				)}
				<li>
					{username ? (
						<NavItem
							activeClassName="selected"
							to="/auth/login"
							onClick={handleLogout}>
							Logout
						</NavItem>
					) : (
						<NavItem activeClassName="selected" to="/auth/login">
							Login
						</NavItem>
					)}
				</li>
			</ul>

			<div>
				<WelcomeMessage>
					Welcome, {username ? username : "unknown"}
				</WelcomeMessage>
			</div>

			{username &&
				(location.pathname === "/" ? (
					<div>
						<Button onClick={handleNewComment}>
							New comment :)
						</Button>
					</div>
				) : (
					<div>
						<Button onClick={handleNewComment}>
							Write your opinion :)
						</Button>
					</div>
				))}
		</Nav>
	);
};
