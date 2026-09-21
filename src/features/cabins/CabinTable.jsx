/**
 * External dependencies.
 */
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import CabinRow from "@/features/cabins/CabinRow";
import { useCabins } from "@/features/cabins/useCabins";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
	display: grid;
	column-gap: 2.4rem;
	align-items: center;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
	padding: 1.6rem 2.4rem;
`;

export default function CabinTable() {
	const { isLoading, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;

	const filterStatus = searchParams.get("discount") || "all";

	const filterCabins = {
		all: cabins,
		"no-discount": cabins.filter((cabin) => cabin.discount === 0),
		"with-discount": cabins.filter((cabin) => cabin.discount > 0),
	}[filterStatus];

	const sortBy = searchParams.get("sortBy") || "startDate-asc";

	const [field, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = [...filterCabins].sort((a, b) => {
		const valueA = a[field];
		const valueB = b[field];

		if (typeof valueA === "string") {
			return valueA.localeCompare(valueB) * modifier;
		}

		return (valueA - valueB) * modifier;
	});

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header>
					<div></div>

					<div>Cabin</div>

					<div>Capacity</div>

					<div>Price</div>

					<div>Discount</div>
				</Table.Header>

				<Table.Body
					data={sortedCabins}
					render={(cabin) => (
						<CabinRow cabin={cabin} key={cabin.id} />
					)}
				/>
			</Table>
		</Menus>
	);
}
