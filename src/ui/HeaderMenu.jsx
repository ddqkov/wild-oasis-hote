/**
 * External dependencies.
 */

import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import Logout from "@/features/authentication/Logout";
import ButtonIcon from "@/ui/ButtonIcon";
import DarkModeToggle from "@/ui/DarkModeToggle";

const StyledHeader = styled.ul`
	display: flex;
	gap: 0.4rem;
`;
export default function HeaderMenu() {
	const navigate = useNavigate();

	return (
		<StyledHeader>
			<li>
				<ButtonIcon onClick={() => navigate("/account")}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>

			<li>
				<DarkModeToggle />
			</li>

			<li>
				<Logout />
			</li>
		</StyledHeader>
	);
}
