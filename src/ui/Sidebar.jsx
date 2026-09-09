/**
 * External dependencies.
 */
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import Logo from "@/ui/Logo";
import MainNav from "@/ui/MainNav";

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	padding: 1.2rem;
	grid-row: 1 / -1;
	border-right: 1px solid var(--color-grey-200);
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;
export default function Sidebar() {
	return (
		<StyledSidebar>
			<Logo></Logo>
			<MainNav></MainNav>
		</StyledSidebar>
	);
}
