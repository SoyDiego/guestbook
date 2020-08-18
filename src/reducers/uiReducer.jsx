import { types } from "../types/types";

export const uiReducer = (state = {}, action) => {
	switch (action.type) {
		case types.uiShowLoading:
		case types.uiHideLoading:
			return {
				loading: action.payload,
			};
		case types.uiCleanLoading:
			return {};

		default:
			return state;
	}
};
