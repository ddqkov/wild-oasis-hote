/**
 * External dependencies.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
/**
 * Internal dependencies.
 */
import { createEditFunction } from "@/services/apiCabins";

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: (newCabin) => createEditFunction(newCabin),
		onSuccess: () => {
			toast.success("New cabin successfully created");
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
		},
		onError: (error) => toast.error(error.message),
	});

	return { isCreating, createCabin };
}
