import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				auth: action.payload,
			};
		case types.logout:
			return {
				auth: {},
			};

		default:
			return state;
	}
};
