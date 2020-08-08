import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const Nav = styled.nav`
	background-color: #151711;
	width: 100%;
	.selected {
		background-color: #f78e69;
		border-radius: 10px;
		color: black;
		font-weight: bold;
	}
	ul {
		margin: 0;
		display: flex;
		justify-content: center;
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
