import React from "react";
import { Form, Input, Button } from "./styles";

export const Login = () => {
	return (
		<Form className="animate__animated animate__fadeIn">
			<h1>Login</h1>

			<Input type="text" placeholder="Your email" />
			<Input type="password" placeholder="Your password" />
			<Button>Login</Button>
		</Form>
	);
};
