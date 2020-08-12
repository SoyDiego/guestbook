import React from "react";
import moment from "moment";
import {
	Card,
	Author,
	ContainerAuthorDate,
	DeleteButton,
	ContainerDeleteButton,
} from "./styles";
import { useDispatch } from "react-redux";
import { startDeleteComment } from "../../../actions/comments";

export const CommentCard = (comment) => {
	const dispatch = useDispatch();
	const { id, body, username, date } = comment;

	const handleDelete = (id) => {
		dispatch(startDeleteComment(id));
	};
	return (
		<Card>
			<ContainerDeleteButton>
				<DeleteButton onClick={() => handleDelete(id)}>X</DeleteButton>
			</ContainerDeleteButton>
			<p>{body}</p>
			<ContainerAuthorDate>
				<p>
					<Author>{username}</Author> - {moment(date).fromNow()}...
				</p>
			</ContainerAuthorDate>
		</Card>
	);
};
