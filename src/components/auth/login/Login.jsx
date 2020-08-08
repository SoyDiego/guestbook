import React from "react";
import { Form, Input, Button } from "./styles";
import { useForm } from "../../../hooks/useForm";

export const Login = () => {
	const [formValues, handleInputChange] = useForm({
		email: "",
		password: "",
	});
	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		console.log(email, password);
	};
	return (
		<Form
			onSubmit={handleLogin}
			className="animate__animated animate__fadeIn">
			<h1>Login</h1>

			<Input
				type="text"
				placeholder="Your email"
				name="email"
				value={email}
				onChange={handleInputChange}
			/>
			<Input
				type="password"
				placeholder="Your password"
				name="password"
				value={password}
				onChange={handleInputChange}
			/>
			<Button type="submit">Login</Button>
		</Form>
	);
};
