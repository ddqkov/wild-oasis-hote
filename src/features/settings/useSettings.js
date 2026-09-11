/**
 * External dependencies.
 */
import { useQuery } from "@tanstack/react-query";

/**
 * Internal dependencies.
 */

import { getSettings } from "@/services/apiSettings";

export function useSettings() {
	const { isLoading, data: settingsData } = useQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});

	return { isLoading, settingsData };
}
