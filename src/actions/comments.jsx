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
				auth: { uid },
			} = getState().auth;

			const newComment = {
				body: comment,
				date: new Date().getTime(),
			};

			const doc = await db
				.collection(`${uid}/guestbook/comments`)
				.add(newComment);

			dispatch(addNewComment(doc.id, newComment));
		}
	};
};

export const addNewComment = (id, comment) => ({
	type: types.commentsAddNew,
	payload: { id, ...comment },
});
