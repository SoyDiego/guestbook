import React, { useState } from "react";
import moment from "moment";
import {
	Card,
	Author,
	ContainerAuthorDate,
	ActionButton,
	ContainerLikesAndComments,
	ContainerActionButton,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
	startDeleteComment,
	startVoteComment,
	startNewCommentOrEdit,
	commentActive,
} from "../../../actions/comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faTrashAlt,
	faHeart,
	faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

export const CommentCard = (comment) => {
	const history = useHistory();
	const [isChecked, setIsChecked] = useState();
	const dispatch = useDispatch();
	const userLogged = useSelector((state) => state.auth.username);
	const uid = useSelector((state) => state.auth.uid);
	const { id, body, username, date, usersWhoVoted, opinions } = comment;

	const handleEdit = (idComment, body) => {
		dispatch(startNewCommentOrEdit("edit", idComment, body));
	};

	const handleDelete = (id) => {
		dispatch(startDeleteComment(id));
	};

	const handleVote = (idComment) => {
		if (usersWhoVoted.includes(uid)) {
			setIsChecked(!isChecked);
			const removeUid = usersWhoVoted.filter((id) => id !== uid);
			dispatch(startVoteComment(idComment, removeUid, "remove"));
		} else {
			setIsChecked(!isChecked);
			usersWhoVoted.push(uid);
			dispatch(startVoteComment(idComment, usersWhoVoted, "add"));
		}
	};

	const handleComment = (idComment) => {
		dispatch(commentActive(comment));
		history.push(`/comment/${idComment}`);
	};

	return (
		<Card width="300px" className="animate__animated animate__fadeIn">
			{userLogged === username && (
				<ContainerActionButton>
					<ActionButton
						action="edit"
						onClick={() => handleEdit(id, body)}>
						<FontAwesomeIcon icon={faEdit} />
					</ActionButton>
					<ActionButton
						action="delete"
						onClick={() => handleDelete(id)}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</ActionButton>
				</ContainerActionButton>
			)}
			<p className="comment">{body}</p>
			<ContainerAuthorDate>
				<p>
					<Author>{username}</Author> - {moment(date).fromNow()}...
				</p>
			</ContainerAuthorDate>
			<ContainerLikesAndComments>
				<div onClick={() => handleVote(id)}>
					<span>{usersWhoVoted.length}</span>&nbsp;
					<FontAwesomeIcon
						color={usersWhoVoted.includes(uid) ? "#ff6961" : "grey"}
						icon={faHeart}
						title="Like"
					/>
				</div>
				<div onClick={() => handleComment(id)}>
					<span>{opinions.length}</span>&nbsp;
					<FontAwesomeIcon
						color="grey"
						icon={faComment}
						title="Leave a comment!"
					/>
				</div>
			</ContainerLikesAndComments>
		</Card>
	);
};
