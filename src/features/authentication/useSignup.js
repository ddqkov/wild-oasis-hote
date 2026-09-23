/**
 * External dependencies.
 */
import { useMutation } from "@tanstack/react-query";

/**
 * Internal dependencies.
 */
import { signup as signUpApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signUp, isLoading: isSigningUp } = useMutation({
		mutationFn: ({ fullName, email, password }) =>
			signUpApi({ fullName, email, password }),
		onSuccess: (data) => {
			console.log(data);
			toast.success("Account succesfully created");
		},
		onError: (err) => {
			console.log("Error", err);

			toast.error("Could not signup new user");
		},
	});

	return { signUp, isSigningUp };
}
