/**
 * External dependencies.
 */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Internal dependencies.
 */
import { deleteCabin as deleteCabinApi } from "@/services/apiCabins";

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			(toast.success("Cabin has been deleted"),
				queryClient.invalidateQueries({
					queryKey: ["cabins"],
				}));
		},
		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
}
