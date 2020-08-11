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

export const startLogin = (email, password) => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				const Toast = Swal.mixin({
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					onOpen: (toast) => {
						toast.addEventListener("mouseenter", Swal.stopTimer);
						toast.addEventListener("mouseleave", Swal.resumeTimer);
					},
				});

				Toast.fire({
					icon: "success",
					title: `Welcome ${user.displayName}`,
				});

				dispatch(loginUser(user.uid, user.displayName));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const loginUser = (uid, username) => ({
	type: types.login,
	payload: {
		uid,
		username,
	},
});

export const startLogout = () => {
	return async (dispatch) => {
		await firebase.auth().signOut();

		dispatch(logoutUser());
	};
};

export const logoutUser = () => ({
	type: types.logout,
});
