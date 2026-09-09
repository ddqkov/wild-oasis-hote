/**
 * External dependencies.
 */

import styled from "styled-components";

/**
 * Internal dependencies.
 */

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1.2rem;
	border-bottom: 1px solid var(--color-grey-200);
`;

export default function Header() {
	return <StyledHeader>Header</StyledHeader>;
}
