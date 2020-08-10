import { db } from "../firebase/config";
import { types } from "../types/types";
import Swal from "sweetalert2";

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
			const {
				auth: { uid, username },
			} = getState().auth;

			const newComment = {
				userId: uid,
				username: username,
				body: comment,
				date: new Date().getTime(),
			};

			const doc = await db.collection(`guestbook`).add(newComment);

			dispatch(addNewComment(doc.id, newComment));
		}
	};
};

export const startLoadComments = () => {
	return (dispatch) => {
		db.collection("guestbook").onSnapshot((querySnapshot) => {
			const comments = [];
			querySnapshot.forEach((doc) => {
				comments.push({
					id: doc.id,
					...doc.data(),
				});

				dispatch(loadComments(comments));
			});
		});
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
