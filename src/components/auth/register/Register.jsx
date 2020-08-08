import React from "react";
import { Form, Input, Button } from "./styles";
import { Animated } from "react-animated-css";

export const Register = () => {
	return (
		<Form className="animate__animated animate__fadeIn">
			<h1>Register</h1>

			<Input type="text" placeholder="Your email" />
			<Input type="password" placeholder="Your password" />
			<Input type="password" placeholder="Repeat password" />
			<Button>Register</Button>
		</Form>
	);
};
