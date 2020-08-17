import React, { useEffect } from "react";
import { CommentList, ContainerMain } from "./styles";
import { CommentCard } from "../ui/commentCard/CommentCard";
import { loadComments } from "../../actions/comments";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../ui/loading/Loading";
import { db } from "../../firebase/config";
import { finishLoading, startLoading } from "../../actions/ui";

export const Main = () => {
	const dispatch = useDispatch();
	const { comments } = useSelector((state) => state);
	const { loading } = useSelector((state) => state.ui);

	useEffect(() => {
		dispatch(startLoading());
		const unsuscribe = db
			.collection("guestbook")
			.orderBy("date", "desc")
			.onSnapshot((docSnap) => {
				const comments = docSnap.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					};
				});
				dispatch(loadComments(comments));
				dispatch(finishLoading());
			});

		return () => unsuscribe();
	}, [dispatch]);

	return (
		<ContainerMain>
			<h1>All our visitors :)</h1>
			{loading ? (
				<Loading />
			) : comments.length > 0 ? (
				<CommentList className="animate__animated animate__fadeIn">
					{comments.map((comment) => (
						<CommentCard key={comment.id} {...comment} />
					))}
				</CommentList>
			) : (
				<p>No comments yet! :(</p>
			)}
		</ContainerMain>
	);
};
