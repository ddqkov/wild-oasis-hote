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
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	overflow-y: auto;
	max-width: 26rem;
	width: 100%;
`;
export default function Sidebar() {
	return (
		<StyledSidebar>
			<Logo></Logo>
			<MainNav></MainNav>
		</StyledSidebar>
	);
}
