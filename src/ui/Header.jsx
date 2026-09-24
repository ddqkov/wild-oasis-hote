/**
 * External dependencies.
 */

import styled from "styled-components";

/**
 * Internal dependencies.
 */
import UserAvatar from "@/features/authentication/UserAvatar";
import HeaderMenu from "@/ui/HeaderMenu";

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
	display: flex;
	gap: 2.4rem;
	align-items: center;
	justify-content: flex-end;
`;

export default function Header() {
	return (
		<StyledHeader>
			<UserAvatar />

			<HeaderMenu />
		</StyledHeader>
	);
}
