/**
 * External dependencies.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

/**
 * Internal dependencies.
 */
import { login as loginApi } from "@/services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();

	const navigate = useNavigate();
	const { mutate: login, isLoading: isLogingIn } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data.user);

			navigate("/dashboard", { replace: true });
		},
		onError: (err) => {
			console.log("Error", err);

			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLogingIn };
}
