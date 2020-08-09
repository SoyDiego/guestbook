import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
	background-color: #151711;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	.selected {
		background-color: #f78e69;
		border-radius: 10px;
		color: black;
		font-weight: bold;
	}
	ul {
		margin: 0;
		display: flex;
		list-style: none;
		padding: 1.5rem;
	}
`;

export const NavItem = styled(NavLink)`
	text-decoration: none;
	color: white;
	padding: 2rem;
	margin: 1rem;
	cursor: pointer;
`;

export const WelcomeMessage = styled.span`
	color: white;
`;

export const Button = styled.button`
	margin: 1rem;
	background-color: transparent;
	border-radius: 10px;
	border: none;
	padding: 1rem;
	cursor: pointer;
	border: 2px solid #f78e69;
	color: white;
	transition: background-color 0.5s ease;

	&:hover {
		background-color: #f78e69;
		color: black;
	}
`;
