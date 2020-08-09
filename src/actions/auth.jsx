import { firebase } from "../firebase/config";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const registerNewUser = (email, password, username) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: username });

				Swal.fire({
					icon: "success",
					title: `Welcome ${username}`,
					text: "Enjoy...!",
					timer: 2000,
				});

				dispatch(loginUser(user.uid, username));
			})

			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Oops",
					text: `${error}`,
				});
			});
	};
};

const loginUser = (uid, username) => ({
	type: types.login,
	payload: {
		uid,
		username,
	},
});
