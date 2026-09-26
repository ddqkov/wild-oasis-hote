/**
 * External dependencies.
 */
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import styled from "styled-components";

/**
 * Internal dependencies.
 */

import { useDarkMode } from "@/context/DarkModeContext";
import DashboardBox from "@/features/dashboard/DashboardBox";
import Heading from "@/ui/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

export default function SalesChart({ bookings, numDays }) {
	const { darkModeToggle } = useDarkMode();
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays),
		end: new Date(),
	});

	const data = allDates.map((date) => {
		const dayBookings = bookings.filter((booking) =>
			isSameDay(date, new Date(booking.created_at)),
		);

		return {
			label: format(date, "MMM dd"),
			totalSales: dayBookings.reduce(
				(acc, cur) => acc + cur.totalPrice,
				0,
			),
			extrasSales: dayBookings.reduce(
				(acc, cur) => acc + cur.extrasPrice,
				0,
			),
		};
	});

	const colors = darkModeToggle
		? {
				totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
				extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
				text: "#e5e7eb",
				background: "#18212f",
			}
		: {
				totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
				extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
				text: "#374151",
				background: "#fff",
			};
	return (
		<StyledSalesChart>
			<Heading as="h2">Sale</Heading>

			<ResponsiveContainer width="100%">
				<AreaChart data={data}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>

					<YAxis
						unit="$"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>

					<CartesianGrid strokeDasharray="4" />

					<Tooltip
						contentStyle={{ backgroundColor: colors.background }}
					/>

					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total sales"
						unit="$"
					/>

					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extras sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}
