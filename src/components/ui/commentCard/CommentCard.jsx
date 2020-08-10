import React from "react";
import moment from "moment";
import { Card, Author, ContainerAuthorDate } from "./styles";

export const CommentCard = (comment) => {
	const { body, username, date } = comment;
	return (
		<Card>
			<p>{body}</p>
			<ContainerAuthorDate>
				<p>
					<Author>{username}</Author> - {moment(date).fromNow()}...
				</p>
			</ContainerAuthorDate>
		</Card>
	);
};
