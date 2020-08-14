import React from "react";
import { Form, Input, Button } from "./styles";
import { useForm } from "../../../hooks/useForm";
import { useDispatch } from "react-redux";
import { registerNewUser } from "../../../actions/auth";
import { formIsValid } from "../../../helpers/helpers";

export const Register = () => {
	const dispatch = useDispatch();
	const [formValues, handleInputChange] = useForm({
		username: "",
		email: "",
		password: "",
		password2: "",
	});
	const { username, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();

		if (formIsValid(username, email, password, password2)) {
			dispatch(registerNewUser(email, password, username));
		}
	};

	return (
		<Form
			onSubmit={handleRegister}
			className="animate__animated animate__fadeIn">
			<h1>Register</h1>

			<Input
				type="text"
				placeholder="Your username"
				name="username"
				value={username}
				onChange={handleInputChange}
			/>
			<Input
				type="email"
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
			<Input
				type="password"
				placeholder="Repeat password"
				name="password2"
				value={password2}
				onChange={handleInputChange}
			/>
			<Button type="submit">Register</Button>
		</Form>
	);
};
