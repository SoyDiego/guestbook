import { types } from "../types/types";

export const activeCommentReducer = (state = {}, action) => {
	switch (action.type) {
		case types.commentsActive:
			return {
				...action.payload,
			};
		case types.commentsActiveClean:
			return {};

		default:
			return state;
	}
};
