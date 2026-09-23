/**
 * External dependencies.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
/**
 * Internal dependencies.
 */

import { logout as logoutApi } from "@/services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: logout, isLoading: isLogingOut } = useMutation({
		mutationFn: logoutApi,
		onSuccess: () => {
			queryClient.removeQueries();
			navigate("/login", { replace: true });
		},
	});

	return { logout, isLogingOut };
}
