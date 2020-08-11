import React, { useEffect } from "react";
import { CommentList, ContainerMain } from "./styles";
import { CommentCard } from "../ui/commentCard/CommentCard";
import { startLoadComments } from "../../actions/comments";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../ui/loading/Loading";

export const Main = () => {
	const dispatch = useDispatch();
	const { comments } = useSelector((state) => state.comments);
	const { loading } = useSelector((state) => state.ui);

	useEffect(() => {
		dispatch(startLoadComments());
	}, [dispatch]);

	return (
		<ContainerMain>
			<h1>All our visitors :)</h1>
			{loading ? (
				<Loading />
			) : (
				<CommentList className="animate__animated animate__fadeIn">
					{comments.map((comment) => (
						<CommentCard key={comment.id} {...comment} />
					))}
				</CommentList>
			)}
		</ContainerMain>
	);
};
