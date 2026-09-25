/**
 * External dependencies.
 */
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import { useCabins } from "@/features/cabins/useCabins";
import Stats from "@/features/dashboard/Stats";
import useRecentBookings from "@/features/dashboard/useRecentBookings";
import useRecentStays from "@/features/dashboard/useRecentStays";
import Spinner from "@/ui/Spinner";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

export default function DashboardLayout() {
	const { bookings, isLoading } = useRecentBookings();
	const {
		stays,
		confirmedStays,
		isLoading: isLoadingStays,
		numDays,
	} = useRecentStays();
	const { cabins, isLoading: isLoadingCabins } = useCabins();

	if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			></Stats>
		</StyledDashboardLayout>
	);
}
