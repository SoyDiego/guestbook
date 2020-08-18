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
	loadCommentAndOpinions,
	startNewOpinion,
} from "../../actions/comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEdit,
	faTrashAlt,
	faHeart,
	faComment,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, useHistory } from "react-router-dom";
import { OpinionsContainer, Opinion, Form } from "./styles";
import { db } from "../../firebase/config";
import { Loading } from "../ui/loading/Loading";
import { Button } from "../ui/Navigation/styles";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";

export const Opinions = () => {
	const history = useHistory();
	const { id } = useParams();

	const [isChecked, setIsChecked] = useState(false);
	const [comment, setComment] = useState(null);
	const dispatch = useDispatch();
	const userLogged = useSelector((state) => state.auth.username);
	const opinions = useSelector((state) => state.comments.active?.opinions);
	const uid = useSelector((state) => state.auth.uid);
	const [values, handleInputChange, reset] = useForm({
		opinionToDB: "",
	});

	if (opinions === undefined) history.push("/");

	const { opinionToDB } = values;

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
				dispatch(loadCommentAndOpinions());
			});

		return () => unsuscribe();
	}, [history, id, dispatch]);

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

	const handleNewOpinion = (e) => {
		e.preventDefault();

		if (opinionToDB === "") {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Please complete the field.",
			});
			return;
		}

		dispatch(startNewOpinion(id, opinions, opinionToDB));
		reset();
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

			<Form onSubmit={handleNewOpinion}>
				<textarea
					name="opinionToDB"
					value={opinionToDB}
					onChange={handleInputChange}
				/>
				<Button type="submit" color="black">
					Send your opinion
				</Button>
			</Form>

			<OpinionsContainer>
				{opinions.length > 0 ? (
					<h1>Opinions</h1>
				) : (
					<h1>No opinions yet :(</h1>
				)}
				{opinions.map((opinion) => (
					<Opinion key={opinion.date}>
						<div className="opinionBody">
							<p>{opinion.body}</p>
						</div>
						<div className="authorAndDate">
							<p>
								<strong>{opinion.username}</strong> -&nbsp;
								{moment(opinion.date).fromNow()}...
							</p>
						</div>
					</Opinion>
				))}
			</OpinionsContainer>
		</>
	);
};
