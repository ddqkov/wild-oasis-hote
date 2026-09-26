/**
 * External dependencies.
 */
import Heading from "@/ui/Heading";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import { useDarkMode } from "@/context/DarkModeContext";

const ChartBox = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`;

const DURATION_BUCKETS = [
	{
		label: "1 night",
		light: "#ef4444",
		dark: "#b91c1c",
		test: (n) => n === 1,
	},
	{
		label: "2 nights",
		light: "#f97316",
		dark: "#c2410c",
		test: (n) => n === 2,
	},
	{
		label: "3 nights",
		light: "#eab308",
		dark: "#a16207",
		test: (n) => n === 3,
	},
	{
		label: "4-5 nights",
		light: "#84cc16",
		dark: "#4d7c0f",
		test: (n) => n >= 4 && n <= 5,
	},
	{
		label: "6-7 nights",
		light: "#22c55e",
		dark: "#15803d",
		test: (n) => n >= 6 && n <= 7,
	},
	{
		label: "8-14 nights",
		light: "#14b8a6",
		dark: "#0f766e",
		test: (n) => n >= 8 && n <= 14,
	},
	{
		label: "15-21 nights",
		light: "#3b82f6",
		dark: "#1d4ed8",
		test: (n) => n >= 15 && n <= 21,
	},
	{
		label: "21+ nights",
		light: "#a855f7",
		dark: "#7e22ce",
		test: (n) => n > 21,
	},
];

function prepareData(stays, isDarkMode) {
	const counts = new Map(DURATION_BUCKETS.map((bucket) => [bucket.label, 0]));

	for (const { numNights } of stays) {
		const bucket = DURATION_BUCKETS.find((b) => b.test(numNights));
		if (bucket) counts.set(bucket.label, counts.get(bucket.label) + 1);
	}

	return DURATION_BUCKETS.filter(
		(bucket) => counts.get(bucket.label) > 0,
	).map((bucket) => ({
		duration: bucket.label,
		value: counts.get(bucket.label),
		color: isDarkMode ? bucket.dark : bucket.light,
	}));
}

export default function DurationChart({ confirmedStays }) {
	const { darkModeToggle } = useDarkMode();

	const data = prepareData(confirmedStays, darkModeToggle);

	return (
		<ChartBox>
			<Heading as="h2">Stay duration summary</Heading>

			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						nameKey="duration"
						dataKey="value"
						innerRadius={85}
						outerRadiusRadius={110}
						cx="50%"
						cy="50%"
					>
						{data.map((entry) => (
							<Cell
								key={entry.duration}
								fill={entry.color}
								stroke={entry.color}
							/>
						))}
					</Pie>

					<Tooltip />

					<Legend
						verticalAlign="middle"
						align="right"
						width="30%"
						layout="vertical"
						iconSize={14}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}
