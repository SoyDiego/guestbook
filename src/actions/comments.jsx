import { db } from "../firebase/config";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { messageSweetAlert } from "../helpers/helpers";
import { startLoading, finishLoading } from "./ui";

export const startNewCommentOrEdit = (action, id, body) => {
	return async (dispatch, getState) => {
		const { value: comment } = await Swal.fire({
			input: "textarea",
			inputValue: action === "add" ? null : body,
			inputPlaceholder: "Type your comment",
			inputAttributes: {
				"aria-label": "Type your comment here",
			},
			showCancelButton: true,
		});

		if (comment) {
			const { uid, username } = getState().auth;

			if (action === "add") {
				const newComment = {
					userId: uid,
					username: username,
					body: comment,
					date: new Date().getTime(),
					usersWhoVoted: [],
					opinions: [],
					active: {},
				};

				try {
					const doc = await db
						.collection(`guestbook`)
						.add(newComment);
					dispatch(addNewComment(doc.id, newComment));
					messageSweetAlert("success", "Comment added, thanks! :)");
				} catch (error) {
					messageSweetAlert(
						"error",
						`Something went wrong... :( || Error: ${error}`
					);
				}
			} else {
				try {
					await db.collection(`guestbook`).doc(id).update({
						body: comment,
					});
					dispatch(editComment());
					messageSweetAlert("success", "Comment edited.");
				} catch (error) {
					messageSweetAlert(
						"error",
						`Something went wrong... :( || Error: ${error}`
					);
				}
			}
		}
	};
};

export const startLoadComments = () => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			await db
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
		} catch (error) {
			messageSweetAlert(
				"error",
				`Something went wrong... :( || Error: ${error}`
			);
		}
	};
};

export const startDeleteComment = (idComment) => {
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
					await db.collection("guestbook").doc(idComment).delete();
					dispatch(deleteComment(idComment));

					Swal.fire(
						"Deleted!",
						"Your comment has been deleted.",
						"success"
					);
				}
			});
		} catch (error) {
			messageSweetAlert(
				"error",
				`Something went wrong... :( || Error: ${error}`
			);
		}
	};
};

export const startVoteComment = (idComment, usersWhoVoted, action) => {
	return async (dispatch) => {
		try {
			await db.collection("guestbook").doc(idComment).update({
				usersWhoVoted: usersWhoVoted,
			});
			if (action === "add") {
				dispatch(addVoteComment(idComment, usersWhoVoted));
			} else {
				dispatch(removeVoteComment(idComment, usersWhoVoted));
			}
		} catch (error) {
			messageSweetAlert(
				"error",
				`Something went wrong... :( || Error: ${error}`
			);
		}
	};
};

export const loadComments = (comments) => ({
	type: types.commentsLoad,
	payload: comments,
});

export const addNewComment = (id, comment) => ({
	type: types.commentsAddNew,
});

export const editComment = () => ({
	type: types.commentsEdit,
});

export const deleteComment = (id) => ({
	type: types.commentsDelete,
	payload: id,
});

export const addVoteComment = (id, usersWhoVoted) => ({
	type: types.commentsVoteAdd,
	payload: {
		id,
		usersWhoVoted,
	},
});

export const removeVoteComment = (id, usersWhoVoted) => ({
	type: types.commentsVoteRemove,
	payload: {
		id,
		usersWhoVoted,
	},
});

export const commentActive = (comment) => ({
	type: types.commentsActive,
	payload: comment,
});

export const commentsLogout = () => ({
	type: types.commentsCleanLogout,
});
