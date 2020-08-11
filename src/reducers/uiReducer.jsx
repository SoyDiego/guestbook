import { types } from "../types/types";

const initialState = {
	loading: false,
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.uiShowLoading:
		case types.uiHideLoading:
			return {
				loading: action.payload,
			};

		default:
			return state;
	}
};
