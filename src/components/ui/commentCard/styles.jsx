import styled from "@emotion/styled";

export const Card = styled.div`
	width: 300px;
	margin: 0.5rem;
	padding: 1rem;
	text-align: center;
	border: 1px solid black;
`;

export const ContainerAuthorDate = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;

	p {
		font-size: 12px;
	}
`;

export const Author = styled.span`
	font-weight: bold;
`;
