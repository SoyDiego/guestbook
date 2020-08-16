import styled from "@emotion/styled";

export const Card = styled.div`
	width: ${(props) => props.width};
	margin: ${(props) => (props.width === "300px" ? "1rem 1rem" : "1rem auto")};
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	border: 1px solid black;

	p.comment {
		padding: 0 2rem;
		text-align: center;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const ContainerActionButton = styled.div`
	height: 100%;
	display: flex;
	align-self: flex-end;
	justify-content: flex-end;
`;

export const ActionButton = styled.button`
	background-color: ${({ action }) =>
		action === "edit" ? "#ffd800" : "#ff6961"};
	border: none;
	padding: 0.5rem;
	cursor: pointer;
	transition: color 0.5s ease;
	height: 2.5rem;

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

export const ContainerLikesAndComments = styled.div`
	width: 100%;
	margin: 1rem;
	display: flex;
	justify-content: space-evenly;

	div {
		cursor: pointer;
	}
`;
