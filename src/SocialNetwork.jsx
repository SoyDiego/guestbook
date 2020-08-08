import React from "react";
import { AppRouter } from "./router/AppRouter";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const SocialNetwork = () => {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
};
