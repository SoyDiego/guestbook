import validator from "validator";
import Swal from "sweetalert2";

export const formIsValid = (username, email, password, password2) => {
	if (
		username === "" ||
		email === "" ||
		password === "" ||
		password2 === ""
	) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Please complete all fields.",
		});
		return false;
	} else if (password !== password2) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Passwords must be the same.",
		});
		return false;
	} else if (!validator.isEmail(email)) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Please verify your email.",
		});
		return false;
	}

	return true;
};

export const messageSweetAlert = (typeError, message) => {
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
		icon: typeError,
		title: message,
	});
};
