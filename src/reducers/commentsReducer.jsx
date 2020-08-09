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

		default:
			return state;
	}
};
