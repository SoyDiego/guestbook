import { db } from "../firebase/config";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { messageSweetAlert } from "../helpers/helpers";

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

			try {
				const doc = await db.collection(``).add(newComment);
				dispatch(addNewComment(doc.id, newComment));
				messageSweetAlert("success", "Comment added, thanks! :)");
			} catch (error) {
				messageSweetAlert("error", "Something went wrong... :(");
			}
		}
	};
};

export const startLoadComments = () => {
	return (dispatch) => {
		try {
			db.collection("guestbook").onSnapshot((querySnapshot) => {
				const comments = [];
				querySnapshot.forEach((doc) => {
					comments.push({
						id: doc.id,
						...doc.data(),
					});

					dispatch(loadComments(comments));
					messageSweetAlert("success", "Loaded comments");
				});
			});
		} catch (error) {
			messageSweetAlert("error", "Something went wrong... :(");
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
