import React from "react";
import { Card, Author, ContainerAuthorDate } from "./styles";

export const CommentCard = (comment) => {
	const { body, username, date } = comment;
	return (
		<Card>
			<p>{body}</p>
			<ContainerAuthorDate>
				<p>
					<Author>{username}</Author> - {date}...
				</p>
			</ContainerAuthorDate>
		</Card>
	);
};
