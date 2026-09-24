/**
 * External dependencies.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Internal dependencies.
 */
import { updateCurrentUser } from "@/services/apiAuth";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: ({ password, fullName, avatar }) =>
			updateCurrentUser({ password, fullName, avatar }),
		onSuccess: ({ user }) => {
			toast.success("User account successfully updated");
			queryClient.setQueriesData("user", user);
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (error) => toast.error(error.message),
	});

	return { isUpdating, updateUser };
}
