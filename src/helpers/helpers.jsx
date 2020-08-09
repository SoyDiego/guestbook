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
