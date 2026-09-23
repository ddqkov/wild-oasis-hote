/**
 * External dependencies.
 */

import styled from "styled-components";

/**
 * Internal dependencies.
 */
import Logout from "@/features/authentication/Logout";

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1.2rem;
	border-bottom: 1px solid var(--color-grey-200);
	position: fixed;
	top: 0;
	right: 0;
	max-width: calc(100% - 26rem);
	width: 100%;
	z-index: 3;
`;

export default function Header() {
	return (
		<StyledHeader>
			<Logout />
		</StyledHeader>
	);
}
