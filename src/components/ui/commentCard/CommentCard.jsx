import React from "react";
import moment from "moment";
import {
	Card,
	Author,
	ContainerAuthorDate,
	DeleteButton,
	ContainerDeleteButton,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteComment } from "../../../actions/comments";

export const CommentCard = (comment) => {
	const dispatch = useDispatch();
	const userLogged = useSelector((state) => state.auth.username);
	const { id, body, username, date } = comment;

	const handleDelete = (id) => {
		dispatch(startDeleteComment(id));
	};
	return (
		<Card>
			{userLogged === username ? (
				<ContainerDeleteButton>
					<DeleteButton onClick={() => handleDelete(id)}>
						X
					</DeleteButton>
				</ContainerDeleteButton>
			) : (
				<ContainerDeleteButton>
					<DeleteButton
						style={{ visibility: "hidden" }}
						onClick={() => handleDelete(id)}>
						X
					</DeleteButton>
				</ContainerDeleteButton>
			)}
			<p>{body}</p>
			<ContainerAuthorDate>
				<p>
					<Author>{username}</Author> - {moment(date).fromNow()}...
				</p>
			</ContainerAuthorDate>
		</Card>
	);
};
