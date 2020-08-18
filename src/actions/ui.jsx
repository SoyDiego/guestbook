import { types } from "../types/types";

export const startLoading = () => ({
	type: types.uiShowLoading,
	payload: true,
});

export const finishLoading = () => ({
	type: types.uiHideLoading,
	payload: false,
});

export const cleanLoading = () => ({
	type: types.uiCleanLoading,
});
