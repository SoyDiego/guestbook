import styled from "@emotion/styled";

export const Card = styled.div`
	width: 300px;
	margin: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;
`;

export const ContainerDeleteButton = styled.div`
	height: 100%;
	display: flex;
	align-self: flex-end;
	justify-content: flex-end;
`;

export const DeleteButton = styled.button`
	background-color: #ff6961;
	border: none;
	padding: 0.5rem;
	cursor: pointer;
	border: 2px solid #ff6961;
	transition: color 0.5s ease;

	&:hover {
		color: white;
	}
`;

export const ContainerAuthorDate = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;

	p {
		font-size: 12px;
		align-self: end;
	}
`;

export const Author = styled.span`
	font-weight: bold;
`;
