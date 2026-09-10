/**
 * External dependencies.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

/**
 * Internal dependencies.
 */
import { createEditFunction } from "@/services/apiCabins";

export function useEditCabin() {
	const queryClient = useQueryClient();

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) =>
			createEditFunction(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin successfully edited");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: (error) => toast.error(error.message),
	});

	return { isEditing, editCabin };
}
