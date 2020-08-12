import { types } from "../types/types";

const initialState = {
	comments: [],
};

export const commentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.commentsAddNew:
			return {
				...state,
				comments: [action.payload, ...state.comments],
			};
		case types.commentsLoad:
			return {
				...state,
				comments: [...action.payload],
			};

		case types.commentsDelete:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload
				),
			};

		default:
			return state;
	}
};
