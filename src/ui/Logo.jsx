/**
 * External dependencies.
 */
import styled from "styled-components";

/**
 * Internal dependencies.
 */
import { useDarkMode } from "@/context/DarkModeContext";

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 9.6rem;
	width: auto;
`;

function Logo() {
	const { darkModeToggle } = useDarkMode();

	const src = darkModeToggle ? "/logo-dark.png" : "/logo-light.png";

	return (
		<StyledLogo>
			<Img src={src} alt="Logo" />
		</StyledLogo>
	);
}

export default Logo;
