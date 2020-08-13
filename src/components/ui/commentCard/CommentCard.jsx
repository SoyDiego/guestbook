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
	const dispatch = useDispatch();
	const userLogged = useSelector((state) => state.auth.username);
	const { id, body, username, date, votes } = comment;
	const [countVotes, setCountVotes] = useState(votes);

	const handleDelete = (id) => {
		dispatch(startDeleteComment(id));
	};

	const handleVote = (id, countVotes) => {
		setCountVotes(countVotes + 1);
		dispatch(startVoteComment(id, countVotes));
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
			<ContainerLikes>
				<span>{countVotes}</span>&nbsp;
				<FontAwesomeIcon
					icon={faHeart}
					onClick={() => handleVote(id, countVotes)}
				/>
			</ContainerLikes>
		</Card>
	);
};
