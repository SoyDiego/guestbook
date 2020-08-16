import { types } from "../types/types";

export const commentsReducer = (state = [], action) => {
	switch (action.type) {
		case types.commentsAddNew:
		case types.commentsEdit:
			return [...state];

		case types.commentsLoad:
			return [...action.payload];

		case types.commentsDelete:
			return [
				...state.filter((comment) => comment.id !== action.payload.id),
			];
		case types.commentsVoteAdd:
		case types.commentsVoteRemove:
			return [
				...state.map((comment) =>
					comment.id === action.payload.id
						? {
								...comment,
								usersWhoVoted: action.payload.usersWhoVoted,
						  }
						: comment
				),
			];
		case types.commentsActive:
			return {
				active: action.payload,
				...state,
			};

		case types.commentsCleanLogout:
			return [];

		default:
			return state;
	}
};
