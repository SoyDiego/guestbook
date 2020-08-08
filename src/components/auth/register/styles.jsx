import styled from "@emotion/styled";

export const Form = styled.form`
	height: 100%;
	margin: 2rem auto;
	width: 450px;
	padding: 1.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 2px solid black;
	border-radius: 20px;
`;

export const Input = styled.input`
	width: 300px;
	margin: 1rem;
	border: none;
	background-color: transparent;
	border-bottom: 2px solid #f78e69;
`;

export const Button = styled.button`
	margin: 1rem;
	background-color: transparent;
	border-radius: 10px;
	border: none;
	padding: 1rem;
	cursor: pointer;
	border: 2px solid #f78e69;
	transition: background-color 0.5s ease;

	&:hover {
		background-color: #f78e69;
	}
`;
