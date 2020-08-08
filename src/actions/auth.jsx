import { firebase } from "../firebase/config";
import { types } from "../types/types";

export const registerNewUser = (email, password, username) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: username });
			})
			.catch((error) => {
				console.log(error);
			});
	};
};
