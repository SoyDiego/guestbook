import React, { useState, useEffect } from "react";
import moment from "moment";
import {
	Card,
	Author,
	ContainerAuthorDate,
	ActionButton,
	ContainerLikesAndComments,
	ContainerActionButton,
} from "../ui/commentCard/styles";
import { useDispatch, useSelector } from "react-redux";
import {
	startDeleteComment,
	startVoteComment,
	startNewCommentOrEdit,
} from "../../actions/comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faTrashAlt,
	faHeart,
	faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useHistory } from "react-router-dom";
import { CommentsContainer } from "./styles";
import { db } from "../../firebase/config";
import { Loading } from "../ui/loading/Loading";

export const Opinions = () => {
	const history = useHistory();
	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState(null);
	const dispatch = useDispatch();
	const userLogged = useSelector((state) => state.auth.username);
	const uid = useSelector((state) => state.auth.uid);
	const { id } = useParams();
	useEffect(() => {
		const unsuscribe = db
			.collection("guestbook")
			.doc(id)
			.onSnapshot((docSnap) => {
				const data = docSnap.data();
				if (!data) {
					history.push("/");
					return;
				}
				setComment(data);
			});

		return () => unsuscribe();
	}, [history, id]);

	const handleEdit = () => {
		dispatch(startNewCommentOrEdit("edit", id, comment.body));
	};

	const handleDelete = () => {
		dispatch(startDeleteComment(id));
	};

	const handleVote = () => {
		if (comment.usersWhoVoted.includes(uid)) {
			setIsChecked(!isChecked);
			const removeUid = comment.usersWhoVoted.filter((id) => id !== uid);
			dispatch(startVoteComment(id, removeUid, "remove"));
		} else {
			setIsChecked(!isChecked);
			comment.usersWhoVoted.push(uid);
			dispatch(startVoteComment(id, comment.usersWhoVoted, "add"));
		}
	};

	if (!comment) return <Loading />;

	return (
		<>
			<Card width="80%" className="animate__animated animate__fadeIn">
				{userLogged === comment.username && (
					<ContainerActionButton>
						<ActionButton action="edit" onClick={handleEdit}>
							<FontAwesomeIcon icon={faEdit} />
						</ActionButton>
						<ActionButton action="delete" onClick={handleDelete}>
							<FontAwesomeIcon icon={faTrashAlt} />
						</ActionButton>
					</ContainerActionButton>
				)}
				<p className="comment">{comment.body}</p>
				<ContainerAuthorDate>
					<p>
						<Author>{comment.username}</Author> -&nbsp;
						{moment(comment.date).fromNow()}
						...
					</p>
				</ContainerAuthorDate>
				<ContainerLikesAndComments>
					<div onClick={handleVote}>
						<span>{comment.usersWhoVoted.length}</span>&nbsp;
						<FontAwesomeIcon
							color={
								comment.usersWhoVoted.includes(uid)
									? "#ff6961"
									: "grey"
							}
							icon={faHeart}
							title="Like"
						/>
					</div>
					<div>
						<span>{comment.opinions.length}</span>&nbsp;
						<FontAwesomeIcon
							color="grey"
							icon={faComment}
							title="Leave a comment!"
						/>
					</div>
				</ContainerLikesAndComments>
			</Card>
			<CommentsContainer>
				<h1>Comments!</h1>
			</CommentsContainer>
		</>
	);
};
