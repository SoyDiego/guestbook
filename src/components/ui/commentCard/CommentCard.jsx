import React, { useState } from "react";
import moment from "moment";
import {
	Card,
	Author,
	ContainerAuthorDate,
	DeleteButton,
	ContainerDeleteButton,
	ContainerLikes,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
	startDeleteComment,
	startVoteComment,
} from "../../../actions/comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faHeart } from "@fortawesome/free-solid-svg-icons";

export const CommentCard = (comment) => {
	const [isChecked, setIsChecked] = useState();
	const dispatch = useDispatch();
	const userLogged = useSelector((state) => state.auth.username);
	const uid = useSelector((state) => state.auth.uid);
	const { id, body, username, date, usersWhoVoted } = comment;

	const handleDelete = (id) => {
		dispatch(startDeleteComment(id));
	};

	const handleVote = (idComment) => {
		if (usersWhoVoted.includes(uid)) {
			console.log(usersWhoVoted.includes(uid));
			setIsChecked(!isChecked);
			const removeUid = usersWhoVoted.filter((id) => id !== uid);
			console.log(removeUid);
			dispatch(startVoteComment(idComment, removeUid, "remove"));
		} else {
			console.log(usersWhoVoted);
			setIsChecked(!isChecked);
			usersWhoVoted.push(uid);
			console.log(usersWhoVoted);
			dispatch(startVoteComment(idComment, usersWhoVoted, "add"));
		}
	};

	return (
		<Card>
			{userLogged === username ? (
				<ContainerDeleteButton>
					<DeleteButton onClick={() => handleDelete(id)}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</DeleteButton>
				</ContainerDeleteButton>
			) : (
				<ContainerDeleteButton>
					<DeleteButton
						style={{ visibility: "hidden" }}
						onClick={() => handleDelete(id)}></DeleteButton>
				</ContainerDeleteButton>
			)}
			<p>{body}</p>
			<ContainerAuthorDate>
				<p>
					<Author>{username}</Author> - {moment(date).fromNow()}...
				</p>
			</ContainerAuthorDate>
			<ContainerLikes onClick={() => handleVote(id)}>
				<span>{usersWhoVoted.length}</span>&nbsp;
				<FontAwesomeIcon
					color={usersWhoVoted.includes(uid) ? "#ff6961" : "grey"}
					icon={faHeart}
				/>
			</ContainerLikes>
		</Card>
	);
};
