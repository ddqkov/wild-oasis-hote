/**
 * External dependencies.
 */

import Select from "@/ui/Select";
import { useSearchParams } from "react-router-dom";

/**
 * Internal dependencies.
 */
Select;

export default function SortBy({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get("sortBy") || "";

	function handleChange(e) {
		searchParams.set("sortBy", e.target.value);

		setSearchParams(searchParams);
	}

	return (
		<Select
			options={options}
			type="white"
			onChange={handleChange}
			value={sortBy}
		/>
	);
}
