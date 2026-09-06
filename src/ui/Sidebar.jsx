/**
 * External dependencies.
 */

import styled from "styled-components";

/**
 * Internal dependencies.
 */

const StyledSidebar = styled.aside`
	background-color: blue;
	padding: 1.2rem;
	grid-row: 1 / -1;
`;
export default function Sidebar() {
	return <StyledSidebar>Sidebar</StyledSidebar>;
}
