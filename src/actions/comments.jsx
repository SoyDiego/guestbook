import { db } from "../firebase/config";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { messageSweetAlert } from "../helpers/helpers";
import { startLoading, finishLoading } from "./ui";

export const startNewComment = () => {
	return async (dispatch, getState) => {
		const { value: comment } = await Swal.fire({
			input: "textarea",
			inputPlaceholder: "Type your comment",
			inputAttributes: {
				"aria-label": "Type your comment here",
			},
			showCancelButton: true,
		});

		if (comment) {
			const { uid, username } = getState().auth;

			const newComment = {
				userId: uid,
				username: username,
				body: comment,
				date: new Date().getTime(),
				votes: 0,
			};

			try {
				const doc = await db.collection(`guestbook`).add(newComment);
				dispatch(addNewComment(doc.id, newComment));
				messageSweetAlert("success", "Comment added, thanks! :)");
			} catch (error) {
				messageSweetAlert("error", "Something went wrong... :(");
			}
		}
	};
};

export const startLoadComments = () => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const commentsInDB = await db.collection("guestbook").get();
			const comments = [];
			commentsInDB.forEach((doc) => {
				comments.push({
					id: doc.id,
					...doc.data(),
				});
			});
			dispatch(loadComments(comments));
			dispatch(finishLoading());
		} catch (error) {
			messageSweetAlert("error", "Something went wrong... :(");
		}
	};
};

export const startDeleteComment = (id) => {
	return (dispatch) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.value) {
					await db.collection("guestbook").doc(id).delete();
					dispatch(deleteComment(id));

					Swal.fire(
						"Deleted!",
						"Your comment has been deleted.",
						"success"
					);
				}
			});
		} catch (error) {
			messageSweetAlert("error", "Something went wrong... :(");
		}
	};
};

export const startVoteComment = (idComment, countVotes) => {
	return async (dispatch) => {
		try {
			await db
				.collection("guestbook")
				.doc(idComment)
				.update({
					votes: countVotes + 1,
				});
			dispatch(voteComment(idComment, countVotes));
		} catch (error) {
			console.log(error);
		}
	};
};

export const loadComments = (comments) => ({
	type: types.commentsLoad,
	payload: comments,
});

export const addNewComment = (id, comment) => ({
	type: types.commentsAddNew,
	payload: { id, ...comment },
});

export const deleteComment = (id) => ({
	type: types.commentsDelete,
	payload: id,
});

export const voteComment = (id, vote) => ({
	type: types.commentsVote,
	payload: {
		id,
		vote: vote + 1,
	},
});
