import React from "react";
import { Nav, NavItem } from "./styles";

export const Navigation = () => {
	return (
		<Nav>
			<ul>
				<li>
					<NavItem activeClassName="selected" to="/auth/register">
						Register
					</NavItem>
				</li>
				<li>
					<NavItem activeClassName="selected" to="/main">
						Main
					</NavItem>
				</li>
				<li>
					<NavItem activeClassName="selected" to="/auth/login">
						Login
					</NavItem>
				</li>
			</ul>
		</Nav>
	);
};
