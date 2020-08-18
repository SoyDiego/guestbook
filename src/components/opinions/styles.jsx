import styled from "@emotion/styled";

export const OpinionsContainer = styled.div`
	width: 80%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Opinion = styled.div`
	width: 100%;
	margin: 0.5rem 0;
	display: flex;
	flex-direction: column;
	border: 2px dashed #ff6961;

	.opinionBody,
	.authorAndDate {
		margin: 0 1rem;
	}

	.authorAndDate {
		display: flex;
		justify-content: flex-end;
	}
`;

export const Form = styled.form`
	width: 80%;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;

	textarea {
		padding: 1rem;
		width: 100%;
		height: 4rem;
	}
`;
